import novel_h5_interface from "../configs/interface";

const recharge = (app) => {
  app.model({
    namespace: "recharge",
    state: {
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
      appId: ""
    },
    effects: {
      /**
       * 搜索充值产品列表
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* rechargeproducts({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["chargeproducts"], payload);
        let body = response.body;
        let default_charge_type_id = body[0]["id"];
        yield put({type: 'rechargeproductsAction', payload: body});
        yield put({type: 'rechargeSelectChange', payload: {charge_type_id: default_charge_type_id}})
      },
      /**
       * 确认充值
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* payorders({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["payorders"], payload);
        let body = response.body;
        let timeStamp = (new Date(body["modify_date"]).getTime() / 1000).toString();
        put({
          type: 'rechargePayOrdersForPayRequest',
          payload: {
            paySign: body["key"],
            prepay_id: body["prepay_id"],
            appId: body["appId"],
            timeStamp
          }
        });
      }
    },
    reducers: {
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
