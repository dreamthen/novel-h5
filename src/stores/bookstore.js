import novel_h5_interface from "../configs/interface";

/**
 * 初始化页面状态数据
 * @type {{classifications: Array, search: string, categories: number, categoriesId: number, update: number, updateString: string, fictions: Array, total: number, pageNum: number, pageSize: number, isEnd: boolean}}
 */
const defaultState = {
  //分类列表
  classifications: [],
  //搜索关键字
  search: '',
  //分类数据模型
  categories: 0,
  //分类数据id
  categoriesId: 0,
  //更新数据模型
  update: 0,
  //更新数据id
  updateString: 'all',
  //书库小说列表
  fictions: [],
  //书库小说列表总数
  total: 0,
  //书库小说列表当前页
  pageNum: 1,
  //书库小说列表每页的数量
  pageSize: 10,
  //书库小说列表分页是否到底部
  isEnd: false
};

let bookstore = (app) => {
  app.model({
    namespace: 'bookstore',
    state: defaultState,
    effects: {
      /**
       * 拉取所有小说分类列表
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* classifications({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["classifications"], payload);
        let body = response.body;
        let all = {id: 0, title: '全部'};
        body.unshift(all);
        yield put({type: 'getClassifications', payload: body});
      },
      /**
       * 查询书库小说列表
       * @param payload
       * @param call
       * @param put
       * @returns {IterableIterator<*>}
       */* fictions({payload}, {call, put}) {
        let response = yield call(novel_h5_interface["fictions"], payload);
        let body = response.body;
        yield put({
          type: 'getFictions',
          payload: {data: body, pageNum: payload["page_num"]}
        });
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
       * 更新数据id
       * @param state
       * @param payload
       * @returns {{updateString: *}}
       */
      changeUpdate(state, {payload}) {
        return {
          ...state,
          updateString: payload
        }
      },
      /**
       * 分类改变数据id
       * @param state
       * @param payload
       * @returns {{categoriesId: *}}
       */
      changeCategoriesId(state, {payload}) {
        return {
          ...state,
          categoriesId: payload
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
      },
      /**
       * 查询书库小说列表
       * @param state
       * @param payload
       * @returns {{fictions: *, total: *}}
       */
      getFictions(state, {payload}) {
        return {
          ...state,
          fictions: payload["pageNum"] > 1 ? [...state["fictions"], ...payload["data"]["rows"]] : payload["data"]["rows"],
          total: payload["data"]["count"],
          pageNum: payload["pageNum"]
        }
      },
      /**
       * 改变书库小说列表分页是否到底部状态
       * @param state
       * @param payload
       * @returns {{isEnd: *}}
       */
      changeEndAction(state, {payload}) {
        return {
          ...state,
          isEnd: payload
        }
      },
      /**
       * 重置页面至初始化状态
       * @param state
       * @returns {{classifications: Array, search: string, categories: number, categoriesId: number, update: number, updateString: string, fictions: Array, total: number, pageNum: number, pageSize: number, isEnd: boolean}}
       */
      reset(state) {
        return {
          ...state,
          ...defaultState
        }
      }
    }
  });
};
export default bookstore;
