import novel_h5_interface from "../configs/interface";

let homestore = (app) => {
  app.model({
    namespace: 'home',
    state: {
      banner_fictions: [],
      recommend_fictions: [],
      fantasy_fictions: [],
      girl_fictions: [],
      love_fictions: []
    },
    subscriptions: {

    },
    effects: {
      /**
       * 拉取首页小说资源列表
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */
      * indexfictions({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["indexfictions"], payload);
        let body = response.body;
        yield put({type: 'getIndexFictionsData', payload: body});
      }
    },
    reducers: {
      /**
       * 获取首页小说的数据
       * @param state
       * @param {*}
       */
      getIndexFictionsData(state, {payload}) {
        return {
          ...state,
          ...payload
        }
      }
    }
  });
};

export default homestore;
