var React = require("react");

var accountApiUrl = "https://komainukunn.herokuapp.com/account/api/";
accountApiUrl = "http://localhost:5000/account/api/";

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
  render: function() {
    if(this.state.data._ids){
        var dataComponent =[];
        for(var i=0;i<this.state.data._ids.length;i++){
            dataComponent.push(
            <div><a href={"/account/api/show?id="+this.state.data._ids[i]} >{this.state.data.titles[i]}     {this.state.data.dates[i]}</a></div>
            );
        }
        console.log(dataComponent);
    }
    return (
      <div className="accountIndexBox">
        {dataComponent}
      </div>
    );
  }
});

if(document.getElementById("accountContext")){
    React.render(
        React.createFactory(accountIndex)({url: accountApiUrl}), 
        document.getElementById("accountContext")
    );
}
