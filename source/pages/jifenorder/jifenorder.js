// pages/jifenorder/jifenorder.js
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
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ show: "all"})
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    jifenapi.jifenorderlist({ }, (alllist) => {
      this.Base.setMyData({ alllist })
    })

    jifenapi.jifenorderlist({orderstatus:"A"}, (daifalist) => {
      this.Base.setMyData({ daifalist })
    })

    jifenapi.jifenorderlist({ orderstatus: "B"}, (daishoulist) => {
      this.Base.setMyData({ daishoulist })
    })

    jifenapi.jifenorderlist({ orderstatus: "C"}, (wanchenlist) => {
      this.Base.setMyData({ wanchenlist })
    })

  }
  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "all") {
      this.Base.setMyData({
        show: "all"
      })
    }
    if (type == "wc") {
      this.Base.setMyData({
        show: "finished"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        show: "wait"
      })
    }
    if (type == "ok") {
      this.Base.setMyData({
        show: "wc"
      })
    }
  }
  bindtodetails(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jifenorderinfo/jifenorderinfo?id='+id
    })

  }
  wuliu(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/wuliu/wuliu?id=' + id
    })
  }
  shouhuo(e){
    var that=this;
    var id=e.currentTarget.id;
    var jifenapi = new JifenApi();

    wx.showModal({
      title: '提示',
      content: '确认收货？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          jifenapi.shouhuo({ id: id }, (shouhuo) => {
            that.Base.setMyData({ shouhuo })

            wx.showToast({
              title: '确认收货成功',
              icon:'none'
            })
            that.onMyShow();
          })
        }
      }
    });

  }
  shanchu(e){
   
    var that=this;
    var id=e.currentTarget.id;
    var jifenapi = new JifenApi();

    wx.showModal({
      title: '提示',
      content: '确认删除该订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          jifenapi.shanchu({ id: id }, (shanchu) => {
            that.Base.setMyData({ shanchu })

            wx.showToast({
              title: '删除订单成功',
              icon:'none'
            })
            that.onMyShow();
          })
        }
      }
    });

  
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.bindshow = content.bindshow; 
body.shouhuo = content.shouhuo; 
body.shanchu = content.shanchu;
body.bindtodetails = content.bindtodetails; 
body.wuliu = content.wuliu;
Page(body)