// pages/myorder/myorder.js 
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
import {
  BatchApi
} from "../../apis/batch.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      show: "all",
      wclist: [],
      dflist: []
    })
  }
  onMyShow() {
    var that = this;
    var api = new PurchaseApi();

    api.purchaselist({
    }, (alllist) => {
      
      this.Base.setMyData({
        alllist
      });
    });

    api.purchaselist({
      pstatus: 'P,U,R'
    }, (wclist) => {
      this.Base.setMyData({
        wclist
      });
    });

    api.purchaselist({
      pstatus: 'W'
    }, (dflist) => {
      this.Base.setMyData({
        dflist
      });
    });

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
  }

  bindpay(e) {
    var that = this;
    var id=e.currentTarget.id;
    var wechatapi = new WechatApi();
    wechatapi.prepay({ id: id }, (payret) => {
      payret.complete = function (e) {
        that.onMyShow();
      }
      console.log(payret);
      wx.requestPayment(payret)
    });
  }
  toorder(e){
    var that = this;
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/order/order?id='+id,
    })
  }
  colseorder(e) {
    var that = this;
    var id = e.currentTarget.id;
    
    wx.showModal({
      title: '',
      content: '确认取消订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var batchapi = new BatchApi();
          batchapi.closeorder({ id: id }, (colseorder) => {
            that.Base.setMyData({ colseorder })
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
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow;
body.colseorder = content.colseorder;
body.bindpay = content.bindpay;
body.toorder = content.toorder;
Page(body)