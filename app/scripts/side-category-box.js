module.exports = function(React, appUsed){
    var SideCategoryBox = React.createClass({
        getInitialState: function() {
            return {
                api : []
            };
        },
        componentDidMount: function() {
            $.ajax({
                url: appUsed.url+"/api/categories",
                dataType: 'json',
                cache: false,
                success: function(json) {
                    this.setState({api: json});
                    appUsed.result=json.result;
                    appUsed.message=json.message;
                    if(json.message){
                        require("./messege-box")(React,appUsed);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        goCategoryArticles: function(e){
            appUsed.selectCategoryName =  e.currentTarget.getAttribute("value");
            require("./categorys-box")(React,appUsed);
        },
        render: function() {
            var markdownText = marked(this.state.api.text ? this.state.api.text : "");
            var categoryComponent = [];
            var categoryNames = [];
            var categoryNamesCnt=[];

            var items = this.state.api.categoryNames ? this.state.api.categoryNames:[];
            if(items){
                items.sort(); 
                for(var i=0, size= items.length; i<size; i++){
                    var category = items[i];
                    if(categoryNames.indexOf(category) < 0){
                        categoryNames.push(category);
                        categoryNamesCnt[category] = 1;
                    }else{
                        categoryNamesCnt[category] ++;
                    }
                };
                for(var i=0, size=categoryNames.length; i<size; i++){
                    var category = categoryNames[i];
                    categoryComponent.push(<li><a onClick={this.goCategoryArticles} value={category}>
                                           {category}({categoryNamesCnt[category]})</a>
                                           </li>);
                };

            }
            return (
                <aside>
                <h4>カテゴリ</h4>
                <ul class="list-unstyled">
                {categoryComponent}
                </ul>
                </aside>
            );
        }
    });

    if(document.getElementById("categoryMenu")){
        React.render(<SideCategoryBox />, document.getElementById("categoryMenu"));
    }
}
