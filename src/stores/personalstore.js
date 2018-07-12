import assets from "../assets";

/**
 * 默认个人信息数据状态
 * @type {{id: number, headimgurl: *}}
 */
const defaultState = {
  //用户ID
  id: 0,
  //用户头像
  headimgurl: assets["avatar"],
  //用户书币
  balance: 0
};

let personal = (app) => {
  app.model({
    namespace: "personal",
    state: defaultState,
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
          headimgurl: payload["headimgurl"] ? payload["headimgurl"] : assets["avatar"],
          balance: payload["balance"]
        }
      },
      /**
       * 重置会话用户信息
       * @param state
       * @returns {{}}
       */
      resetCurrentUser(state) {
        return {
          ...state,
          ...defaultState
        }
      }
    },
    subscriptions: {}
  })
};

export default personal;
