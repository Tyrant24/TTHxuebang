// pages/jifenshouzhi/jifenshouzhi.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  ApiUtil
} from "../../apis/apiutil";
import {
  JifenApi
} from "../../apis/jifen.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({ 
      title: '收支明细'
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ show : 1})
  }
  onMyShow() {
    var that = this;
    var jifenapi = new JifenApi();
    var shousum=0;
    var zhisum=0
    jifenapi.jilulist({ member_id: this.Base.getMyData().memberinfo.id }, (jilulist) => {
      
      for (var i = 0; i < jilulist.length;i++){
        if (jilulist[i].jifen < 0){
          jilulist[i].type='A';
          jilulist[i].created_date = ApiUtil.Updatetime(jilulist[i].created_date.replace(/-/g, '/'))
          zhisum += parseInt(jilulist[i].jifen);
        }
        if (jilulist[i].jifen > 0) {
          jilulist[i].type = 'B';
          jilulist[i].created_date = ApiUtil.Updatetime(jilulist[i].created_date.replace(/-/g, '/'))
          shousum += parseInt(jilulist[i].jifen);
        }
      }

      this.Base.setMyData({ jilulist, shousum, zhisum })
    })
  }
  xuanze(e){
    var type = e.currentTarget.id;
    console.log(type);
    if (type=="shouru"){
      this.Base.setMyData({show:1})
    }
    if (type == "zhichu") {
      this.Base.setMyData({ show: 2 })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.xuanze = content.xuanze;
Page(body)