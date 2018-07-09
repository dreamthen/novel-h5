import React from "react";
import {Route} from "dva/router";
import routeConfig from "../configs/route";

/**
 * 根据路由静态配置,动态配置子路由
 * @deprecated
 */
const route = (function routeIIFE(routeConfig) {
  return routeConfig.map((routeItem, routeIndex) => {
    return (
      <Route key={routeIndex} path={routeItem["path"]} component={routeItem["component"]} exact/>
    )
  });
})(routeConfig["route"]);

export default route;

