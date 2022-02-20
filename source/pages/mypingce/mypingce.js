// pages/mypingce/mypingce.js
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
  PingceApi
} from "../../apis/pingce.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      type: this.Base.options.type
    })
  }
  setPageTitle() {
    // if (this.Base.getMyData().type == "A") {
    //   wx.setNavigationBarTitle({
    //     title: '评测列表',
    //   });
    // } else {
    //   wx.setNavigationBarTitle({
    //     title: '我的评测',
    //   });
    // }

  }
  onMyShow() {
    var that = this;
    if (this.Base.getMyData().type == "A") {
      wx.setNavigationBarTitle({
        title: '评测列表',
      });
    } else {
      wx.setNavigationBarTitle({
        title: '我的评测',
      });
    }
    var pingceapi = new PingceApi();
    pingceapi.mypingcelist({
      member_id: this.Base.getMyData().memberinfo.id
    }, (mypingcelist) => {
      this.Base.setMyData({
        mypingcelist
      })
    })

  }

  toceshi(e) {

    console.log(e);
    //return;
    var id = e.currentTarget.id;
    var pcid = e.currentTarget.dataset.pcid;
    var tA = e.currentTarget.dataset.typea;
    var tB = e.currentTarget.dataset.typeb;
    var tC = e.currentTarget.dataset.typec;
    var tD = e.currentTarget.dataset.typed;
    console.log(tA, tB, tC, tD,"事随时")
   // return;
    if (tA == "" && tB == "" && tC == "" && tD == "") {
      console.log("空");
      wx.navigateTo({
        url: '/pages/pingceindex/pingceindex?id=' + id + '&pcid=' + pcid
      })
    } else {
      wx.navigateTo({
        url: '/pages/pingcejieguo/pingcejieguo?id=' + id + '&typeA=' + tA + '&typeB=' + tB + '&typeC=' + tC + '&typeD=' + tD
      })
      
      
      console.log("有");
    }

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.toceshi = content.toceshi;
Page(body)