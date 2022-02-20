// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '找课程',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new JigouApi();

    api.xiaoxiinfo({ id: this.Base.options.id }, (xiaoxi) => {

      

    })

    api.myxiaoxi({ type: 'C' }, (myxiaoxi) => {
      for (var i = 0; i < myxiaoxi.length; i++) {
        if (myxiaoxi[i].content.substr(0, 2) == '恭喜') {
          console.log(myxiaoxi[0]);
          console.log("牛逼了1");
          myxiaoxi[i].zhuantai = "成功";
        }
        else {
          myxiaoxi[i].zhuantai = "失败";
        }

      }


      this.Base.setMyData({ myxiaoxi: myxiaoxi });
      console.log("123132");
    })
  }
  zhuqnaian(){
    wx.navigateTo({
      url: '/pages/review/review',
    })

  }
  chakanxianqin(){
  wx.navigateTo({
    url: '/pages/review/review',
  })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.zhuqnaian = content.zhuqnaian;
body.chakanxianqin = content.chakanxianqin;
Page(body)