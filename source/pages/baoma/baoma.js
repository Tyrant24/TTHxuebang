// pages/baoma/baoma.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil";
import { InstApi } from "../../apis/inst.api.js";
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
    var baomaapi = new BaomaApi();
    baomaapi.baomalist({}, (baomalist) => {
      for(var i=0;i<baomalist.length;i++){
        baomalist[i].up_time_timespan_d = ApiUtil.TimeAgo(baomalist[i].up_time_timespan);
      }
      this.Base.setMyData({ baomalist });
    });
  }
  binddetails(e){
    var id=e.currentTarget.id;

    wx.navigateTo({
      url: '/pages/baomainfo/baomainfo?id=' + id,
    })

  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.binddetails = content.binddetails;
Page(body)