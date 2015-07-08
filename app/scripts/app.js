
var React = require("react");

//共通で使う変数や関数を管理するjson
var appUsed = {
    //url :  "https://komainukunn.herokuapp.com",
    url :  "http://localhost:5000"
}

require("./new-article-box")(React,appUsed);
require("./side-category-box")(React,appUsed);
require("./side-date-box")(React,appUsed);
require("./account")(React);

