import novel_h5_interface from '../configs/interface';
import _package from "../package";
import { Toast } from 'antd-mobile';
let historystore = app => {
  app.model({
    namespace: 'readhistory',
    state: {
      histories: []
    },
    effects: {
      *deleteHistory({ payload }, { call, put }) {
        const response = yield call(novel_h5_interface['deleteHistory'], {
          id: payload.id
        });
        if (response.errno === 0) {
          Toast.success('删除成功', 1);
          yield put({
            type: 'fetchHistories'
          });
        }
      },
      *fetchHistories(_, { call, put }) {
        const response = yield call(novel_h5_interface['histories'], {});
        if (!_package.isEmpty(response.body)) {
          let body = response.body;
          yield put({
            type: 'save',
            payload: {
              histories: body["rows"]
            }
          });
        }
      }
    },
    reducers: {
      save(state, { payload }) {
        return {
          ...state,
          ...payload
        };
      }
    }
  });
};

export default historystore;
