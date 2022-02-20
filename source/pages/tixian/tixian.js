// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";

import {
  WechatApi
} from "../../apis/wechat.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '提现',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ jiner: '',name:'' });
  }
  onMyShow() {
    var that = this;
    var api = new JigouApi();
    api.problemlist({ chanjin: 'tx' }, (problemlist) => {
      this.Base.setMyData({ problemlist: problemlist })

    })
    api.fenxiaoinfo({},(fenixaoinfo)=>{

      this.Base.setMyData({ fenixaoinfo: fenixaoinfo })

    })
  }
  mingxi() {

    wx.navigateTo({
      url: '/pages/mingxi/mingxi',
    })

  }
  quanbu() {
    console.log(123132);
    this.Base.setMyData({ jiner: this.Base.getMyData().memberinfo.tuiguanshouyi })
  }
  tixian() {
  var api=new WechatApi();
 this.Base.setMyData({tishi1:false,tishi2:false,tishi3:false});
 

    var jiner = Number(this.Base.getMyData().jiner);
    var name=this.Base.getMyData().name;
    if (jiner == 0) {
      this.Base.setMyData({ tishi2: true });
      return
    }
    if (jiner < 5 || jiner > 5000) {
      this.Base.setMyData({ tishi1: true });
      return
    }
    if (jiner > this.Base.getMyData().memberinfo.tuiguanshouyi) {
      this.Base.setMyData({ tishi3: true });
      return
    }
    api.withdraw({ realname: this.Base.getMyData().fenixaoinfo[0].reainame, amount:jiner},(res)=>{
      console.log(res);
      console.log("哈哈哈");
      console.log(res.code);
     if(res.code=='-1')
     {
     this.Base.info(res.return);
     }
     if(res.code=='0')
     { 
       this.Base.toast("提现成功");
     wx.navigateBack({
       
     })
     }
 
    })

  }
  shuru(e) {

    this.Base.setMyData({ jiner: e.detail.value })

  }
  shuru1(e) {

    this.Base.setMyData({ name: e.detail.value })

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.mingxi = content.mingxi;
body.quanbu = content.quanbu;
body.tixian = content.tixian;
body.shuru = content.shuru;
Page(body)