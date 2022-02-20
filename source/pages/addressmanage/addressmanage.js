// pages/addressmanage/addressmanage.js

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
  AddressApi
} from "../../apis/address.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '资料填写',
    });
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      type: "mine",
      xiugai: this.Base.options.xiugai
    });


    if (this.Base.options.xiugai == 1) {
      var addressapi = new AddressApi();
      addressapi.addressinfo({
        id: this.Base.options.id
      }, (info) => {
        this.Base.setMyData({
          info,
          city: info.region
        })
      })
    }

  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    this.Base.getAddress((address) => {
      console.log(address);
      var city = [address.address_component.province + address.address_component.city+address.address_component.district];

      console.log('试试' + address.address_component.province)
      console.log(city)
      this.Base.setMyData({
        city
      });
    });

    this.aaa();


  }

  aaa(e){
  var that = this;
  wx.getSystemInfo({
    success: function (res) {
      that.Base.setMyData({
        systemInfo: res,
      })
      if (res.platform == "devtools") {
        console.log("PC")
        that.Base.setMyData({show:1})   
      } 
      else if (res.platform == "ios") {
        console.log("ios")
        that.Base.setMyData({ show: 2 }) 
      } 
      else if (res.platform == "android") {
        console.log("android")
        that.Base.setMyData({ show: 1 }) 
      }
    }
  })
}

  bindRegionChange(e) {
    console.log(e.detail.value);
    console.log(e.detail.value[0])
    this.Base.setMyData({
      city: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    })
  }

  confirm(e) {
    var that = this;
    var data = e.detail.value;
    var member_id = this.Base.getMyData().memberinfo.id;
    console.log(this.Base.getMyData().memberinfo.id + "乐扣乐扣")

    if (data.name == "") {
      this.Base.toast("请填写收件人姓名");
      return;
    }

    if (data.mobile == "") {
      this.Base.toast("请填写手机号");
      return;
    }

    if (data.region == "") {
      this.Base.toast("请选择地址");
      return;
    }

    if (data.address == "") {
      this.Base.toast("请填写门牌号");
      return;
    }


    wx.showModal({
      title: '保存',
      content: '确认保存地址？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {

          var addressapi = new AddressApi();


          if (that.Base.getMyData().xiugai == 1) {
            addressapi.updateaddress({
              id: that.Base.options.id,
              name: data.name,
              phonenumber: data.mobile,
              region: data.region,
              address: data.address
            }, (updateaddress) => {
              that.Base.setMyData({
                updateaddress
              })
              wx.navigateBack({
                delta: 1,
              })
            })
          } else {
            addressapi.addedaddress({
              member_id: member_id,
              name: data.name,
              phonenumber: data.mobile,
              region: data.region,
              address: data.address,
              status: "A"
            }, (addedaddress) => {
              that.Base.setMyData({
                addedaddress
              })
              wx.navigateBack({
                delta: 1,
              })
            })
          }





        }
      }
    })

  }



  binddeleted(e) {
    var that = this;
    var addressapi = new AddressApi();
    wx.showModal({
      title: '删除',
      content: '确认删除该地址？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {

          addressapi.deleteaddress({
            id: that.Base.options.id
          }, (deleteaddress) => {
            that.Base.setMyData({
              deleteaddress
            })

            wx.showToast({
              title: '删除成功',
              icon: 'none'
            })

            wx.navigateBack({
              delta: 1,
            })

          })

        }
      }
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.addressmanage = content.addressmanage;
body.bindRegionChange = content.bindRegionChange;

body.confirm = content.confirm; 
body.aaa = content.aaa; 

body.binddeleted = content.binddeleted;

Page(body)