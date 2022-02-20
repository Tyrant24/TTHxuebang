// pages/huiyuanfuwu/huiyuanfuwu.js
// pages/pingjia/pingjia.js
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
  PingjiaApi
} from "../../apis/pingjia.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
     
    });
  }
  onMyShow() {
    var that = this;
    var jigouapi = new JigouApi();
    jigouapi.huiyuan({}, (info) => {

      jigouapi.quanyilist({ fuwu_id:info.id}, (list) => {
        this.Base.setMyData({
          list
        });
      });

      this.Base.setMyData({
        info
      });
    });
  }

  check(e) {
    var ck = e.currentTarget.dataset.ck;
  
 
  }
  tokaitong(e){
    wx.navigateTo({
      url: '/pages/liucheng/liucheng',
    })
  }
 
 


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check;
body.minusImg = content.minusImg;
body.uploadimg = content.uploadimg;
body.submit = content.submit;
body.bindjgpingfen = content.bindjgpingfen;
body.bindkcpingfen = content.bindkcpingfen; 
body.tokaitong = content.tokaitong;
Page(body)