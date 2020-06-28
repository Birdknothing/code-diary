const express = require("express");
const path = require("path");
const cd = (...args) => path.resolve(__dirname,...args);
const app = express();
app.listen(3008);
app.use(express.static(cd("./")));
// http://localhost:3008/1.html