var React = require("react");
var apiUrl = "https://komainukunn.herokuapp.com/api/new-article";
apiUrl = "http://localhost:5000/api/new-article";

var accountRequire = require("./account");

var brogArticle = React.createClass({
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
    var markdownText = marked(this.state.data.text ? this.state.data.text : "");
    if(this.state.data.categories){
        var categoryComponent = this.state.data.categories.map(function(category){
            return <a>#{category}</a>;
        });
    }
    return (
      <div className="commentBox">
        <h2>{this.state.data.title}</h2>
        <p>日付け : {this.state.data.date}</p>
        <p>{categoryComponent}</p>
        <div dangerouslySetInnerHTML={{__html: markdownText}}></div>
      </div>
    );
  }
});

if(document.getElementById("brogContext")){
    React.render(
        React.createFactory(brogArticle)({url: apiUrl}), document.getElementById("brogContext")
    );
}

