module.exports = function(React, appUsed){
    var NewArticleBox = React.createClass({
        getInitialState: function() {
            return {
                api : []
            };
        },
        componentDidMount: function() {
            $.ajax({
                url: appUsed.url+"/api/new-article",
                dataType: 'json',
                cache: false,
                success: function(json) {
                    this.setState({api: json});
                    appUsed.result=json.result;
                    appUsed.message=json.message;
                    require("./messege-box")(React,appUsed);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        goCategoryArticles: function(e){
            appUsed.selectCategoryName = e.target.innerHTML;
            require("./categorys-box")(React,appUsed);
        },
        render: function() {
            var markdownText = marked(this.state.api.text ? this.state.api.text : "");
            var categoryComponent = [];
            if(this.state.api.categories){
                for(var i=0, size= this.state.api.categories.length; i<size; i++){
                    var category = this.state.api.categories[i];
                    categoryComponent.push(<a className="categoryList" onClick={this.goCategoryArticles}>{category}</a>);
                }; 
            }
            if(this.state.api.result!="success"){
                return <div></div>
            }
            return (
                <div>
                <h2>{this.state.api.title}</h2>
                <p>日付け : {appUsed.setDateFormat(this.state.api.date)}</p>
                <p>{categoryComponent}</p>
                <div dangerouslySetInnerHTML={{__html: markdownText}}></div>
                <br/>
                <p>link : {appUsed.url + "/?id=" + this.state.api._id}</p>
                </div>
            );
        }
    });

    if(document.getElementById("brogContext")){
        React.render(<NewArticleBox />, document.getElementById("brogContext"));
    }
}
