const express = require("express");
const app = express();
const path = require("path");
const cd = (...args) => path.resolve(__dirname,...args);
app.listen(3004);



app.use(express.static(cd("./")));