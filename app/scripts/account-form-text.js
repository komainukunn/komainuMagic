module.exports = function(React, appUsed){
   var FormText = React.createClass({
       getInitialState: function(){
            return {
                value : appUsed.form.text
            };
        },
        changeValue: function(e){
            appUsed.form.text = e.target.value;
            this.setState({value : e.target.value});

            //ブレビューの更新
            require("./account-preview")(React,appUsed);
        },
        render: function() {
            return (
                <div className="form-group">
                    <label for="name">Article</label>
                    <textarea id="text" type="text" 
                    className="form-control col-md-9" rows="20" 
                    value={this.state.value} onChange={this.changeValue}/>
                </div>
            );
        }
    });

    if(document.getElementById("accountFormText")){
        React.render(<FormText />, document.getElementById("accountFormText"));
    }
}
