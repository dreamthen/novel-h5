import assets from "../assets";

let personal = (app) => {
  app.model({
    namespace: "personal",
    state: {
      id: 0,
      headimgurl: assets["avatar"]
    },
    effects: {},
    reducers: {
      /**
       * 获取会话用户信息
       * @param state
       * @param payload
       * @returns {{}}
       */
      getCurrentUser(state, {payload}) {
        return {
          ...state,
          id: payload["id"],
          headimgurl: payload["headimgurl"]
        }
      }
    },
    subscriptions: {}
  })
};

export default personal;
