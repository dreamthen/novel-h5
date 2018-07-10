import noval_h5_interface from "../configs/interface";
import _package from "../package";

/**
 * 默认页面状态
 * @type {{innerHeight: undefined, bgColor: string}}
 */
const defaultState = {
  //页面高度
  innerHeight: undefined,
  //页面背景色
  bgColor: "#f5f5f9",
  //个人信息昵称
  nickname: "匿名用户"
};

let routestore = (app) => {
  app.model({
    namespace: "route",
    state: defaultState,
    subscriptions: {
      setup({history, dispatch}) {
        history.listen((location) => {
          let innerHeight = window.innerHeight;
          if (location.pathname === "/recharge" || location.pathname === "/personal") {
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
    effects: {
      /**
       * 获取当前会话用户信息并配置会话用户信息
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* currentuser({payload}, {call, put}) {
        let response = yield call(noval_h5_interface["currentuser"], payload);
        if (!_package.isEmpty(response.body)) {
          let body = response.body;
          yield put({
            type: 'personal/getCurrentUser',
            payload: body
          });
          yield put({
            type: 'setCurrentUserNickname',
            payload: body
          });
        } else {
          yield put({
            type: 'personal/resetCurrentUser'
          });
          yield put({
            type: 'resetCurrentUserNickname'
          });
        }
      }
    },
    reducers: {
      /**
       * 设置会话用户信息昵称
       * @param state
       * @param payload
       * @returns {{nickname: *}}
       */
      setCurrentUserNickname(state, {payload}) {
        return {
          ...state,
          nickname: payload.nickname
        }
      },
      /**
       * 重置会话用户信息昵称
       * @param state
       * @returns {{nickname: string}}
       */
      resetCurrentUserNickname(state) {
        return {
          ...state,
          nickname: defaultState.nickname
        }
      },
      /**
       * 重置页面高度
       * @param state
       * @param payload
       * @returns {{innerHeight: *}}
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
