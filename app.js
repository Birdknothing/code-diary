const express = require("express");
const path = require("path");
const app = express();
app.listen(3001);
app.use(express.static(path.resolve("./")));
// http://ip:3001/AIStudyPartners.js

