/**
 * 默认页面状态
 * @type {{innerHeight: undefined, bgColor: string}}
 */
const defaultState = {
  //页面高度
  innerHeight: undefined,
  //页面背景色
  bgColor: "#f5f5f9"
};

let routestore = (app) => {
  app.model({
    namespace: "route",
    state: defaultState,
    subscriptions: {
      setup({history, dispatch}) {
        history.listen((location) => {
          let innerHeight = window.innerHeight;
          if (location.pathname === "/recharge") {
            /**
             * 重置页面背景色
             */
            dispatch({
              type: 'resetBgColor',
              payload: "#fbf9fe"
            });
            /**
             * 重置页面高度
             */
            dispatch({
              type: 'resetInnerHeight',
              payload: innerHeight
            });
          } else {
            /**
             * 重置页面至初始化
             */
            dispatch({
              type: 'resetInitial'
            });
          }
        })
      }
    },
    effects: {},
    reducers: {
      /**
       * 重置页面高度
       * @param state
       * @param payload
       */
      resetInnerHeight(state, {payload}) {
        return {
          ...state,
          innerHeight: payload
        }
      },
      /**
       * 重置页面背景色
       * @param state
       * @param payload
       * @returns {{bgColor: *}}
       */
      resetBgColor(state, {payload}) {
        return {
          ...state,
          bgColor: payload
        }
      },
      /**
       * 初始化页面至默认状态
       * @param state
       * @returns {{defaultState: {innerHeight: undefined, bgColor: string}}}
       */
      resetInitial(state) {
        return {
          ...state,
          ...defaultState
        }
      }
    }
  });
};

export default routestore;
