import Vue from "vue";
import swal from "vue-swal";
import i18n from "@/core/plugins/i18n";
import Axios from "axios";
import GlobalEnv from "@/core/constants/global-env";
import sha1 from "sha1";
import _ from "underscore";
import store from "@/core/store";

Axios.defaults.baseURL = GlobalEnv.api.base;

_.mixin({
  // Compares two objects to see if all key/value pairs are equal.
  hasEqual: function(a, b, keys) {
    if (_.isUndefined(keys)) {
      keys = _.keys(b);
    }
    a = _.pick(a, keys);
    b = _.pick(b, keys);
    return _.isEqual(a, b);
  },

  // Recursive version of `find`:
  // Return the first value which passes a truth test at any depth of the collection.
  deepFind: function(obj, predicate, context) {
    var result;

    if (_.isFunction(predicate)) {
      predicate = _.iteratee(predicate, context);
      if (predicate(obj)) {
        return obj;
      }
    } else if (_.hasEqual(obj, predicate)) {
      return obj;
    }

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (_.isArray(obj[prop])) {
          _.each(obj[prop], function(_obj) {
            if (result) {
              return;
            }
            result = _.deepFind(_obj, predicate);
          });
        } else if (_.isObject(obj[prop])) {
          result = _.deepFind(obj[prop], predicate);
        } else {
          if (_.isFunction(predicate) && predicate(obj[prop])) {
            result = obj[prop];
          }
        }
        if (result) {
          return result;
        }
      }
    }
  },

  // Recursive version of `filter`:
  // Return all the elements that pass a truth test at any depth of the collection.
  deepFilter: function(obj, predicate, context) {
    var results = [];
    if (_.isFunction(predicate)) {
      predicate = _.iteratee(predicate, context);
      if (predicate(obj)) {
        results.push(obj);
      }
    } else if (_.hasEqual(obj, predicate)) {
      results.push(obj);
    }

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (_.isArray(obj[prop])) {
          _.each(obj[prop], function(_obj) {
            var result = _.deepFilter(_obj, predicate);
            if (result) {
              results.push(result);
            }
          });
        } else if (_.isObject(obj[prop])) {
          var result = _.deepFilter(obj[prop], predicate);
          if (result) {
            results.push(result);
          }
        } else {
          if (_.isFunction(predicate) && predicate(obj[prop])) {
            results.push(obj[prop]);
          }
        }
      }
    }
    if (results.length) {
      return _.flatten(results, true);
    }
  },

  deepSearch: function(collection, values) {
    var results = [];
    _.deepFilter(collection, function(obj) {
      var status = true;
      for (var i in values) {
        if (!status) {
          return;
        }
        status = _.contains(obj, values[i]);
      }
      if (status) {
        results.push(obj);
      }
    });
    if (results.length) {
      return results;
    }
  }
});

let axiosConfig = {
  withCredentials: false
};

Vue.use(swal);

const validateEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validatePass = pass => {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})"
  );

  return strongRegex.test(pass);
};

const showConfirmMsg = (title, msg, info) => {
  if (isNullOrEmpty(title)) title = i18n.t("tools.showConfirmMsg.title");
  if (isNullOrEmpty(msg)) msg = i18n.t("tools.showConfirmMsg.msg");
  if (isNullOrEmpty(info)) info = i18n.t("tools.showConfirmMsg.info");

  return Vue.$swal({
    title,
    content: {
      element: "div",
      attributes: {
        innerHTML: `
          <span style="font-size: 16px; font-weight: 500;">${msg}</span>
          <br />
          <span style="color: #969494; font-size: 14px;">${info}</span>
        `
      }
    },
    icon: "info",
    buttons: [
      {
        text: i18n.t("tools.showConfirmMsg.btnCancel"),
        value: false,
        visible: true,
        closeModal: true,
        className: "default"
      },
      {
        text: i18n.t("tools.showConfirmMsg.btnOk"),
        value: true,
        visible: true,
        closeModal: true,
        className: "success"
      }
    ]
  });
};

const showSuccessMsg = (title, msg) => {
  if (title === null) title = i18n.t("tools.showSuccessMsg.title");

  Vue.$swal({
    title,
    content: {
      element: "div",
      attributes: {
        innerHTML: msg
      }
    },
    icon: "success",
    button: i18n.t("tools.showSuccessMsg.btnOk")
  });
};

const showErrorMsg = (title, msg) => {
  if (title === null) title = i18n.t("tools.showErrorMsg.title");

  Vue.$swal({
    title,
    content: {
      element: "div",
      attributes: {
        innerHTML: msg
      }
    },
    icon: "error",
    button: i18n.t("tools.showErrorMsg.btnOk")
  });
};

const showErrorMsgAndGoLogin = (title, msg) => {
  showErrorMsg(title, msg);
  store.push("/logout");
};

const apiGet = url => {
  return new Promise((resolve, reject) => {
    delete Axios.defaults.headers.common["Authorization"];
    Axios.get(url, axiosConfig)
      .then(res => {
        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const apiGet2 = url => {
  return new Promise((resolve, reject) => {
    delete Axios.defaults.headers.common["Authorization"];
    Axios.get(url, axiosConfig)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const apiPost = (url, data) => {
  return new Promise((resolve, reject) => {
    delete Axios.defaults.headers.common["Authorization"];
    Axios.post(url, data, axiosConfig)
      .then(res => {
        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const setAxiosBearer = () => {
  const token = localStorage.getItem(GlobalEnv.system.tokenKey);
  Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const apiAuthGet = url => {
  return new Promise((resolve, reject) => {
    setAxiosBearer();
    Axios.get(url, axiosConfig)
      .then(res => {
        if (res.status === 401) {
          console.error(res);
          reject(GlobalEnv.axios.default401);
          return;
        }

        if (res.status === 400) {
          console.error(res);
          reject(GlobalEnv.axios.default400);
          return;
        }

        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const apiAuthPost = (url, data) => {
  return new Promise((resolve, reject) => {
    setAxiosBearer();
    Axios.post(url, data, axiosConfig)
      .then(res => {
        if (res.status === 401) {
          console.error(res);
          reject(GlobalEnv.axios.default401);
          return;
        }

        if (res.status === 400) {
          console.error(res);
          reject(GlobalEnv.axios.default400);
          return;
        }

        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const apiAuthPostFile = (url, data) => {
  return new Promise((resolve, reject) => {
    setAxiosBearer();
    Axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: false
    })
      .then(res => {
        if (res.status === 401) {
          console.error(res);
          reject(GlobalEnv.axios.default401);
          return;
        }

        if (res.status === 400) {
          console.error(res);
          reject(GlobalEnv.axios.default400);
          return;
        }

        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const apiAuthGet_withHash_listData = (
  url,
  where,
  order,
  page,
  pageSize,
  hashSecretKey
) => {
  return new Promise((resolve, reject) => {
    setAxiosBearer();

    if (where === null) where = "Status = true";
    if (order === null) order = "Id desc";
    if (page === null) page = 1;
    if (pageSize === null) pageSize = GlobalEnv.system.intMaxValue;

    let hash = sha1(where + order + page + pageSize + hashSecretKey);
    let query = `where=${where}&order=${order}&page=${page}&pageSize=${pageSize}&hash=${hash}`;

    Axios.get(url + "?" + query, axiosConfig)
      .then(res => {
        if (res.status === 401) {
          console.error(res);
          reject(GlobalEnv.axios.default401);
          return;
        }

        if (res.status === 400) {
          console.error(res);
          reject(GlobalEnv.axios.default400);
          return;
        }

        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const apiAuthGet_withHash_singleData = (url, where, hashSecretKey) => {
  return new Promise((resolve, reject) => {
    setAxiosBearer();

    if (where === null) where = "Status = true";

    let hash = sha1(where + "0" + "0" + hashSecretKey);
    let query = `where=${where}&order=&page=0&pageSize=0&hash=${hash}`;

    Axios.get(url + "?" + query, axiosConfig)
      .then(res => {
        if (res.status === 401) {
          console.error(res);
          reject(GlobalEnv.axios.default401);
          return;
        }

        if (res.status === 400) {
          console.error(res);
          reject(GlobalEnv.axios.default400);
          return;
        }

        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const apiAuthPost_withHash = (url, data, hasSecret) => {
  return new Promise((resolve, reject) => {
    setAxiosBearer();
    data = modelInjectHash(data, hasSecret);
    Axios.post(url, data, axiosConfig)
      .then(res => {
        if (res.status === 401) {
          console.error(res);
          reject(GlobalEnv.axios.default401);
          return;
        }

        if (res.status === 400) {
          console.error(res);
          reject(GlobalEnv.axios.default400);
          return;
        }

        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const apiAuthPostFile_withHash = (url, data, hasSecret) => {
  return new Promise((resolve, reject) => {
    setAxiosBearer();
    data = modelInjectHash(data, hasSecret);
    Axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: false
    })
      .then(res => {
        if (res.status === 401) {
          console.error(res);
          reject(GlobalEnv.axios.default401);
          return;
        }

        if (res.status === 400) {
          console.error(res);
          reject(GlobalEnv.axios.default400);
          return;
        }

        if (res.data.error.status) {
          console.error(res);
          reject(res.data.error.message);
          return;
        }

        resolve(res.data.result);
      })
      .catch(err => {
        console.error(err);
        reject(GlobalEnv.axios.defaultErrorCode);
      });
  });
};

const getImage = (root, path, errorImage) => {
  if (path === null) return root + errorImage;
  if (path === undefined) return root + errorImage;
  if (path.length === 0) return root + errorImage;
  return root + path;
};

const modelInjectHash = (model, secretKey) => {
  if (model.Hash) delete model.Hash;

  let compileHasString = "";
  Object.values(model).forEach(val => {
    if (!isNullOrEmpty(val)) compileHasString += val;
  });
  model.Hash = sha1(compileHasString + secretKey);

  return model;
};

const sleep = async ms => {
  await _sleep(ms);
};

const _sleep = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const isNullOrEmpty = obj => {
  if (obj === null) return true;

  if (obj === undefined) return true;

  if (obj === "") return true;

  return false;
};

const getStoreDefinition = (name, storeContext) => {
  let items = storeContext.getters.g_project_cache_stores;

  let find = _.findWhere(items, {
    key: name
  });

  return find;
};

const checkI18n = val => {
  return val.startsWith("i18n:") ? i18n.t(val.replace("i18n:", "")) : val;
};

const checkRole = role => {
  if (role === null || role === undefined || role === "") return true;
  if (isNullOrEmpty(store.getters.g_session_tokenUser.role)) return false;

  let currentUserRoles = store.getters.g_session_tokenUser.role;
  let roleSplit = role.split(".");
  let roleScope = "";
  let foundRole = false;

  if (!Array.isArray(currentUserRoles)) {
    currentUserRoles = [];
    currentUserRoles.push(store.getters.g_session_tokenUser.role);
  }

  roleSplit.forEach(r => {
    roleScope = roleScope === "" ? (roleScope = r) : (roleScope += "." + r);
    let check = currentUserRoles.filter(rr => {
      return rr === roleScope;
    });
    if (check.length > 0) foundRole = true;
  });

  return foundRole;
};

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const convertToJSONDate = dt => {
  let newDate = new Date(
    Date.UTC(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      dt.getHours(),
      dt.getMinutes(),
      dt.getSeconds(),
      dt.getMilliseconds()
    )
  );
  return "/Date(" + newDate.getTime() + ")/";
};

const showErrorWithApi = (err, title, errorNamespace) => {
  let msg = i18n.t(errorNamespace + err);

  if (err === GlobalEnv.axios.defaultErrorCode)
    msg = i18n.t("api.errors.TechnicalError");

  if (err === GlobalEnv.axios.default400) msg = i18n.t("api.errors.Status400");

  if (err === GlobalEnv.axios.default401) msg = i18n.t("api.errors.Status401");

  if (title === null) showErrorMsg(null, msg);
  else showErrorMsg(i18n.t(title), msg);
};

const giveErrorWithApi = (err, errorNamespace) => {
  let msg = i18n.t(errorNamespace + err);

  if (err === GlobalEnv.axios.defaultErrorCode)
    msg = i18n.t("api.errors.TechnicalError");

  if (err === GlobalEnv.axios.default400) msg = i18n.t("api.errors.Status400");

  if (err === GlobalEnv.axios.default401) msg = i18n.t("api.errors.Status401");

  return msg;
};

const findObjDeep = (items, attrs) => {
  let find = _.deepFind(items, attrs);
  return find;
};

const lowerFirstLetter = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toLowerCase() + s.slice(1);
};

export default {
  validateEmail,
  validatePass,
  showConfirmMsg,
  showSuccessMsg,
  showErrorMsg,
  showErrorMsgAndGoLogin,
  apiGet,
  apiGet2,
  apiPost,
  apiAuthGet,
  apiAuthPost,
  apiAuthPostFile,
  apiAuthGet_withHash_listData,
  apiAuthGet_withHash_singleData,
  apiAuthPost_withHash,
  apiAuthPostFile_withHash,
  getImage,
  modelInjectHash,
  sleep,
  getStoreDefinition,
  checkI18n,
  checkRole,
  formatBytes,
  isNullOrEmpty,
  convertToJSONDate,
  showErrorWithApi,
  giveErrorWithApi,
  findObjDeep,
  lowerFirstLetter
};
