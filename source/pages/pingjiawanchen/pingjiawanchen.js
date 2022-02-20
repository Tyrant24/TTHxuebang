// pages/pingjiawanchen/pingjiawanchen.js 
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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({  });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });

  }
  tohome(e){
    wx.reLaunch({
      url: '/pages/home/home'
    })
  }
  pinjiagenduo()
  {
 
  wx.navigateTo({
    url: '/pages/myorder/myorder?type=dpj',
  })

  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tohome = content.tohome;
body.pinjiagenduo = content.pinjiagenduo;
Page(body)