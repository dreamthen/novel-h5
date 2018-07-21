import {routerRedux} from "dva/router";
import _package from "../package";
import weixin from "../public/weixin";
import code from "../static/code";
import novel_h5_interface from "../configs/interface";
import {Toast} from "antd-mobile";

/**
 * 默认页面状态
 * @type {{appid: string}}
 */
const defaultState = {
  appid: ""
};

let firstRecharge = (app) => {
  app.model({
    namespace: "firstRecharge",
    state: defaultState,
    effects: {
      /**
       * 发起首充请求
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* firstRechargeRequest({payload}, {call, put}) {
        Toast.loading("支付中...");
        const response = yield call(novel_h5_interface.firstpay, {appid: payload["appid"]});
        const signType = payload.signType;
        Toast.hide();
        if (response.success) {
          if (!_package.isEmpty(response.body)) {
            let body = response.body,
              timeStamp = (new Date(body["modify_date"]).getTime() / 1000).toString(),
              nonceStr = _package.getRandom32ToString(),
              weixinResult = weixin(window.WeixinJSBridge);
            const payResult = yield call(weixinResult.readyBridge.call(weixinResult, body["key"], body["prepay_id"], body["appid"], timeStamp, nonceStr, signType));
            switch (payResult.errmsg) {
              case code["code"]["weixin_pay_success"]:
                yield routerRedux.push("/result?result=success&title=充值成功");
                break;
            }
          }
        } else {
          yield routerRedux.push("/result?result=success&title=您已发起过首充");
        }
      }
    },
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
          appid: payload["appid"]
        }
      },

      /**
       * 重置会话用户信息
       * @param state
       * @returns {{appid: string}}
       */
      resetCurrentUser(state) {
        return {
          ...state,
          ...defaultState
        }
      }
    }
  });
};

export default firstRecharge;
