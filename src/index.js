import dva from "dva";
import React from "react";
import {createBrowserHistory} from "history";
import {Router, Switch} from "dva/router";
import route from "./routes";
import stores from "./stores";

//初始化dva
let app = dva({
  history: createBrowserHistory()
});

//配置所有页面功能model
stores(app);

//配置路由
app.router(({history}) => {
  return (
    <Router history={history}>
      {/* 布局路由组件 */}
      <Switch>
        {/* 具体页面路由组件 */}
        {route}
      </Switch>
    </Router>
  )
});

//将组件配置到视图上面
app.start("#root");

export default app;



