
var React = require("react");


//共通で使う変数や関数を管理するjson
var appUsed = {
    url :  "https://komainukunn.herokuapp.com",
    url :  "http://localhost:5000",
   
    //日付けを変換してくれる
    setDateFormat : function(date){
        if(!date){
            return "";
        }
        var week = [ "日" , "月" , "火" , "水" , "木" , "金" , "土"] ;
        
        var year = new Date(date).getFullYear();
        var month = new Date(date).getMonth()+1;
        var day = new Date(date).getDate();
        var weekNum = new Date(date).getDay();
        
        date = year+"年 "+month+"月 " +day+"日("+week[weekNum]+")";
        return date;
    },
    form : {
        id: "",
        title : "",
        text : "",
        categories : [],
        date : ""
    },
    //日付け順にjsonのindexをソートする関数
    sortDateIndexNum : function(json){
        var datesSize = json.dates.length;
        var indexs = [], indexCnt;
        var a, b;
        console.log(json);
        for(var i=0;i<datesSize;i++){
            indexCnt = 0;
            a = new Date(json.dates[i]);
            for(var j=0;j<datesSize;j++){
                b = new Date(json.dates[j]);
                if(a.getTime() < b.getTime()) {
                    indexCnt++;
                }else{
                }
            }
            indexs[indexCnt] = i;
        }
        return indexs;
    }
}

require("./mainController.js")(React,appUsed);
require("./account")(React);

