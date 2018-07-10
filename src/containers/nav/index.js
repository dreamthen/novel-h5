import React, {Component} from "react";
import {connect} from "dva";
import {Link, withRouter} from "dva/router";
import routeConfig from "../../configs/route";
import styles from "../../stylesheets";

// 布局路由
@withRouter
@connect(function mapStateToProps(state) {
  return {
    route: state.route
  }
}, function mapDispatchToProps(dispatch) {
  return {
    currentuser() {
      dispatch({
        type: 'route/currentuser',
        payload: {}
      })
    }
  }
})

class NavComponent extends Component {
  /**
   * 当组件挂载时,去获取会话的用户信息
   */
  componentDidMount() {
    const {currentuser} = this.props;
    currentuser.bind(this)();
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
    const {route} = this.props;
    const {innerHeight, bgColor} = route;
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
          <section className={styles["route"]["novel-header-section"]}>
            <main className={styles["route"]["novel-header-section-username"]}>
              匿名用户
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
