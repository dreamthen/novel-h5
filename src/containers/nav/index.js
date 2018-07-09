import React, {Component} from "react";
import {connect} from "dva";
import {Link, withRouter} from "dva/router";
import styles from "../../stylesheets";

// 布局路由
@withRouter
@connect(function mapStateToProps(state) {
  return {
    route: state.route
  }
}, function mapDispatchToProps(dispatch) {
  return {
  }
})
class NavComponent extends Component {

  render() {
    const {route} = this.props;
    const {innerHeight, bgColor} = route;
    return (
      <main style={{height: innerHeight, backgroundColor: bgColor}}>
        <header className={styles["route"]["novel-header"]}>
          <nav>
            <ul>
              {/* 改成手动配置 */}
              <li className={styles["route"]["novel-header-link"]}>
                <Link to='/'>
                  首页
                </Link>
              </li>
              <li className={styles["route"]["novel-header-link"]}>
                <Link to='/bookstore'>
                  书库
                </Link>
              </li>
              <li className={styles["route"]["novel-header-link"]}>
                <Link to='/recharge'>
                  充值页
                </Link>
              </li>
            </ul>
          </nav>
          <section className={styles["route"]["novel-header-section"]}>
            <main className={styles["route"]["novel-header-section-username"]}>
              匿名用户
            </main>
            <aside className={styles["route"]["novel-header-section-userInformation"]}>
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