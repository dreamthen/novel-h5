import weixin from "../public/weixin";
import code from "../static/code";
import _package from "../package";
import novel_h5_interface from "../configs/interface";
import {routerRedux} from 'dva/router';
import {Toast} from 'antd-mobile';

const defaultState = {
  //充值产品列表
  rechargeproductsList: [],
  //充值产品列表选择item
  rechargeSelect: 0,
  //充值产品ID
  charge_type_id: 0,
  //签名
  paySign: "",
  //签名方式
  signType: "MD5",
  //订单详情扩展字符串
  prepay_id: "",
  //时间戳
  timeStamp: "",
  //公众号id
  appId: "",
  //随机字符串
  nonceStr: ""
};

const recharge = (app) => {
  app.model({
    namespace: "recharge",
    state: defaultState,
    effects: {
      /**
       * 搜索充值产品列表
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* rechargeproducts({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["chargeproducts"], payload);
        if (!_package.isEmpty(response.body)) {
          let body = response.body;
          let default_charge_type_id = body[0]["id"];
          yield put({type: 'rechargeproductsAction', payload: body});
          yield put({type: 'rechargeSelectChange', payload: {charge_type_id: default_charge_type_id}});
        }
      },
      /**
       * 确认充值并在H5网页中执行JS调起支付
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* payorders({payload}, {call, put}) {
        Toast.loading('支付中...', 0);
        let response = yield call(novel_h5_interface["payorders"], {charge_type_id: payload.charge_type_id});
        let signType = payload.signType;
        Toast.hide();
        if (!_package.isEmpty(response.body)) {
          let body = response.body,
            timeStamp = (new Date(body["modify_date"]).getTime() / 1000).toString(),
            nonceStr = _package.getRandom32ToString(),
            winxinResult = weixin(window.WeixinJSBridge);
          const payResult = yield call(winxinResult.readyBridge.bind(winxinResult, body["key"], body["prepay_id"], body["appid"], timeStamp, nonceStr, signType));
          switch (payResult.err_msg) {
            case code["code"]["weixin_pay_success"]:
              yield put(routerRedux.push('/result?result=success&title=充值成功'));
              break;
          }
        }
      }
    },
    reducers: {
      reset(state) {
        return {
          ...state,
          ...defaultState
        };
      },
      /**
       * 搜索充值产品列表Action
       * @param state
       * @param payload
       * @returns {{rechargeproductsList: *}}
       */
      rechargeproductsAction(state, {payload}) {
        return {
          ...state,
          rechargeproductsList: payload
        }
      },
      /**
       * 改变充值产品类型
       * @param state
       * @param payload
       * @returns {{}}
       */
      rechargeSelectChange(state, {payload}) {
        return {
          ...state,
          ...payload
        }
      },
      /**
       * 充值之后,将数据进行转化处理赋值
       * @param state
       * @param payload
       * @returns {{}}
       */
      rechargePayOrdersForPayRequest(state, {payload}) {
        return {
          ...state,
          ...payload
        }
      }
    }
  })
};

export default recharge;
