const express = require('express');
const app = express();
app.listen(3002);
app.get('*', (req, res) => {
  console.log(Object.keys(req));
});
app.use(express.static('public2'));
