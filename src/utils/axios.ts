import axios from "axios";
import { toQueryString, decodeSpecialString } from "./query";
import apiMap from "@src/page/config/api";
import { message } from "antd";
// import { formatRequestUrl } from "./request";

const loadingText = "正在加载"; // post请求的时候会自动添加
const successMessageText = "操作成功"; // post请求的时候会自动添加
const errorMessageText = "遇到了未知错误,您可以刷新页面重试";

interface IOption {
  url: string; // 请求发送的地址
  feedback?: boolean;
  type?: string; // 请求类型，可选：get、post，默认 get
  data?: string | number | Array<any> | object; // 发送的数据，如果为 Object 类型则会通过 param() 格式化为字符串，但 data 不能为嵌套 object 等复杂类型，只能为一级简单 object，如有嵌套数据，请自行序列化 JSON.stringify(data)
  timeout?: number; // 超时时间，单位为毫秒，超时后会触发 error
  cache?: boolean; // 是否缓存请求，dataType 为 script 或 jsonp 时默认 false，其他默认为 true。false 时则会自动给请求 url 加上时间戳
  contentType?: string;
  hideMessage?: boolean; // 在POST的情况下隐藏Message
  tbToken?: string;
}

// 返回的响应

interface IResponse<T> {
  success: boolean;
  model: T;
  msgCode: string;
  errCode: number;
  errMessage: string;
  extMessage: string;
}

// 获取token todo
function getToken(name?: string) {
  return name;
}

// 格式化入参
function formatOption(params: IOption) {
  const method = params.type || "get";
  const contentType = params.contentType || "application/x-www-form-urlencoded";
  const data = params.data || {};
  const headers = { "Content-Type": contentType };
  const tbToken = params.tbToken || "_tb_token_";

  const query = toQueryString(data); // 序列化
  // 转发代理api的前缀；对应到.webpackrc.js里进行相关代理请求的转发

  let url = apiMap[params.url];

  if (method == "get" && query) {
    url = url.indexOf("?") === -1 ? `${url}?${query}` : `${url}&${query}`;
  }

  const urlParams = {};
  urlParams[tbToken] = getToken(tbToken);

  return {
    url,
    method, // 默认为get请求，
    params: {
      _tb_token_: getToken(),
      ...urlParams,
    }, // url的参数
    data: contentType.indexOf("form") > -1 ? query : data, // 请求的body
    timeout: params.timeout || 8000, // 默认为8秒
    cache: Boolean(params.cache), // 默认为false
    withCredentials: true,
    headers,
    feedback:
      params.feedback !== undefined ? params.feedback : method === "post",
    hideMessage: params.hideMessage || false,
  };
}

// 单纯的ajax请求
export async function ajax<T>(options: any): Promise<IResponse<T>> {
  const response = await axios.request(options);
  try {
    // 转义特殊字符
    const dataString = decodeSpecialString(response.data);
    return JSON.parse(dataString);
  } catch (e) {}
  return response.data;
}

// 封装了一层业务的ajax请求
export async function fetch<T = any>(options: IOption): Promise<IResponse<T>> {
  // 格式化入参
  const config = formatOption(options);
  // post请求透出请求反馈
  config.feedback && message.loading(loadingText);

  try {
    const result = await ajax<T>(config);
    // 先关闭浮层
    message.destroy();
    // 请求成功
    if (result && (result.success == true || result.msgCode == "APP-001-200")) {
      // post请求透出请求反馈
      config.method === "post" &&
        !config.hideMessage &&
        message.success(successMessageText);
      return result;
    }

    // 请求失败，抛错给外层处理
    throw result;
  } catch (res) {
    message.destroy();

    // 有响应结果的请求失败，并且是post请求，要透出信息
    // res.errCode !== "5001" 兼容舆情反馈的特殊逻辑
    if (res && res.success === false && res.errCode !== "5001") {
      message.error(res.errMessage || errorMessageText); // 错误信息透出
    }

    return Promise.reject(res);
  }
}
