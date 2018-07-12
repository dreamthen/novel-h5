import React, {Component} from "react";
import {connect} from "dva";
import {Link, withRouter} from "dva/router";
import _package from "../../package";
import {routerRedux} from "dva/router";
import routeConfig from "../../configs/route";
import styles from "../../stylesheets";

// 布局路由
@withRouter
@connect(function mapStateToProps(state) {
  return {
    route: state.route,
    personal: state.personal
  }
}, function mapDispatchToProps(dispatch) {
  return {
    currentuser() {
      dispatch({
        type: 'route/currentuser',
        payload: {}
      })
    },
    /**
     * 前往结果页面
     */
    putToResult() {
      dispatch(routerRedux.push("/result?result=success&title=请在微信客户端打开"));
    }
  }
})

class NavComponent extends Component {
  /**
   * 当组件挂载时,去获取会话的用户信息
   */
  componentDidMount() {
    const {currentuser, putToResult} = this.props;
    currentuser.bind(this)();
    let isWeixin = _package.isWeixin();
    isWeixin.then((isWeixinResult) => {
      if (!isWeixinResult) {
        putToResult.bind(this)();
      }
    }, () => {

    });
  }

  /**
   * 跳往个人中心页
   **/
  toPersonalNav(e) {
    const {history} = this.props;
    history.push("/personal");
    //取消冒泡事件
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const {route, personal} = this.props;
    const {innerHeight, bgColor, nickname} = route;
    const {headimgurl} = personal;
    const {toPersonalNav} = this;
    //过滤出isLink为true的数组项
    const isLinkNav = routeConfig["route"].filter(routeItem => routeItem.isLink);
    return (
      <main style={{height: innerHeight, backgroundColor: bgColor}}>
        <header className={styles["route"]["novel-header"]}>
          <nav>
            <ul>
              {
                isLinkNav.map((linkNavItem, linkNavIndex) => {
                  return (
                    <li key={linkNavIndex}
                        className={styles["route"]["novel-header-link"]}
                    >
                      <Link to={linkNavItem["path"]}>
                        {linkNavItem["text"]}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
          {/* 用户身份栏 */}
          <section className={styles["route"]["novel-header-section"]}>
            <main className={styles["route"]["novel-header-section-username"]}>
              <img className={styles["route"]["novel-header-section-avatar"]} src={headimgurl} alt="头像"/>
              {nickname}
            </main>
            <aside
              className={styles["route"]["novel-header-section-userInformation"]}
              onClick={toPersonalNav.bind(this)}
            >
              个人中心
            </aside>
          </section>
        </header>
        <section>
          {/* 这里的childrn对接符合路由条件的路由组件Route */}
          {this.props.children}
        </section>
      </main>
    )
  }
}

export default NavComponent;
