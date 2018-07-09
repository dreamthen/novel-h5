import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";
import code from "../../static/code";
import styles from "../../stylesheets";

@connect(function mapStateToProps(state) {
  return {
    bookstore: state.bookstore
  }
}, function mapDispatchToProps(dispatch) {
  return {
    /**
     * 拉取所有小说分类列表
     */
    getClassifications() {
      return new Promise((resolve, reject) => {
        dispatch({
          type: 'bookstore/classifications',
          payload: {}
        });
        resolve();
      });
    },

    /**
     * 分类改变样式监听
     * @param payload
     */
    changeCategories(payload) {
      dispatch({
        type: 'bookstore/categoriesChangeAction',
        payload
      });
    },
    /**
     * 更新改变数据id
     * @param updateString
     */
    changeUpdate(updateString) {
      return new Promise((resolve) => {
        dispatch({
          type: 'bookstore/changeUpdate',
          payload: updateString
        });
        resolve();
      });
    },
    /**
     * 分类改变数据id
     * @params categoriesId
     */
    changeCategoriesId(categoriesId) {
      return new Promise((resolve) => {
        dispatch({
          type: 'bookstore/changeCategoriesId',
          payload: categoriesId
        });
        resolve();
      });
    },
    /**
     * 查询书库小说列表
     * @params
     */
    getFictions(params) {
      dispatch({
        type: 'bookstore/fictions',
        payload: params
      });
    },
    /**
     * 改变书库小说列表分页是否到底部状态
     * @param isEnd
     */
    changeEnd(isEnd) {
      dispatch({
        type: 'bookstore/changeEndAction',
        payload: isEnd
      })
    },
    /**
     * 重置页面至初始化状态
     */
    reset() {
      dispatch({
        type: 'bookstore/reset'
      })
    }
  }
})

class BookStoreComponent extends Component {
  static propTypes = {
    bookstore: PropTypes.object
  };

  /**
   * 组件装载完毕之后,拉取所有小说分类列表
   */
  componentDidMount() {
    const {getClassifications} = this.props;
    const {scrollPagination, searchFictionsWithFilter} = this;
    getClassifications.bind(this)().then(() => {
      searchFictionsWithFilter.bind(this)();
    });
    //添加滚动分页系统配置
    scrollPagination.bind(this)();
  }

  /**
   * 在组件卸载完毕之后,重置页面至初始化状态
   */
  componentWillUnmount() {
    const {reset} = this.props;
    const {scrollBookStore} = this;
    reset.bind(this)();
    window.removeEventListener("scroll", scrollBookStore.bind(this));
  }

  /**
   *
   * @param nextProps
   * @param nextState
   */
  componentWillReceiveProps(nextProps, nextState) {
    let fictions = this.props.bookstore.fictions,
      nextFictions = nextProps.bookstore.fictions,
      nextIsEnd = nextProps.bookstore.isEnd;
    const {changeEnd} = this.props;
    if (fictions.length !== nextFictions.length && nextIsEnd) {
      changeEnd.bind(this)(false);
    }
  }

  /**
   * 添加书库滚动条分页
   */
  scrollPagination() {
    const {scrollBookStore} = this;
    window.addEventListener("scroll", scrollBookStore.bind(this));
  }

  /**
   * 滚动条分页系统
   */
  scrollBookStore() {
    const {searchFictionsWithFilter} = this;
    const {bookstore, changeEnd} = this.props;
    let {pageNum, isEnd} = bookstore;
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
      document_height = document.body.offsetHeight,
      window_height = window.innerHeight;
    if ((document_height - (window_height + scrollTop)) / document_height <= 0.05) {
      if (!isEnd) {
        changeEnd.bind(this)(true);
        searchFictionsWithFilter.bind(this)(++pageNum);
      }
    }
  }

  /**
   * 根据条件拉取小说分类列表
   */
  searchFictionsWithFilter(pageNum = 1) {
    const {bookstore, getFictions} = this.props;
    const {pageSize, search, updateString, categoriesId, classifications, total} = bookstore;
    let max_pageNum = Math.ceil(total / pageSize);
    if (pageNum <= max_pageNum || total === 0) {
      getFictions.bind(this)({
        page_num: pageNum,
        page_size: pageSize,
        cls_id: (classifications.length === 0 || categoriesId === classifications[0]["id"]) ? undefined : categoriesId,
        going_status: updateString === code["categories_update"][0]["id"] ? undefined : updateString,
        title_like: search === "" ? undefined : search
      });
    }
  }

  /**
   * 分类改变样式监听
   */
  categoriesChangeHandler(key, index, id, e) {
    const {changeCategories, changeCategoriesId, changeUpdate} = this.props;
    const {searchFictionsWithFilter} = this;
    changeCategories.bind(this)({[key]: index});
    switch (key) {
      case "update":
        changeUpdate.bind(this)(id).then(() => {
          searchFictionsWithFilter.bind(this)();
        });
        break;
      case "categories":
        changeCategoriesId.bind(this)(id).then(() => {
          searchFictionsWithFilter.bind(this)();
        });
        break;
      default:
        break;
    }
    //取消冒泡事件
    e.nativeEvent.stopImmediatePropagation();
  }

  onFictionClick = ficId => {
    const {history} = this.props;
    history.push(`/synopsis?ficId=${ficId}`);
  };

  /**
   * 搜索关键字内容改变监听
   */
  searchChangeHandler(key, e) {
    const {changeCategories} = this.props;
    changeCategories.bind(this)({[key]: e.target.value});
    //取消冒泡事件
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const {bookstore} = this.props;
    const {classifications, categories, update, fictions} = bookstore;
    const {categoriesChangeHandler, searchChangeHandler, searchFictionsWithFilter} = this;
    return (
      <section className={styles["bookstore"]["bookstore"]}>
        <header className={styles["bookstore"]["bookstore-header"]}>
          <nav className={styles["bookstore"]["bookstore-header-nav"]}>
            <input
              type="text"
              className={styles["bookstore"]["bookstore-header-nav-search"]}
              placeholder="请输入书名"
              onChange={searchChangeHandler.bind(this, "search")}
            />
            <button className={styles["bookstore"]["bookstore-header-nav-button"]}
                    onClick={searchFictionsWithFilter.bind(this)}>
              搜索
            </button>
          </nav>
          <section className={styles["bookstore"]["bookstore-header-categories"]}>
            <div className={styles["bookstore"]["bookstore-header-categories-item"]}>
              <dfn>分类: </dfn>
              <aside className={styles["bookstore"]["bookstore-header-categories-item-aside"]}>
                {
                  classifications.map((classificationItem, classificationIndex) => {
                    return (
                      <span key={classificationIndex}
                            className={classificationIndex === categories ? styles["bookstore"]["bookstore-header-categories-item-aside-selected"] : ""}
                            onClick={categoriesChangeHandler.bind(this, "categories", classificationIndex, classificationItem["id"])}
                      >
                      {classificationItem["title"]}
                    </span>
                    )
                  })
                }
              </aside>
            </div>
            <div className={styles["bookstore"]["bookstore-header-categories-item"]}>
              <dfn>更新: </dfn>
              <aside className={styles["bookstore"]["bookstore-header-categories-item-aside"]}>
                {
                  code["categories_update"].map((updateItem, updateIndex) => {
                    return (
                      <span key={updateIndex}
                            className={updateIndex === update ? styles["bookstore"]["bookstore-header-categories-item-aside-selected"] : ""}
                            onClick={categoriesChangeHandler.bind(this, "update", updateIndex, updateItem["id"])}
                      >
                      {updateItem["title"]}
                    </span>
                    )
                  })
                }
              </aside>
            </div>
          </section>
        </header>
        <main className={styles["bookstore"]["bookstore-main"]}>
          {
            fictions.length > 0 && fictions.map((fictionItem, fictionIndex) => {
              return (
                <section className={styles["bookstore"]["bookstore-main-module"]} key={fictionIndex}
                         onClick={this.onFictionClick.bind(null, fictionItem["id"])}>
                  <img src={fictionItem["avatar"]} alt={fictionItem["title"]}/>
                  <aside className={styles["bookstore"]["bookstore-main-module-aside"]}>
                    <h3 className={styles["bookstore"]["bookstore-main-module-aside-title"]}>{fictionItem["title"]}</h3>
                    <p
                      className={styles["bookstore"]["bookstore-main-module-aside-paragraph"]}>{fictionItem["description"]}</p>
                  </aside>
                </section>
              )
            })
          }
        </main>
      </section>
    )
  }
}

export default BookStoreComponent;
