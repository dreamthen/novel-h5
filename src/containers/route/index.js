import React, {Component} from "react";
import {connect} from "dva";
import {Link, withRouter} from "dva/router";
import routeConfig from "../../configs/route";
import styles from "../../stylesheets";

@withRouter
@connect(function mapStateToProps(state) {
  return {
    route: state.route
  }
}, function mapDispatchToProps(dispatch) {
  return {

  }
})

// 布局路由
class RouteComponent extends Component {
  render() {
    const navRoute = routeConfig["route"].filter(val => {
      return val.isNav;
    });
    return (
      <main>
        <header className={styles["route"]["novel-header"]}>
          <nav>
            <ul>
              {navRoute.map((routeItem, routeIndex) => {
                return <li key={routeIndex} className={styles["route"]["novel-header-link"]}>
                  <Link to={routeItem["path"]}>
                    {routeItem["text"]}
                  </Link>
                </li>
              })}
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

export default RouteComponent;
