// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
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
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '交易成功',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var api=new PurchaseApi();
    api.purchaseinfo({id:this.Base.options.id},(info)=>{
          console.log(info);
          console.log(211213);
      this.Base.setMyData({ kecheninfo:info});
    })
    var that = this;
  }
  shipininfo()
  {
wx.navigateTo({
  url: '/pages/ketangdetails/ketangdetails?id=' + this.Base.getMyData().kecheninfo.onlineclassroom_id,
})

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.shipininfo = content.shipininfo;
Page(body)