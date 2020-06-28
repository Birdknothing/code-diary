const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const cors = require("cors");
const proxyConfig = {
  "/proxy3dcp": {
    target: "http://3dcp.101.com/",
    changeOrigin: true,
    pathRewrite: { "^/proxy3dcp": "" },
  },
  "/proxyesp": {
    target: "http://esp-lifecycle.sdp.101.com/",
    changeOrigin: true,
    pathRewrite: { "^/proxyesp": "" },
  },
  "/proxytask": {
    target: "http://api-schedule.aiteacher-dev.101.com/",
    changeOrigin: true,
    pathRewrite: { "^/proxytask": "" },
  },
};
// 初始化proxy
const initProxy = ()=>{
    for(let route in proxyConfig){
        app.use(route,createProxyMiddleware(proxyConfig[route]));
    }
};
// app.use("/test",createProxyMiddleware({target:""}))
// app.use("/api",createProxyMiddleware( {
//   target: "http://192.168.244.87:3003/",
//   // target: "http://localhost:3003/",
//   changeOrigin: true,
//   pathRewrite: { "^/api": "" },
// }));
// app.use(cors());
// app.use("/test",(req,res) => {
//   res.send("test");
// })
// initProxy();
// const cors = require("cors");
// app.use(cors());
const path = require("path");
const cd = (...args) => path.resolve(__dirname, ...args);
app.listen(3000);
app.use(express.static(cd("./")));
// app.use(express.static(String.raw`D:\ai-teahcer-player\webframe\pcframe\dist\AI`));
// http://localhost:3000/1.jpg
// http://localhost:3000
