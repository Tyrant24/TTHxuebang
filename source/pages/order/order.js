// pages/order/order.js
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
    //options.id = 21;
    super.onLoad(options);

    var timerid=setInterval(()=>{
      var reminderpay = this.Base.getMyData().reminderpay;
      if(reminderpay>0){
        reminderpay--;
        console.log(reminderpay);
        
        var mMinute = (reminderpay ) / 60;
        var mSecond = (reminderpay) % 60;
        mMinute = this.Base.util.ten2(mMinute);
        mSecond = this.Base.util.ten2(mSecond);
        console.log("reminderpay" + reminderpay);
        this.Base.setMyData({  mMinute, mSecond, reminderpay});

        if(reminderpay<=0){
          this.onMyShow();
        }
      }
    },1000);
    var codeimg = '';
    this.Base.setMyData({
      show: "finished",
      reminderpay:0,
      timerid,
      code:codeimg 
    })
    
    

  }
  onUnload(){
    var timerid = this.Base.getMyData().timerid;
    clearInterval(timerid);
  }
  
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
    var purchaseapi = new PurchaseApi();

    
    purchaseapi.purchaseinfo({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info
      });
      var codeimg ='https://cmsdev.app-link.org/alucard263096/tthxb/api/jigou/qrcode?id='+info.id+'&a.jpg';
      this.Base.setMyData({ codeimg: codeimg});
      console.log(codeimg+"图片链接");

      //return;
      if(info.pstatus=='W'){
        var reminderpay=parseInt(info.reminderpay);
        this.Base.setMyData({ reminderpay });
      }


      jigouapi.courseinfo({
        id: info.course_id
      }, (courseinfo) => {
        this.Base.setMyData({
          courseinfo
        });
      })




    });
  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
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
  bindback(e) {
    wx.navigateBack({
      delta: 2,
    })
  }

  bindpay(){
    var that=this;
    var wechatapi = new WechatApi();
    wechatapi.prepay({ id: this.Base.options.id }, (payret) => {
      payret.complete = function (e) {
        that.onMyShow();
      }
      console.log(payret);
      wx.requestPayment(payret)
    });
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
            
          })
          wx.navigateBack({
            
          })

        }
      }
    });


  }


  todetails(e){
    wx.navigateTo({
  url: '/pages/kcdetails/kcdetails?id='+this.Base.getMyData().courseinfo.id,
    })
   }


  previewImage(e) {

  wx.previewImage({
    urls: this.Base.getMyData().codeimg.split(',')
    // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
  })
}

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow; 
body.bindback = content.bindback;
body.bindpay = content.bindpay; 
body.colseorder = content.colseorder;

body.previewImage = content.previewImage;

body.todetails = content.todetails;


Page(body)