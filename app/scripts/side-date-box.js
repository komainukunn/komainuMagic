module.exports = function(React, appUsed){
    var SideCategoryBox = React.createClass({
        getInitialState: function() {
            return {
                api : []
            };
        },
        componentDidMount: function() {
            $.ajax({
                url: appUsed.url+"/api/dates",
                dataType: 'json',
                cache: false,
                success: function(json) {
                    this.setState({api: json});
                    appUsed.result=json.result;
                    appUsed.message=json.message;
                    if(json.massage){
                        require("./messege-box")(React,appUsed);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        goDateArticles: function(e){
            appUsed.selectDate = e.currentTarget.getAttribute("value");
            require("./dates-box")(React,appUsed);
        },
        render: function() {
            var markdownText = marked(this.state.api.text ? this.state.api.text : "");
            var dateComponent = [];
            var dates = [];
            var datesCnt = [];
            if(this.state.api.dates){
                for(var i=0, size= this.state.api.dates.length; i<size; i++){
                    var date = this.state.api.dates[i].match(/^[0-9][0-9][0-9][0-9]-[0-9][0-9]/)[0];
                    if(dates.indexOf(date) < 0){
                        dates.push(date);
                        datesCnt[date] = 1;
                    }else{
                        datesCnt[date] ++;
                    }
                };
                for(var i=0, size=dates.length; i<size; i++){
                    var date = dates[i];
                    var year = new Date(date).getFullYear();
                    var month = new Date(date).getMonth()+1;
                    
                    dateComponent.push(<li><a onClick={this.goDateArticles} value={date}>
                                           {year+"年 "+month+"月"}({datesCnt[date]})</a>
                                       </li>);
                };

            }
            return (
                <aside>
                <h4>カレンダー</h4>
                <ul class="list-unstyled">
                {dateComponent}
                </ul>
                </aside>
            );
        }
    });

    if(document.getElementById("dateMenu")){
        React.render(<SideCategoryBox />, document.getElementById("dateMenu"));
    }
}
