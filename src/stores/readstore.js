import novel_h5_interface from "../configs/interface";
import { routerRedux } from 'dva/router';

const readsotre = app => {
  app.model({
    namespace: 'read',
    state: {
      fontSize: '18px',
      readMode: 'day',
      fontModalVisible: false,
      readModeModalVisible: false,
      chapId: null,
      content: '',
      title: '',
      serial: null,
      ficId: null
    },
    effects: {
      *fetchContent({ payload }, { call, put }) {
        const response = yield call(novel_h5_interface['content'], {
          ...payload
        });
        // 当前章是最后一章
        if (506 === response.errno) {
          yield put(routerRedux.push('/result'));
        }
        const { body } = response;
        yield put({
          type: 'save',
          payload: {
            content: body.content,
            ficId: body.fic_id,
            chapId: body.chap_id,
            serial: body.serial,
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

export default readsotre;