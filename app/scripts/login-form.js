module.exports = function(React, appUsed){
    var LoginForm = React.createClass({
        render: function() {
            return (
            <div className="text-center alert-info">
                <h2>ログイン</h2>
                <form role="form" action="/loginJug" method="GET">
                <div className="form-group">
                    <label>AccountID : </label>
                    <input type="text" name="id" placeholder="AccountID"/>
                </div>
                <div className="form-group">
                    <label>PassWord : </label>
                    <input type="password" name="password" placeholder="PassWord"/>
                </div>
                <button className="btn btn-default" type="submit">ログイン</button>
                </form>  
            </div>
            );
        }
    });
    if(document.getElementById("brogContext")){
        React.render(<LoginForm />, document.getElementById("brogContext"));
    }
}
