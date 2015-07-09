module.exports = function(React, appUsed){
    var AccountPreview = React.createClass({
        render: function() {
            var markdownText = marked(appUsed.form.text ? appUsed.form.text : "");
            var categoryComponent = [];
            if(appUsed.form.categories){
                for(var i=0, size= appUsed.form.categories.length; i<size; i++){
                    var category = appUsed.form.categories[i];
                    categoryComponent.push(<a  className="categoryList">{category}</a>);
                }; 
            }
            
            //日付けがなかったら現在の時刻をいれておく
            appUsed.form.date = appUsed.form.date ? appUsed.form.date 
                                                  :(new Date().toISOString());
            
            return (
                <div>
                <h2>{appUsed.form.title}</h2>
                <p>日付け : {appUsed.setDateFormat(appUsed.form.date)}</p>
                <p>{categoryComponent}</p>
                <div dangerouslySetInnerHTML={{__html: markdownText}}></div>
                </div>
            );
        }
    });

    if(document.getElementById("accountPreview")){
        React.render(<AccountPreview />, document.getElementById("accountPreview"));

    }
}
