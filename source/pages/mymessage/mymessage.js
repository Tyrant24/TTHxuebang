// pages/mymessage/mymessage.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
import { PurchaseApi } from "../../apis/purchase.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    var api = new PurchaseApi();


    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
    jigouapi.jglist({}, (jglist) => {
      this.Base.setMyData({ jglist });
    });


    api.purchaselist({
      pstatus: 'P,U,R'
    }, (wclist) => {
      this.Base.setMyData({
        wclist
      });
    });


    
  }
  bindtoinfo(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/messageinfo/messageinfo?id='+id
    })
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails; 
body.bindtoinfo = content.bindtoinfo; 
Page(body)