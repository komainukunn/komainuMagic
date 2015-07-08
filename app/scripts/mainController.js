module.exports = function(React, appUsed){
    var MainController = React.createClass({
        render: function() {
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
        }
    });

    if(document.getElementById("component")){
        React.render(<MainController />, document.getElementById("component"));
        require("./new-article-box")(React,appUsed);
        require("./side-category-box")(React,appUsed);
        require("./side-date-box")(React,appUsed);
        require("./messege-box")(React,appUsed);
    }
}
