module.exports = function(React, appUsed){
    
   var FormTitle = React.createClass({
       getInitialState: function(){
            return {
                value : appUsed.form.title
            };
        },
        changeValue: function(e){
            appUsed.form.title = e.target.value;
            this.setState({value : e.target.value});
            //ブレビューの更新
            require("./account-preview")(React,appUsed);
        },
        render: function() {
            return (
                <div className="form-group">
                <label for="name">Title</label>
                    <input id="title" type="text" className="form-control" 
                    value={this.state.value} onChange={this.changeValue}/>
                </div>
            );
        }
    });
    if(document.getElementById("accountFormTitle")){
        React.render(<FormTitle />, document.getElementById("accountFormTitle"));
    }
}
