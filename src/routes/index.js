import React from "react";
import {Route} from "dva/router";
import routeConfig from "../configs/route";
import NavComponent from "../containers/nav";

/**
 * 根据路由静态配置,动态配置子路由
 * @deprecated
 */
const route = (function routeIIFE(routeConfig) {
  return routeConfig.map((routeItem, routeIndex) => {
    if (routeItem["isNav"]) {
      return (
        <Route key={routeIndex} path={routeItem["path"]} component={props => {
          return <NavComponent {...props}>
            <Route path={routeItem["path"]} component={routeItem["component"]}/>
          </NavComponent>
        }} exact/>
      )
    } else {
      return (
        <Route key={routeIndex} path={routeItem["path"]} component={routeItem["component"]} exact/>
      )
    }
  });
})(routeConfig["route"]);

export default route;

