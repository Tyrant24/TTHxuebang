// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '招募审核',
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
    api.fenxiaoinfo({}, (res) => {

      this.Base.setMyData({ shenhe: res })

    })
  }
  tuiguan(){
    wx.navigateBack({
      
    })
  }
  chonxintijiao(){


  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tuiguan = content.tuiguan;
body.chonxintijiao = content.chonxintijiao;
Page(body)