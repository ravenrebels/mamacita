const axios = require("axios");
const { createSecretKey } = require("crypto");
const fs = require("fs");
const secrets = require("./secrets.json");

async function rpc(method, params) {
  const promise = new Promise((resolutionFunc, rejectionFunc) => {
    const options = {
      auth: {
        username: secrets.username,
        password: secrets.password,
      },
    };
    const data = {
      jsonrpc: "1.0",
      id: "",
      method,
      params,
    };

    try {
      const rpcResponse = axios.post("http://127.0.0.1:8766", data, options);

      rpcResponse.then((re) => {
        const result = re.data.result;
        resolutionFunc(result);
      });
      rpcResponse.catch((e) => {
        rejectionFunc(e);
      });
    } catch (e) {
      rejectionFunc(e);
    }
  });
  return promise;
}

module.exports = rpc;
