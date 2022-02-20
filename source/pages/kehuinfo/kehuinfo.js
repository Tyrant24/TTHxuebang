import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '客户详情',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  jisuanchaoshi(a, b) {
    var date1 = new Date();
    var date2 = new Date(a);
    var date3 = date1.getTime() - date2.getTime();
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    console.log(days);
    return [days < b, b - days];

  }
  onMyShow() {
    var that = this;
    var shijian = this.Base.getMyData().instinfo.xiajishijian;
     var memberapi=new MemberApi();
     memberapi.info({member_id:this.options.id},(member)=>{
       console.log("嚯嚯嚯");
 console.log(member);

       member.jieshushijian = this.jisuanchaoshi(member.bandin_date, shijian)[1];
 
  this.Base.setMyData({member:member});

     })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.jisuanchaoshi = content.jisuanchaoshi;
Page(body)