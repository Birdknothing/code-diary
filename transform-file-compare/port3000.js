const express = require("express");
const superagent = require("superagent");
const { promisify } = require("util");
const fs = require("fs");
const writeFile = promisify(fs.writeFile);
const app = express();
app.listen(3000);
app.use(express.static("./"));
app.get("/getstr", (req, resp) => {
    if (!req.query.url) {
        resp.send("no url");
        return;
    }
    const url = req.query.url;
    superagent.get(url).end(async (err, res) => {
        if (!res.text) {
            console.log("no text");
        }
        if (res.body) {
            resp.send(res.body.toString());
        }
        // await writeFile("./test.text", res.body.toString());
    });
});
app.use("/my-min-library", express.static("../my-min-library"));
// http://192.168.211.46:3000
