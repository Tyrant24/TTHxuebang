// pages/jifenorderinfo/jifenorderinfo.js
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
      title: '我的兑换',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    // options.id=2;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    jifenapi.jifenorderinfo({id:this.Base.options.id}, (info) => {
      this.Base.setMyData({ info })
    })
  }
  towuliu(e){
    wx.navigateTo({
      url: '/pages/wuliu/wuliu'
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.towuliu = content.towuliu;
Page(body)