module.exports = function(React, appUsed){
    var MessageBox = React.createClass({
        render: function() {
            appUsed.message = appUsed.message ? appUsed.message : "";
            if(appUsed.result =="error"){
                return <div className="alert alert-danger text-center" role="alert">
                            {appUsed.message}
                    </div>
            }else if(appUsed.result =="success" && appUsed.message != ""){
                return <div className="alert alert-success text-center" role="alert">
                            {appUsed.message}
                    </div>
            }else{
                return <div/>
            }
        }
    });

    if(document.getElementById("errorMesage")){
        React.render(<MessageBox />, document.getElementById("errorMesage"));
    }
}
