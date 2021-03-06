// import { AppBase } from "../../appbase";
// import { ApiConfig } from "../../apis/apiconfig";
// import { ContentApi } from "../../apis/content.api";
// var WxParse = require('../../wxParse/wxParse');

// class Content extends AppBase {
//   constructor() {
//     super();
//   }
//   onLoad(options) {
//     this.Base.Page = this;
//     options.keycode="帮助中心";
//     options.title = "aaaas";
//     super.onLoad(options);
//   }
//   onShow() {
//     var keycode = this.Base.options.keycode;
//     var title = this.Base.options.title;
//     var contentapi = new ContentApi();
//     var that = this;
//     contentapi.get({ keycode: keycode }, function (data) {
//       if (data == null) {
//         WxParse.wxParse('content', 'html', "请去后台设置文字内容:" + keycode, that, 10);
//         that.setData({ title: title });
//         wx.setNavigationBarTitle({
//           title: title,
//         })
//       } else {
//         data.content = that.Base.util.HtmlDecode(data.content);
//         WxParse.wxParse('content', 'html', data.content, that, 10);
//         that.setData({ title: data.name }); 
//         wx.setNavigationBarTitle({
//           title: data.name,
//         })
//       }
//     });
    
//   }
// }
// var content = new Content();
// content.PageName = "content";
// var body = content.generateBodyJson();
// body.onLoad = content.onLoad;
// body.onShow = content.onShow;
// Page(body)










// pages/baomainfo/baomainfo.js
// import { AppBase } from "../../appbase";
// import { ApiConfig } from "../../apis/apiconfig";
// import { InstApi } from "../../apis/inst.api.js";
// import { BaomaApi } from "../../apis/baoma.api.js";
// var WxParse = require('../../wxParse/wxParse');
// class Content extends AppBase {
//   constructor() {
//     super();
//   }
//   onLoad(options) {
//     this.Base.Page = this;
//     //options.id=5;
//     super.onLoad(options);
//   }
//   onMyShow() {
//     var that = this;
//     var instapi = new InstApi();
//     var baomaapi = new BaomaApi();
//     instapi.indexbanner({}, (indexbanner) => {
//       this.Base.setMyData({ indexbanner });
//     });
//     baomaapi.baomainfo({id:this.Base.options.id}, (baoma) => {
//       this.Base.setMyData({ baoma });
//       baomaapi.getnr({ id: baoma.id }, function (data) {
//         if (data == null) {
//           WxParse.wxParse('content', 'html', "请去后台设置文字内容:" + keycode, that, 10);
//         } else {
//           data.content = that.Base.util.HtmlDecode(data.content);
//           WxParse.wxParse('content', 'html', data.content, that, 10);
//         }
//       });
//     });
//   }
// }
// var content = new Content();
// var body = content.generateBodyJson();
// body.onLoad = content.onLoad;
// body.onMyShow = content.onMyShow;
// body.binddetails = content.binddetails;
// Page(body)


import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
import { BaomaApi } from "../../apis/baoma.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();

    jigouapi.xieyi({ }, (xieyi) => {
      this.Base.setMyData({ xieyi });
    });

  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)