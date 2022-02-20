// pages/problem/problem.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({show:""})
  }
  onMyShow() {
    var that = this;
    var jigouapi = new JigouApi();
    
    jigouapi.problemlist({}, (problemlist) => {
      this.Base.setMyData({ problemlist });
    });
  }
  bindshow(e){
    
    var id=e.currentTarget.id;
    var show =this.Base.getMyData().show;
    if(show==""){
      this.Base.setMyData({
        show: id
      })
    }
    if (show != id) {
      this.Base.setMyData({
        show: id
      })
    }
    if(show==id){
      this.Base.setMyData({
        show: ""
      })
    }



  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow;

Page(body)