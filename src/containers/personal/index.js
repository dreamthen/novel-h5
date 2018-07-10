import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";
import history from "../../static/history";
import styles from "../../stylesheets";

@connect(function mapStateToProps(state) {
  return {
    personal: state.personal
  }
}, function mapDispatchToProps(dispatch) {
  return {}
})

class PersonalComponent extends Component {
  static propTypes = {
    personal: PropTypes.object
  };

  /**
   * 前往其他功能模块
   * @param to
   * @param e
   */
  historyToFuncModule(to, e) {
    const {history} = this.props;
    history.push(to);
    //取消冒泡事件
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const {personal} = this.props;
    const {id, headimgurl} = personal;
    const {historyToFuncModule} = this;
    return (
      <section className={styles["personal"]["personal"]}>
        <header className={styles["personal"]["personal-header"]}>
          <img src={headimgurl} className={styles["personal"]["personal-header-avatar"]} alt="头像"/>
          <aside className={styles["personal"]["personal-header-aside"]}>
            <dfn className={styles["personal"]["personal-header-aside-id"]}>ID: {id}</dfn> <span>书币: 200</span>
          </aside>
        </header>
        <main className={styles["personal"]["personal-main"]}>
          {
            history["history"].map((historyItem, historyIndex) => {
              return (
                <section key={historyIndex}
                  className={styles["personal"]["personal-main-funcModule"]}
                  onClick={historyToFuncModule.bind(this, historyItem["to"])}
                >
                  <i className={historyItem["icon"]}>

                  </i>
                  <span>
                    {historyItem["text"]}
                  </span>
                </section>
              )
            })
          }
        </main>
      </section>
    )
  }
}

export default PersonalComponent;

