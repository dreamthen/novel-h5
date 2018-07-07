import novel_h5_interface from '../configs/interface';
const chapterstore = app => {
  app.model({
    namespace: 'chapter',
    state: {
      isEnd: false,
      pageNum: 1,
      pageSize: 10,
      chapters: []
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
        yield put({
          type: 'save',
          payload: {
            chapters: chapters.concat(body.rows),
            pageNum: payload.page_num
          }
        });
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

export default chapterstore;