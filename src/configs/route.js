import React from "react";
import HomeComponent from "../containers/home";
import BookStoreComponent from "../containers/bookstore";

/**
 * 路由静态配置
 * @type {*[]}
 */
const route = [
  {path: "/", component: HomeComponent, text: "首页", exact: true},
  {path: "/bookstore", component: BookStoreComponent, text: "书库"}
];

export default {
  route
};
