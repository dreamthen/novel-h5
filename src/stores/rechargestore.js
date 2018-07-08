import novel_h5_interface from "../configs/interface";

const recharge = (app) => {
  app.model({
    namespace: "recharge",
    state: {
      //充值产品列表
      rechargeproductsList: [],
      //充值产品列表选择item
      rechargeSelect: 0
    },
    effects: {
      /**
       * 搜索充值产品列表
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */
      * rechargeproducts({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["chargeproducts"], payload);
        let body = response.body;
        yield put({type: 'rechargeproductsAction', payload: body})
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
      }
    }
  })
};

export default recharge;
