import novel_h5_interface from "../configs/interface";
const synopsisstore = app => {
  app.model({
    namespace: 'synopsis',
    state: {
      fiction: {
        id: null,
        avatar: '',
        goingStatus: '',
        artist: '',
        title: '',
        clsTitle: '',
        description: '',
        costBalance: 0
      },
      chapters: []
    },
    effects: {
      *fetchFiction({ payload }, { call, put }) {
        const response = yield call(novel_h5_interface['fiction'], {
          id: payload.ficId
        });
        const { body } = response;
        yield put({
          type: 'save',
          payload: {
            fiction: {
              id: body.id,
              artist: body.artist,
              avatar: body.avatar,
              clsTitle: body.cls_title,
              description: body.description,
              goingStatus: body.going_status,
              title: body.title,
              costBalance: body.cost_balance
            }
          }
        });
      },
      *fetchChapters({ payload }, { call, put }) {
        const response = yield call(novel_h5_interface['chapters'], {
          fic_id: payload.ficId,
          page_num: 1,
          page_size: 5
        });
        yield put({
          type: 'save',
          payload: {
            chapters: response.body.rows.map(val => {
              return {
                id: val.id,
                serial: val.serial,
                title: val.title,
                costBalance: val.cost_balance
              };
            })
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
export default synopsisstore;