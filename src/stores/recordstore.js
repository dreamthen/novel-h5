import novel_h5_interface from "../configs/interface";
import _package from "../package";

const defaultState = {
  //消费记录列表
  consumptions: [],
  //消费记录列表每页的数量
  pageSize: 10,
  //消费记录列表当前页
  pageNum: 1,
  //消费记录列表总数
  total: 0
};

let record = (app) => {
  app.model({
    namespace: "record",
    state: Object.assign({}, defaultState, {
      //消费记录列表分页是否到底部
      isEnd: false
    }),
    effects: {
      /**
       * 获取消费记录
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* consumptions({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["consumptions"], payload);
        if (!_package.isEmpty(response.body)) {
          let body = response.body;
          yield put({
            type: 'getConsumptions',
            payload: {
              total: body["count"],
              consumptions: body["rows"],
              pageNum: payload["page_num"]
            }
          });
        }
      }
    },
    reducers: {
      /**
       * 获取消费记录Reducer
       * @param state
       * @param payload
       * @returns {*}
       */
      getConsumptions(state, {payload}) {
        return {
          ...state,
          total: payload["total"],
          consumptions: [...state["consumptions"], ...payload["consumptions"]],
          pageNum: payload["pageNum"]
        }
      },
      /**
       * 重置页面数据状态
       * @returns {{}}
       */
      reset(state) {
        return {
          ...state,
          ...defaultState
        }
      },
      /**
       * 改变消费记录列表分页是否到底部boolean值
       * @param state
       * @param payload
       * @returns {{isEnd: *}}
       */
      changeIsEnd(state, {payload}) {
        return {
          ...state,
          isEnd: payload
        }
      }
    },
    subscriptions: {}
  });
};

export default record;
