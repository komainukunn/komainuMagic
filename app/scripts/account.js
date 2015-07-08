module.exports = function(React){
    var siteUrl = "https://komainukunn.herokuapp.com/"
    siteUrl = "http://localhost:5000/"

    var accountApiUrl = siteUrl + "account/api/";
    var accountCategoryApiUrl = siteUrl + "account/category/api/";

    var accountIndex = React.createClass({
        getInitialState: function() {
            return {data: []};
        },
        componentDidMount: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        showAction: function(e){
            var showUrl = accountApiUrl+"show?id="+e.currentTarget.getAttribute("value");
            React.render(
                React.createFactory(accountShow)({url:showUrl}), document.getElementById("accountContext")
            );
        },
        render: function() {
            var articleComponent = [];
            if(this.state.data._ids){
                for(var i=0;i<this.state.data._ids.length;i++){
                    articleComponent.push(
                        <tr onClick = {this.showAction}  value={this.state.data._ids[i]} >
                        <td value={i}>{this.state.data.titles[i]}</td>
                        <td >{this.state.data.dates[i]}</td>
                        </tr>
                    );
                }
            }
            return (
                <div className="table-responsive">
                <table className="table table-hover table-striped">
                <thead>
                <tr>
                <th>Tite</th>
                <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {articleComponent}
                </tbody>
                </table>
                </div>
            );
        }
    });

    if(document.getElementById("accountContext")){
        React.render(
            React.createFactory(accountIndex)({url: accountApiUrl}), document.getElementById("accountContext")
        );
    }


    //記事閲覧
    var accountShow = React.createClass({
        getInitialState: function() {
            return {data: [],
                title:"",
                text:"",
                categories:[],
                setCategories:[]
            };
        },
        deleteArticle: function(){
            console.log(this.state.data._id);
            $.ajax({
                url: accountApiUrl+"delete?id="+this.state.data._id,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        changeTitle: function(e){
            this.setState({title : e.target.value});
        },
        changeText: function(e){
            this.setState({text : e.target.value});
        },
        choiceCategory: function(e){
            var catName = e.target.value;
            var setCats = this.state.setCategories ? this.state.setCategories : [];
            for(var i=0;i<setCats.length;i++){
                console.log(setCats[i] + " = " + catName);
                if(setCats[i] == catName){
                    setCats.splice(i,1);
                    this.setState({setCategories: setCats});
                    return ;
                }
            }
            setCats.push(catName);
            this.setState({setCategories: setCats});
        },
        addCategory: function(){
            $.ajax({
                url: accountCategoryApiUrl+"create?categoryName="+this.refs.categoryText.getDOMNode().value,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({categories:data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        deleteCategory: function(e){
            $.ajax({
                url: accountCategoryApiUrl+"delete?categoryName="+e.currentTarget.getAttribute("value"),
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({categories:data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        editArticle :function(){
            $.ajax({
                type:"POST",
                url: accountApiUrl+"update",
                dataType: 'json',
                cache: false,
                data:{
                    id:this.state.data._id,
                    title:this.state.title,
                    text:this.state.text,
                    categories:this.state.setCategories
                },
                success: function(data) {
                    this.setState({categories:data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        componentDidMount: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({
                        data:data,
                        title:data.title,
                        text:data.text,
                        setCategories:data.categories});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
            $.ajax({
                url: accountCategoryApiUrl,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({categories:data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        render: function() {
            var markdownText = marked(this.state.text ? this.state.text : "");
            if(this.state.data.categories){
                var categoryComponent = this.state.data.categories.map(function(category){
                    return <a>#{category}</a>;
                });
            }
            var categoryComponentEdit = [];
            if(this.state.categories.categoryNames){
                for(var i=0;i<this.state.categories.categoryNames.length;i++){
                    var inputTag = "";
                    var setCategoriseTemp = this.state.setCategorie ? this.state.setCategorie : [];
                    if(setCategoriseTemp.indexOf(this.state.categories.categoryNames[i]) >=0 ){
                        console.log("ture");
                        inputTag = <input type="checkbox" value={this.state.categories.categoryNames[i]} onClick={this.choiceCategory} checked/>
                    }else{
                        console.log("false");
                        inputTag = <input type="checkbox" value={this.state.categories.categoryNames[i]} onClick={this.choiceCategory} />
                    }
                    categoryComponentEdit.push(
                        <div>
                        <label  className="checkbox-inline" value={this.state.categories.categoryNames[i]}>
                        {inputTag}{this.state.categories.categoryNames[i]}
                        </label>
                        <button className="checkbox-inline btn btn-danger btn-circle btn-xs" type="button" onClick={this.deleteCategory} value={this.state.categories.categoryNames[i]}>x</button>
                        </div>
                    );
                }
            }
            return (
                <div>
                <div className="form-group">
                <form action="" method="Post">
                <label for="name">Title</label>
                    <input id="title" type="text" className="form-control" value={this.state.title} onChange={this.changeTitle}/>

                <label for="name">Category</label>
                    <div className="form-inline"><input type="text" ref="categoryText" className="form-control" />
                <button className="btn btn-default" type="button" onClick={this.addCategory}>add</button></div>
                {categoryComponentEdit}
                <br/>

                <label for="name">Article</label>
                    <textarea id="text" type="text" className="form-control col-md-9" rows="20" value={this.state.text} onChange={this.changeText}/>
                </form>
                </div>
                <div className="commentBox">
                <h2>{this.state.title}</h2>
                <p>{categoryComponent}</p>
                <div dangerouslySetInnerHTML={{__html: markdownText}}></div>
                <button className="btn btn-danger" type="button" onClick={this.deleteArticle}>Delete</button>
                <button className="btn btn-default" type="button" onClick={this.editArticle}>Edit</button>
                </div>
                </div>
            );
        }
    });


    //記事の新規作成
    var accountNew = React.createClass({
        getInitialState: function(){
            return {
                title:"",
                text:"",
                categories:[],
                setCategories:[]
            };
        },
        changeTitle: function(e){
            this.setState({title : e.target.value});
        },
        changeText: function(e){
            this.setState({text : e.target.value});
        },
        choiceCategory: function(e){
            var catName = e.target.value;
            var setCats = this.state.setCategories;
            for(var i=0;i<setCats.length;i++){
                console.log(setCats[i] + " = " + catName);
                if(setCats[i] == catName){
                    setCats.splice(i,1);
                    this.setState({setCategories: setCats});
                    return ;
                }
            }
            setCats.push(catName);
            this.setState({setCategories: setCats});
        },
        addCategory: function(){
            $.ajax({
                url: this.props.url+"create?categoryName="+this.refs.categoryText.getDOMNode().value,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({categories:data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        deleteCategory: function(e){
            $.ajax({
                url: this.props.url+"delete?categoryName="+e.currentTarget.getAttribute("value"),
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({categories:data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        createArticle: function(){
            $.ajax({
                type:"POST",
                url: accountApiUrl+"create",
                dataType: 'json',
                cache: false,
                data:this.state,
                success: function(data) {
                    this.setState({categories:data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        componentDidMount: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({categories:data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        render: function() {
            var markdownText = marked(this.state.text ? this.state.text : "");
            var categoryComponent = [];
            if(this.state.categories.categoryNames){
                for(var i=0;i<this.state.categories.categoryNames.length;i++){

                    categoryComponent.push(
                        <div>
                        <label  className="checkbox-inline" value={this.state.categories.categoryNames[i]}>

                        <input type="checkbox"value={this.state.categories.categoryNames[i]} onClick={this.choiceCategory} />{this.state.categories.categoryNames[i]}
                        </label>
                        <button className="checkbox-inline btn btn-danger btn-circle btn-xs" type="button" onClick={this.deleteCategory} value={this.state.categories.categoryNames[i]}>x</button>
                        </div>
                    );
                }
            }
            return (
                <div>
                <div className="form-group">
                <form action="" method="Post">
                <label for="name">Title</label>
                    <input id="title" type="text" className="form-control" value={this.state.title} onChange={this.changeTitle}/>

                <label for="name">Category</label>
                    <div className="form-inline"><input type="text" ref="categoryText" className="form-control" />
                <button className="btn btn-default" type="button" onClick={this.addCategory}>add</button></div>
                {categoryComponent}
                <br/>

                <label for="name">Article</label>
                    <textarea id="text" type="text" className="form-control col-md-9" rows="20" value={this.state.text} onChange={this.changeText}/>
                </form>
                </div>
                <div className="commentBox">
                <h2>{this.state.title}</h2>
                <div dangerouslySetInnerHTML={{__html: markdownText}}></div>
                </div>
                <button className="btn btn-default" type="button" onClick={this.createArticle}>send</button>
                </div>
            );
        }
    });



    //サイドメニュー
    var accountSideMenu = React.createClass({
        indexAction: function(){ 
            React.render(
                React.createFactory(accountIndex)({url: accountApiUrl}), document.getElementById("accountContext")
            );
        },
        newAction: function(){
            React.render(
                React.createFactory(accountNew)({url: accountCategoryApiUrl}), document.getElementById("accountContext")
            );
        },
        render: function() {
            return (
                <aside>
                <h4>メニュー</h4>
                <ul class="list-unstyled">
                <li><a onClick={this.indexAction} >記事一覧</a></li>
                <li><a onClick={this.newAction} >記事新規作成</a></li>
                </ul>
                </aside>
            );
        }
    });

    if(document.getElementById("accountSidebar")){
        React.render(
            React.createFactory(accountSideMenu)({url: accountApiUrl}), document.getElementById("accountSidebar")
        );
    }
}
