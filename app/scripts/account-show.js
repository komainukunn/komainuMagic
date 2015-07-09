module.exports = function(React, appUsed){
    var AccountShow = React.createClass({

        componentDidMount: function() {
            $.ajax({
                url: appUsed.url+"/account/api/show?id="+appUsed.selectArticle,
                dataType: 'json',
                cache: false,
                success: function(json) {
                    appUsed.form.title = json.title;
                    appUsed.form.text = json.text;
                    appUsed.form.categories = json.categories;

                    appUsed.result=json.result;
                    appUsed.message=json.message ? json.message : "";

                    if(appUsed.message){
                        require("./messege-box")(React,appUsed);
                        return;
                    }
                    require("./account-form-title")(React,appUsed);
                    require("./account-form-category")(React,appUsed);
                    require("./account-form-text")(React,appUsed);
                    require("./account-preview")(React,appUsed);

                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        //削除
        deleteArticle: function(){
            $.ajax({
                url: appUsed.url+"/account/api/delete?id="+appUsed.selectArticle,
                dataType: 'json',
                cache: false,
                success: function(json) {
                    appUsed.result=json.result;
                    appUsed.message=json.message ? json.message : "";

                    if(appUsed.message){
                        require("./messege-box")(React,appUsed);
                    }
                    require("./account-index")(React,appUsed);

                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        //編集
        editArticle :function(){
            console.log({
                    id:appUsed.selectArticle,
                    title:appUsed.form.title,
                    text:appUsed.form.text,
                    categories:appUsed.form.categories
                });
            $.ajax({
                type:"POST",
                url: appUsed.url+"/account/api/update",
                dataType: 'json',
                cache: false,
                data:{
                    id:appUsed.selectArticle,
                    title:appUsed.form.title,
                    text:appUsed.form.text,
                    categories:appUsed.form.categories
                },
                success: function(json) {
                    appUsed.result=json.result;
                    appUsed.message=json.message;

                    require("./messege-box")(React,appUsed);
                    if(json.result=="success"){
                        require("./account-index")(React,appUsed);
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },

        render: function() {
            return (
                <div>
                    <div className="form-group">
                        <form action="" method="Post">
                        <div id="accountFormTitle"></div>
                        <div id="accountFormCategory"></div>
                        <div id="accountFormText"></div>
                        </form>
                        <div id="accountPreview"></div>
                        <button className="btn btn-danger" type="button" 
                        onClick={this.deleteArticle}>Delete</button>
                        <button className="btn btn-default" type="button" 
                        onClick={this.editArticle}>Edit</button>
                    </div>
                </div>
            );
        }
    });

    if(document.getElementById("brogContext")){
        React.render(<AccountShow />, document.getElementById("brogContext"));

    }
}
