module.exports = function(React, appUsed){
    var MessageBox = React.createClass({
        render: function() {
            if(appUsed.result !="error"){
                return <div/>;
            }
            return (
                <div className="alert alert-danger text-center" role="alert">
                {appUsed.message}
                </div>
            );
        }
    });

    if(document.getElementById("errorMesage")){
        React.render(<MessageBox />, document.getElementById("errorMesage"));
    }
}
