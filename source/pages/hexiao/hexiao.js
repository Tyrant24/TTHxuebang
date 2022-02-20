// pages/content/content.js
import {
AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";
import {
  PurchaseApi
} from "../../apis/purchase.api.js";
import {
  WechatApi
} from "../../apis/wechat.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({usecode:options.usecode});
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
    var purchaseapi = new PurchaseApi();
    purchaseapi.scanpurchaseinfo({
      usecode: this.Base.options.usecode
    }, (info) => {
      this.Base.setMyData({
        info
      });
      jigouapi.courseinfo({
        id: info.course_id
      }, (courseinfo) => {
        this.Base.setMyData({
          courseinfo
        });
      })
    });
  }
  startscan(){
    var purchaseapi = new PurchaseApi();
    purchaseapi.usecode({
      usecode: this.Base.options.usecode
    },()=>{
      this.onMyShow();
    });
    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.startscan = content.startscan;
body.startscan = content.startscan;
Page(body)