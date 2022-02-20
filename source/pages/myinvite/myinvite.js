// pages/content/content.js
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
      title: '我的邀请',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
    
      date: "all",

    })
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
    var quanbu = [];
    var youxiao = [];
    var shixiao = [];

   
    var memberapi = new MemberApi();
    memberapi.chakanxiaji({}, (xiaji) => {
      for (var i = 0; i < xiaji.length; i++) {
        xiaji[i].jieshushijian = this.jisuanchaoshi(xiaji[i].bandin_date, 0)[1];
     
        quanbu.push(xiaji[i]);
      }
      console.log("数据");
      console.log(quanbu);
      console.log(youxiao);
      console.log(shixiao);
      this.Base.setMyData({ youxiao: quanbu,  xiaji: xiaji })
    })
  }


  
  binddate(e, b) {
    if (b == undefined) {
      var type = e.currentTarget.dataset.val;

    }
    else {
      var type = 111;
    }

   
    this.Base.setMyData({ date: type });
    var xiaji = this.Base.getMyData().xiaji;

    var youxiao = [];
   
    if (type == '111') {

      youxiao = xiaji.filter(quanbu => quanbu.bandin_date.substring(0, 10) == b);
      this.Base.setMyData({ youxiao: youxiao });

    }


    if (type == 'all') {
    
      youxiao = xiaji.filter(quanbu => quanbu);
      this.Base.setMyData({ youxiao: youxiao });
     
    }
    if (type == "7days") {
  
      youxiao = xiaji.filter(quanbu => quanbu.jieshushijian > -6);
      this.Base.setMyData({ youxiao: youxiao });

    }
    if (type == "yesterday") {


    
      youxiao = xiaji.filter(quanbu => quanbu.jieshushijian == 0);
      this.Base.setMyData({ youxiao: youxiao });
  
    }

  }
  bindDateChange(e) {
    console.log(e);

    console.log(e.detail.value);

    var shijian = e.detail.value;
    var shijians = shijian.split("-");
    var xssj = (shijians[0] + '-' + shijians[1] + '-' + shijians[2]);
    this.binddate(1, xssj)
    this.Base.setMyData({
      xssj: xssj
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;0
body.jisuanchaoshi = content.jisuanchaoshi;
body.binddate = content.binddate;
body.bindDateChange = content.bindDateChange;
Page(body)