import assets from "../assets";

/**
 * 默认个人信息数据状态
 * @type {{id: number, headimgurl: *}}
 */
const defaultState = {
  id: 0,
  headimgurl: assets["avatar"]
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
          headimgurl: payload["headimgurl"] ? payload["headimgurl"] : assets["avatar"]
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
