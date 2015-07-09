module.exports = function(React, appUsed){
    var AccountIndex = React.createClass({
        getInitialState: function() {
            return {api: []};
        },
        componentDidMount: function() {
            $.ajax({
                url: appUsed.url+"/account/api/",
                dataType: 'json',
                cache: false,
                success: function(json) {
                    this.setState({api: json});
                    appUsed.result=json.result;
                    appUsed.message=json.message ? json.message : "";
                    if(appUsed.message){
                        require("./messege-box")(React,appUsed);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        showAction: function(e){
            appUsed.selectArticle = e.currentTarget.getAttribute("value");
            require("./account-show")(React,appUsed);
        },
        render: function() {
            var articleComponent = [];
            if(this.state.api._ids){
                for(var i=0;i<this.state.api._ids.length;i++){
                    articleComponent.push(
                        <tr onClick = {this.showAction}  value={this.state.api._ids[i]} >
                        <td >{this.state.api.titles[i]}</td>
                        <td >{appUsed.setDateFormat(this.state.api.dates[i])}</td>
                        </tr>
                    );
                }
            }
            //テーブルのレイアウト
            return (
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                    <thead>
                        <tr><th>Tite</th> <th>Date</th></tr>
                    </thead>
                    <tbody>
                        {articleComponent}
                    </tbody>
                </table>
                </div>
            );
        }
    });

    if(document.getElementById("brogContext")){
        React.render(<AccountIndex />, document.getElementById("brogContext"));
    }
}
