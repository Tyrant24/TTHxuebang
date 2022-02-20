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
    this.Base.setMyData({ jifen: Math.round(this.Base.options.jifen)});
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    var jigouapi = new JigouApi();
    jigouapi.zaixiankechenlist({}, (zaixiankechen) => {
      var remenkechen = zaixiankechen.filter(item => item.ishot_value == 'Y');
      var mianfeikechen = zaixiankechen.filter(item => item.isfree_value == 'Y');
      console.log(remenkechen);
      this.Base.setMyData({ kechenlist: zaixiankechen, remenkechen, mianfeikechen });
    })

  }
  tohome(e) {
    wx.reLaunch({
      url: '/pages/home/home'
    })
  }
  lijixuexi(){
    
    wx.navigateTo({
      url: '/pages/ketangdetails/ketangdetails?id='+this.Base.options.id,
    })
   

  }

  kechenxianqin(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/ketangdetails/ketangdetails?id=' + e.currentTarget.dataset.id,
    })

  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tohome = content.tohome;
body.lijixuexi = content.lijixuexi;
body.kechenxianqin = content.kechenxianqin;
Page(body)