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
import {
  WechatApi
} from "../../apis/wechat.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '确认订单',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var jigouapi = new JigouApi();
    jigouapi.zaixiankecheninfo({ id: this.Base.options.id }, (kecheninfo) => {
      this.Base.setMyData({
        kecheninfo: kecheninfo,
      })

    })
  }
  youhuijuan() {
    this.Base.info("该功能暂未开放");
  }
  tijiao() {

    var json = {
      onlineclassroom_id: this.Base.options.id, type: "SP", kt: this.options.type
    }




    var api = new PurchaseApi();
    api.create(json, (ret) => {
      if (ret.code == '0') {
        if (ret.return.pstatus == 'P') {
          // wx.navigateTo({
          //   url: '/pages/order/order' + ret.return.id,
          // })
          return;
        } else {

          var wechatapi = new WechatApi();
          wechatapi.prepay3({ id: ret.return.id }, (payret) => {
            payret.complete = function (e) {
              console.log(e);
              console.log("嚯嚯嚯嚯嚯嚯");

              if (e.errMsg == "requestPayment:ok") {


                api.purchaseinfo({ id: ret.return.id }, (res) => {

                  wx.reLaunch({
                    url: '/pages/videopurcsucc/videopurcsucc?id=' + res.onlineclassroom_id + '&&jifen=' + res.amount,
                  })


                })

              }
              else {

                // wx.navigateTo({
                //   url: '/pages/kcdetails/kcdetails?id=' + that.options.course_id,
                // })
                console.log("支付失败");

              }

            }
            console.log(payret);
            wx.requestPayment(payret)
          });
        }
      } else {
        this.Base.info(ret.result);
      }
    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.youhuijuan = content.youhuijuan;
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tijiao = content.tijiao;
Page(body)