import novel_h5_interface from "../configs/interface";

let bookstore = (app) => {
  app.model({
    namespace: 'bookstore',
    state: {
      //分类列表
      classifications: [],
      //分类数据模型
      categories: 0,
      //更新数据模型
      update: 0
    },
    effects: {
      /**
       * 拉取所有小说分类列表
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */
      * classifications({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["classifications"], payload);
        let body = response.body;
        let all = {id: 0, title: '全部'};
        body.unshift(all);
        yield put({type: 'getClassifications', payload: body});
      }
    },
    reducers: {
      /**
       * 拉取所有小说分类列表
       * @param state
       * @param payload
       * @returns {{classifications: *}}
       */
      getClassifications(state, {payload}) {
        return {
          ...state,
          classifications: payload
        }
      },
      /**
       * 分类改变样式监听
       * @param state
       * @param payload
       * @returns {{}}
       */
      categoriesChangeAction(state, {payload}) {
        return {
          ...state,
          ...payload
        }
      }
    }
  });
};
export default bookstore;
