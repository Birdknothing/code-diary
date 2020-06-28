const fs = require("fs");
const path = require("path");
const cd = (...args) => path.resolve(__dirname, ...args);
const fpath = cd("./3.lua");
const read = (url = fpath) => fs.readFileSync(url).toString();

const write = (str, url = fpath) => { fs.writeFileSync(url, str); return str; }

const ifEnable = process.argv[2];
// --------------------------------------------
const files = ["./3.lua"];
// --------------------------------------------

String.prototype.map = function (f) {
    return f(this.toString());
};

// 替换 require
const unableRequire = str => str.replace(new RegExp(`(?<!-- *)(?=require[(]"Logic/MyUtil/util"[)])`), "-- ");
const enableRequire = str => str.replace(new RegExp(`-- *(?=require[(]"Logic\/MyUtil\/util"[)])`), "");


// 注释 console.log
const unableMylog = str => str.replace(new RegExp(`(?<!-- *)(?=mylog.*)`, "g"), "-- ");

const enableMylog = str => str.replace(new RegExp(`-- *(?=mylog)`, "g"), "");

const unable = () => read().map(unableRequire).map(unableMylog).map(write);
const enable = () => read().map(enableRequire).map(enableMylog).map(write);

// unable();
enable();

