// pages/pingjialist/pingjialist.js 
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
  PingjiaApi
} from "../../apis/pingjia.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      check: true
    });
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '评论',
    });
  }
  onMyShow() {
    var that = this;
    var pingjiaapi = new PingjiaApi();

    var id=this.Base.options.id;
    console.log(id+"懂得");

    pingjiaapi.pingjialist({ kecheng_id: id}, (pingjialist) => {
      this.Base.setMyData({
        pingjialist
      });
    });

  }

  check(e) {
    var ck = e.currentTarget.dataset.ck;
    console.log(ck);
    if (ck == "nm") {
      this.Base.setMyData({
        check: false
      })
    } else {
      this.Base.setMyData({
        check: true
      })
    }
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check;
Page(body)