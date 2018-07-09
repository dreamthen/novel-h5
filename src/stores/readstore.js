import novel_h5_interface from "../configs/interface";
import { routerRedux } from 'dva/router';

const defaultState = {
  fontSize: '18px',
  readMode: 'day',
  fontModalVisible: false,
  readModeModalVisible: false,
  chapId: null,
  content: '',
  chapTitle: '',
  ficTitle: '',
  avatar: '',
  serial: null,
  ficId: null
};

const readsotre = app => {
  app.model({
    namespace: 'read',
    state: {
      ...defaultState
    },
    effects: {
      *fetchContent({ payload }, { call, put }) {
        const response = yield call(novel_h5_interface['content'], {
          ...payload
        });
        // 当前章是最后一章
        if (506 === response.errno) {
          yield put(routerRedux.push('/result?result=success&title=已是最后一章'));
        }
        const { body } = response;
        yield put({
          type: 'save',
          payload: {
            content: body.content,
            ficId: body.fic_id,
            chapId: body.chap_id,
            serial: body.serial,
            ficTitle: body.fic_title,
            chapTitle: body.chap_title,
            avatar: body.avatar
          }
        });
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

export default readsotre;