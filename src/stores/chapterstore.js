import novel_h5_interface from '../configs/interface';
import _package from "../package";
let defaultState = {
  isEnd: false,
  pageNum: 1,
  pageSize: 20,
  chapters: []
};

const chapterstore = app => {
  app.model({
    namespace: 'chapter',
    state: {
      ...defaultState
    },
    effects: {
      *fetchChapters({ payload }, { call, put, select }) {
        const response = yield call(novel_h5_interface['chapters'], {
          ...payload
        });
        const { chapters } = yield select(state => {
          return state['chapter'];
        });
        const { body } = response;
        if (!_package.isEmpty(body)) {
          yield put({
            type: 'save',
            payload: {
              chapters: chapters.concat(body["rows"]),
              total: body["count"],
              pageNum: payload.page_num
            }
          });
        }
      }
    },
    reducers: {
      reset() {
        return {
          ...defaultState
        };
      },
      save(state, { payload }) {
        return {
          ...state,
          ...payload
        };
      }
    }
  });
};

export default chapterstore;
