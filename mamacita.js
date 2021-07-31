const rpc = require("./rpc");
const fs = require("fs");

async function main() {
  const data = {};

  data.balance = await rpc("getbalance", []);
  data.assets = await rpc("listmyassets", []);

  const json = JSON.stringify(data, null, 4);


  fs.writeFileSync("./data.json", json);
}

main();
