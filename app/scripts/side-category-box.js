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
                success: function(data) {
                    this.setState({api: data});
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
            var categoryNames = [];
            var categoryNamesCnt=[];
            if(this.state.api.categoryNames){
                for(var i=0, size= this.state.api.categoryNames.length; i<size; i++){
                    var category = this.state.api.categoryNames[i];
                    if(categoryNames.indexOf(category) < 0){
                        categoryNames.push(category);
                        categoryNamesCnt[category] = 1;
                    }else{
                        categoryNamesCnt[category] ++;
                    }
                };
                for(var i=0, size=categoryNames.length; i<size; i++){
                    var category = categoryNames[i];
                    categoryComponent.push(<li><a onClick={this.goCategoryArticles}>
                                           {category}({categoryNamesCnt[category]})</a>
                                           </li>);
                };

            }
            return (
                <aside>
                <h4>カテゴリへのリンク</h4>
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
