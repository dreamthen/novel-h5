import novel_h5_interface from "../configs/interface";

const recharge = (app) => {
  app.model({
    namespace: "recharge",
    state: {
      //充值产品列表
      rechargeproductsList: []
    },
    effects: {
      * rechargeproducts({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["chargeproducts"], payload);
        let body = response.body;

      }
    },
    reducers: {}
  })
};

export default recharge;
