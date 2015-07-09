module.exports = function(React, appUsed){
    var AccountMenu = React.createClass({
        indexAction: function(){
            require("./account-index")(React,appUsed);
        },
        newAction: function(){
            require("./account-new")(React,appUsed);
        },
        render: function() {
            return (
                <aside>
                <h4>記事の編集メニュー</h4>
                <ul class="list-unstyled">
                    <li>
                    <a onClick={this.indexAction}>記事一覧</a>
                    </li>
                    <li>
                    <a onClick={this.newAction}>記事の新規作成</a>
                    </li>
                </ul>
                </aside>
            );
        }
    });

    if(document.getElementById("accountMenu")){
        React.render(<AccountMenu />, document.getElementById("accountMenu"));
    }
}
