// pages/yiduihuang/yiduihuang.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JifenApi
} from "../../apis/jifen.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '兑换成功',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    jifenapi.commodityinfo({ id: this.Base.options.shopid }, (info) => {
      this.Base.setMyData({ info })
    })
  }
  back(e){
   wx.navigateBack({
    delta:2
   })
  }
  order(e){
    wx.navigateTo({
      url: '/pages/jifenorderinfo/jifenorderinfo?id='+this.Base.options.id,
    })
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.back = content.back; 
body.order = content.order;

Page(body)