module.exports = function(React, appUsed){
    var MainController = React.createClass({
        render: function() {
            var sideBar = "";
            switch(appUsed.appState) {
                case 0:
                    return (
                        <div class="row">
                            <div id="errorMesage"></div>
                            <div id="brogContext" className="col-md-9 content-area"></div>
                            <div id="sideMenu" className="col-md-3 sidebar">
                                <div id="categoryMenu"></div>
                                <div id="dateMenu"></div>     
                            </div>
                        </div>
                    );
                    break;

                case 1:
                    return (
                        <div class="row">
                            <div id="errorMesage"></div>
                            <div id="brogContext" className="col-md-12 content-area"></div>
                        </div>
                    );
                    break;

                case 2:
                    return (
                        <div class="row">
                            <div id="errorMesage"></div>
                            <div id="brogContext" className="col-md-9 content-area"></div>
                            <div id="sideMenu" className="col-md-3 sidebar">
                                <div id="accountMenu"></div>
                            </div>
                        </div>
                    );
                    break;
            }
        }
    });

    if(document.getElementById("component")){
        appUsed.appState = 0;
        React.render(<MainController />, document.getElementById("component"));
        require("./new-article-box")(React,appUsed);
        require("./side-category-box")(React,appUsed);
        require("./side-date-box")(React,appUsed);
        require("./messege-box")(React,appUsed);
    }
    if(document.getElementById("componentLogin")){
        appUsed.appState = 1;
        React.render(<MainController />, document.getElementById("componentLogin"));
        require("./login-form")(React,appUsed);
        require("./messege-box")(React,appUsed);
    }
    if(document.getElementById("componentAccount")){
        appUsed.appState = 2;
        React.render(<MainController />, document.getElementById("componentAccount"));
        require("./account-index")(React,appUsed);
        require("./account-side-menu")(React,appUsed);
        require("./messege-box")(React,appUsed);
    }
}
