import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";
import styles from "../../stylesheets";

@connect(function mapStateToProps(state) {
  return {
    record: state.record
  };
}, function mapDispatchToProps(dispatch) {
  return {
    /**
     * 获取消费记录
     * @param payload
     */
    getConsumptions(payload) {
      dispatch({
        type: "record/consumptions",
        payload
      });
    },
    /**
     * 重置页面数据状态
     */
    reset() {
      dispatch({
        type: "record/reset"
      });
    },
    /**
     * 改变消费记录列表分页是否到底部boolean值
     * @param payload
     */
    changeIsEnd(payload) {
      dispatch({
        type: "record/changeIsEnd",
        payload
      });
    }
  };
})

class RecordComponent extends Component {
  static propTypes = {
    record: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 组件装载时,获取消费记录并添加消费记录滚动条分页的监听
   */
  componentDidMount() {
    const {scrollPagination, getConsumptionsHandler} = this;
    getConsumptionsHandler.bind(this)();
    scrollPagination.bind(this)();
  }

  componentWillReceiveProps(nextProps, nextState) {
    const thisPropsConsumptions = this.props.record.consumptions,
      nextPropsConsumptions = nextProps.record.consumptions,
      nextPropsIsEnd = nextProps.record.isEnd;
    const {changeIsEnd} = this.props;
    if (thisPropsConsumptions.length !== nextPropsConsumptions.length && nextPropsIsEnd) {
      changeIsEnd.bind(this)(false);
    }
  }

  /**
   * 直接或者分页获取消费记录
   * @param pageNum
   */
  getConsumptionsHandler(pageNum = 1) {
    const {getConsumptions, record} = this.props;
    const {pageSize} = record;
    getConsumptions.bind(this)({
      page_num: pageNum,
      page_size: pageSize
    });
  }

  /**
   * 组件卸载时,重置数据状态并取消对消费记录滚动条的监听
   */
  componentWillUnmount() {
    const {reset} = this.props;
    const {scrollRecordStore} = this;
    reset.bind(this)();
    window.removeEventListener("scroll", scrollRecordStore.bind(this));
  }

  /**
   * 添加消费记录滚动条分页的监听
   */
  scrollPagination() {
    const {scrollRecordStore} = this;
    window.addEventListener("scroll", scrollRecordStore.bind(this));
  }

  /**
   * 监听消费记录滚动条分页
   */
  scrollRecordStore() {
    const {changeIsEnd, record} = this.props;
    let {isEnd, pageNum, pageSize, total} = record;
    const {getConsumptionsHandler} = this;
    let documentHeight = document.body.offsetHeight || document.documentElement.offsetHeight,
      innerHeight = window.innerHeight,
      scrollTop = document.body.scrollTop,
      max_num = Math.ceil(total / pageSize);
    if ((documentHeight - (innerHeight + scrollTop)) / documentHeight <= 0.05) {
      // 触发加载保护
      if (!isEnd) {
        changeIsEnd.bind(this)(true);
        if (max_num > pageNum) {
          // 加载新目录页
          getConsumptionsHandler.bind(this)(++pageNum);
        }
      }
    }
  }

  render() {
    const {record} = this.props;
    const {consumptions} = record;
    return (
      <section className={styles["record"]["record"]}>
        <header className={styles["record"]["record-header"]}>
          <h3 className={styles["record"]["record-header-title"]}>
            消费记录
          </h3>
        </header>
        <main className={styles["record"]["record-main"]}>
          {
            consumptions.length > 0 ? consumptions.map((consumptionsItem, consumptionsIndex) => {
              return (
                <section key={consumptionsIndex}
                         className={styles["record"]["record-main-consumptionsItem"]}
                >
                  <p className={styles["record"]["record-main-consumptionsItem-paragraph"]}>
                    <span>
                      消费书币:
                    </span> <span className={styles["record"]["record-main-consumptionsItem-costBalance"]}>
                    {`[${consumptionsItem["cost_balance"]}]`}
                    </span>
                    <time className={styles["record"]["record-main-consumptionsItem-time"]}>
                      {consumptionsItem["create_date"]}
                    </time>
                  </p>
                  <p className={styles["record"]["record-main-consumptionsItem-paragraph"]}>
                    <span className={styles["record"]["record-main-consumptionsItem-description"]}>
                      小说:
                    </span> {consumptionsItem["fic_title"]}
                  </p>
                  <p className={styles["record"]["record-main-consumptionsItem-paragraph"]}>
                    <span className={styles["record"]["record-main-consumptionsItem-description"]}>
                      章节:
                    </span> {consumptionsItem["chap_title"]}
                  </p>
                </section>
              )
            }) : <p className={styles["record"]["record-main-emptyConsumptions"]}>
              土豪，快去消费吧
            </p>
          }
        </main>
      </section>
    )
  }
}

export default RecordComponent;
