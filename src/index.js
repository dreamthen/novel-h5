import dva from "dva";
import {Router, Switch} from "dva/router";
import React from "react";
import {createBrowserHistory } from "history";
import RouteComponent from "./containers/route";
import route from "./configs/route";
import stores from "./stores";

//初始化dva
let app = dva({
  history: createBrowserHistory()
});
window.app = app;

//配置所有页面功能model
stores(app);

//配置路由
// app.router(({history}) => {
//   return (
//     <Router history={history}>
//     {/* 布局路由组件 */}
//       <RouteComponent>
//         <Switch>
//           {/* 具体页面路由组件 */}
//           {route}
//         </Switch>
//       </RouteComponent>
//     </Router>
//   )
// });
app.router(route.route);

//将组件配置到视图上面
app.start("#root");
export default app;



