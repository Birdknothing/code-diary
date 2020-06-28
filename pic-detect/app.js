const Tesseract  = require("tesseract.js");
// const Tesseract = require('node-tesseract');

Tesseract.recognize(
    './1-1.png',
    'eng',
    { logger: m => console.log(m) }
).then(({ data: { text } }) => {
    console.log(text);
});

// Tesseract.process('./1.png', function (err, text) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(text);
//   }
// });

// ---------------------------

// var tesseract = require("tesseract")
//   , tess = new tesseract.BaseApi()
//   , pix;

// // set language
// tess.init("eng");
// // set image
// tess.setImage("test1.png");
// // run recognition
// tess.recognize();
// // get recognized text
// console.log(tess.getText());

// // clear results
// tess.clear();