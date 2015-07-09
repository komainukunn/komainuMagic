module.exports = function(React, appUsed){
    
   var FormCategory = React.createClass({
        addCategory: function(e){
            $.ajax({
                url: appUsed.url+"/account/category/api/create?categoryName="+this.refs.categoryText.getDOMNode().value,
                dataType: 'json',
                cache: false,
                success: function(json) {
                    appUsed.result=json.result;
                    appUsed.message=json.message ? json.message : "";
                    require("./messege-box")(React,appUsed);
                    if(appUsed.message==""){
                        require("./account-category-checkBox")(React,appUsed);
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
                    <label for="name">Category</label>
                    <div className="form-inline">
                        <input type="text" ref="categoryText" className="form-control" />
                        <button className="btn btn-default" type="button" 
                        onClick={this.addCategory}>add</button>
                    </div>
                    <div id="categiryCheckBox"></div>
                </div>
            );
        }
    });
    if(document.getElementById("accountFormCategory")){
        React.render(<FormCategory />, document.getElementById("accountFormCategory"));
        require("./account-category-checkBox")(React,appUsed);
    }
}
