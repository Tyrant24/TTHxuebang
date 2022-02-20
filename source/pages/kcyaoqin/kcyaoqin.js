// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

import {
  JigouApi
} from "../../apis/jigou.api.js";
import {
  PingjiaApi
} from "../../apis/pingjia.api.js";
import {
  HaibaoApi
} from "../../apis/haibao.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '推广海报',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var api = new JigouApi();
    var that = this;
    if (this.Base.options.id != undefined) {
      var yaoqinren = this.Base.options.id;
      if (yaoqinren != this.Base.getMyData().memberinfo.id) {
        wx.reLaunch({
          url: '/pages/home/home?id=' + yaoqinren,
        })
        return
      }

    }



    this.Base.setMyData({ lujin: "https://cmsdev.app-link.org/Users/alucard263096/tthxb/upload/tthxb/" + this.options.name })
    this.Base.setMyData({ erweima: "http://cmsdev.app-link.org/alucard263096/tthxb/api/inst/qrcode?inst_id=1&url=/pages/kcdetails/kcdetails?yaoqin_id=" + this.Base.getMyData().memberinfo.id + '&id=' + this.Base.options.kcid })

      var kcid = this.Base.options.kcid;
      api.courseinfo({ id: kcid }, (kcinfo) => {
        this.Base.setMyData({ kcinfo })
      })
    }
  baocun() {
   
        this.download(this.Base.getMyData().lujin);
      }
  onShareAppMessage(e) {
        return {

          title: '大家一起来赚钱⑧',

          desc: '分享页面的内容',

          path: '/pages/home/home?id=' + this.Base.getMyData().memberinfo.id

        }

      }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.baocun = content.baocun;
Page(body)