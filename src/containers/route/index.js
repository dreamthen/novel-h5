import React from "react";
import {connect} from "dva";
import {Link, withRouter} from "dva/router";
import routeConfig from "../../configs/route";
import styles from "../../stylesheets";

const Route = ({route, dispatch}) => {
  return {
    render() {
      return (
        <main>
          <header className={styles["route"]["novel-header"]}>
            <nav>
              <ul>
                {routeConfig["route"].map((routeItem, routeIndex) => {
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
            {this.props.children}
          </section>
        </main>
      )
    }
  }
};

const RouteComponent = withRouter(connect(function mapStateToProps(state) {
  return {
    route: state.route
  }
})(Route));

export default RouteComponent;
