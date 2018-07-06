import api from "./api";
import axios from "./axios-config";

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

export default {
  indexfictions,
  classifications,
  fictions,
  chargeproducts
}
