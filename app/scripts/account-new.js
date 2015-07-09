module.exports = function(React, appUsed){
   var AccountNew = React.createClass({
       createArticle: function(){
            $.ajax({
                type:"POST",
                url: appUsed.url+"/account/api/create",
                dataType: 'json',
                cache: false,
                data:{
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
                    <div className="form-group">
                        <form action="" method="Post">
                        <div id="accountFormTitle"></div>
                        <div id="accountFormCategory"></div>
                        <div id="accountFormText"></div>
                        </form>
                        <div id="accountPreview"></div>
                        <button className="btn btn-default" 
                            type="button" onClick={this.createArticle}>send</button>
                    </div>
                   );
        }
    });

    if(document.getElementById("brogContext")){
        appUsed.form.title ="";
        appUsed.form.text ="";
        appUsed.form.categories =[];
        React.render(<AccountNew />, document.getElementById("brogContext"));
        require("./account-form-title")(React,appUsed);
        require("./account-form-category")(React,appUsed);
        require("./account-form-text")(React,appUsed);
        require("./account-preview")(React,appUsed);
    }
}
