import api from "./api";
import axios from "./axios-config";

const deleteHistory = async params => {
  return axios({
    url: `${api.histories}/${params.id}`,
    method: 'DELETE',
    headers: {}
  });
};

const histories = async params => {
  return axios({
    url: `${api.histories}`,
    method: 'GET',
    params,
    headers: {}
  });
};

const content = async params => {
  return axios({
    url: `${api.content}`,
    method: "GET",
    params,
    headers: {}
  });
};

const fiction = async params => {
  return axios({
    url: `${api.fictions}/${params.id}`,
    method: "GET",
    headers: {}
  });
};

const chapters = async params => {
  return axios({
    url: api.chapters,
    method: "GET",
    params,
    headers: {}
  });
};

/**
 * 拉取首页小说资源列表
 * @param params
 * @returns {Promise<*>}
 */
let indexfictions = async (params) => {
  return axios({
    url: api.indexfictions,
    method: "GET",
    params,
    headers: {}
  });
};

/**
 * 拉取所有小说分类列表
 * @params params
 * @returns {Promise<*>}
 */
let classifications = async (params) => {
  return axios({
    url: api.classifications,
    method: "GET",
    params,
    headers: {}
  })
};

/**
 * 小说查询
 * @param params
 * @returns {Promise<void>}
 */
let fictions = async (params) => {
  return axios({
    url: api.fictions,
    method: "GET",
    params,
    headers: {}
  })
};

/**
 * 搜索充值产品列表
 * @param params
 * @returns {Promise<*>}
 */
let chargeproducts = async (params) => {
  return axios({
    url: api.chargeproducts,
    method: "GET",
    params,
    headers: {}
  })
};

/**
 * 充值
 * @param params
 * @returns {Promise<void>}
 */
let payorders = async (params) => {
  return axios({
    url: api.payorders,
    method: "POST",
    params,
    headers: {}
  })
};

/**
 * 获取当前会话的用户信息
 * @param params
 * @returns {Promise<*>}
 */
let currentuser = async (params) => {
  return axios({
    url: api.currentuser,
    method: "GET",
    params,
    headers: {}
  });
};

export default {
  indexfictions,
  classifications,
  fictions,
  chargeproducts,
  chapters,
  fiction,
  content,
  histories,
  deleteHistory,
  payorders,
  currentuser
}
