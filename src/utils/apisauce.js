import { create } from "apisauce";
import qs from "query-string";

const baseURL = process.env.SERVER_APP_BASE_URL;

const client = create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
const INTERNAL_SERVER_ERROR =
  "we are unable to process your request at this time, please contact our support.";

const checkUserToken = () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return false;
  }
  client.setHeader("Authorization", token);
  return true;
};

const checkAdminToken = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return false;
  }
  client.setHeader("Authorization", token);
  return true;
};

const capitalize = (input) => {
  if (
    input !== null &&
    input !== "" &&
    input !== undefined &&
    typeof input === "string"
  ) {
    var words = input?.split("_");
    var CapitalizedWords = [];
    words.forEach((element) => {
      CapitalizedWords.push(
        element[0]?.toUpperCase() + element?.slice(1, element?.length)
      );
    });
    return CapitalizedWords?.join(" ");
  }
  input = "";
  return input;
};

const request = async (method, path, data) => {
  if (localStorage.getItem("userToken")) {
    checkUserToken();
  } else {
    checkAdminToken();
  }

  let response = undefined;
  try {
    if (
      method === "GET" &&
      (typeof data === "object" || typeof data === "string")
    ) {
      path += "?" + qs.stringify(data);
    }
    if (method !== "GET") {
      response = await client[method.toLowerCase()](path, data);
    } else {
      response = await client[method.toLowerCase()](path);
    }
  } catch (error) {
    response = error.response;
  }
  if (response.data.code === 400) {
    let resp = JSON.stringify(response.data);
    throw Object(JSON.parse(resp));
  }
  if (response.data.code >= 400) {
    if (response.data.code === 401) {
      return logout();
    }
    if (response.data.code === 422) {
      let resp = JSON.stringify(response.data);
      throw Object(JSON.parse(resp));
    }
    if (response.data.code === 404) {
      let resp = JSON.stringify(response.data);
      throw Object(JSON.parse(resp));
    }
    if (response.data.code === 500) {
      // internal server error
      if (process.env.REACT_APP_ENVIRONMENT !== "production") {
        let resp = JSON.stringify(response.data);
        throw Object(JSON.parse(resp));
      } else {
        throw Object(INTERNAL_SERVER_ERROR);
      }
    }
    if (response.data.code === 403) {
      let resp = JSON.stringify(response.data);
      throw Object(JSON.parse(resp));
    }
    let resp = JSON.stringify(response.data);
    throw Object(`Unhandled Error: ${JSON.parse(resp)}`);
  }
  if (response.problem) {
    let resp = JSON.stringify(response.problem);
    throw Object(JSON.parse(resp));
  }
  return response.data;
};

const isAll = (arr, fn) => arr.every(fn);

export { checkUserToken, checkAdminToken, capitalize, isAll };
export default request;
