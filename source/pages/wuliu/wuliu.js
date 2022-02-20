// pages/wuliu/wuliu.js
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
  JifenApi
} from "../../apis/jifen.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '查看物流',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();

    jifenapi.jifenorderinfo({ id: this.Base.options.id }, (info) => {

      jifenapi.wuliu({ type: info.wuliu_company_type,no:info.airwaybill}, (wuliu) => {
        var wuliulist = wuliu.result.list;
        var wllist = [];
        for (var i = wuliulist.length - 1; i >= 0; i--) {
          wllist.push(wuliulist[i]);
        }

        this.Base.setMyData({
          wuliu, wllist
        })

      })


      this.Base.setMyData({ info })


    })

    
  }

  onclick() {
    wx.request({
      url: '',
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.onclick = content.onclick;
Page(body)