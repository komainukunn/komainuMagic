module.exports = function(React, appUsed){
    
   var CategoryCheckBox = React.createClass({
       getInitialState: function(){
            return {
                choiceItems : appUsed.form.categories,//選ばれてるカテゴリ
                allItems : "" //カテゴリー全部
            };
        },
        componentDidMount: function() {
            //カテゴリー一覧を取得
            $.ajax({
                url: appUsed.url+"/account/category/api/",
                dataType: 'json',
                cache: false,
                success: function(json) {
                    this.setState({allItems:json.categoryNames});
                    appUsed.result=json.result;
                    appUsed.message=json.message;
                    require("./messege-box")(React,appUsed);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        //チェックボックをチェックした時
        choiceCategory : function(e){
            //対象のカテゴリー
            var item = e.target.value;
            //選択済みのカテゴリーリストにあったら、リストから外す
            appUsed.form.categories = appUsed.form.categories ? appUsed.form.categories :[];
            for(var i=0;i<appUsed.form.categories.length;i++){
                if(appUsed.form.categories[i] == item){
                    appUsed.form.categories.splice(i,1);
                    this.setState({choiceItems:appUsed.form.categories});
                    
                    //ブレビューの更新
                    require("./account-preview")(React,appUsed);
                    return ;
                }
            }
            //選択したカテゴリーを選択リストに追加
            appUsed.form.categories.push(item);
            this.setState({choiceItems:appUsed.form.categories});

            //ブレビューの更新
            require("./account-preview")(React,appUsed);
        },
        deleteCategory : function(e){
            //カテゴリーの削除
            $.ajax({
                url: appUsed.url+"/account/category/api/delete?categoryName="
                                +e.currentTarget.getAttribute("value"),
                dataType: 'json',
                cache: false,
                success: function(json) {
                    if(json.categoryNames){
                        this.setState({allItems:json.categoryNames});
                    }
                    appUsed.result=json.result;
                    appUsed.message=json.message;
                    require("./messege-box")(React,appUsed);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        render: function() {
            var categoryComponent = [];
            if(this.state.allItems){
                console.log(this.state.allItems);
                //カテゴリーのタグを作る
                for(var i=0, size=this.state.allItems.length; i<size; i++){
                    var inputTag = "";
                    //選択済みのカテゴリーがあればチェックを入れておく
                    var choiceItems = this.state.choiceItems ? this.state.choiceItems:[];
                    if(choiceItems.indexOf(this.state.allItems[i]) < 0 ){
                        inputTag = <input type="checkbox"
                        value={this.state.allItems[i]} 
                        onClick={this.choiceCategory} />
                    }else{
                        inputTag = <input type="checkbox"
                        value={this.state.allItems[i]} 
                        onClick={this.choiceCategory} checked/>

                    }

                    //カテゴリーのタグ作っていく 
                    categoryComponent.push(
                        <div className="form-group">
                        <label  className="checkbox-inline" 
                                value={this.state.allItems[i]}>
                                {inputTag}
                                {this.state.allItems[i]}
                        </label>
                        <button className="checkbox-inline btn btn-danger btn-circle btn-xs"
                            type="button" 
                            onClick={this.deleteCategory} 
                            value={this.state.allItems[i]}>x
                        </button>
                        </div>
                    );
                }
            }

            return (
                <div className="form-group">
                    {categoryComponent}
                </div>
            );
        }
    });
    if(document.getElementById("categiryCheckBox")){
        React.render(<CategoryCheckBox />, document.getElementById("categiryCheckBox"));
    }
}
