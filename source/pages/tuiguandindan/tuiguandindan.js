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
      title: '商品推广订单',
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
        // xiaji[i].jieshushijian = this.jisuanchaoshi(xiaji[i].bandin_date, 0)[1];
      
      
        quanbu.push(xiaji[i]);
      }
      quanbu = this.zhuandindan(quanbu);
      console.log("那真的牛批");
      console.log(quanbu);
      for(let i=0;i<quanbu.length;i++)
      {
        quanbu[i].jieshushijian = this.jisuanchaoshi(quanbu[i].pay_time, 0)[1]

      }
    
      console.log("数据");
      
      this.Base.setMyData({ quanbu: quanbu,  xiaji: quanbu })
    })
  }
  zhuandindan(quanbu){
     var dindan=[];

     quanbu.map((item)=>{

     item.dindan.map((item1)=>{
       console.log(46546546);
       console.log(item1);
       item1.yonjin = parseInt(item1.amount * this.Base.getMyData().instinfo.fenxiaobili);
       dindan.push(item1)
       })  

     })
     console.log("嚯嚯嚯");
     console.log(dindan);
    return dindan;

  }
  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    this.Base.setMyData({ show: type })
  }
  binddate(e,b) {
    if (b == undefined) {
      var type = e.currentTarget.dataset.val;

    }
    else {
      var type = 111;
    }
    this.Base.setMyData({ date: type });
    var xiaji = this.Base.getMyData().xiaji;
    var quanbu = [];
    var youxiao = [];
    var shixiao = [];
    if (type == '111') {
      quanbu = xiaji.filter(quanbu => quanbu.pay_time.substring(0, 10) == b);
      this.Base.setMyData({ quanbu: quanbu });
 
    }


    if (type == 'all') {
      console.log(quanbu);
      quanbu = xiaji.filter(quanbu => quanbu);
      this.Base.setMyData({ quanbu:quanbu });

     
    }
    if (type == "7days") {
      console.log(xiaji);
      quanbu = xiaji.filter(quanbu => quanbu.jieshushijian >-6);
      console.log('哈哈哈');
      console.log(quanbu);
      this.Base.setMyData({ quanbu: quanbu });
     
    }
    if (type == "yesterday") {


      quanbu = xiaji.filter(item => item.jieshushijian ==1);

      this.Base.setMyData({ quanbu: quanbu });
     
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
body.onMyShow = content.onMyShow;
body.binddate = content.binddate;
body.jisuanchaoshi = content.jisuanchaoshi;
body.zhuandindan = content.zhuandindan;
body.binddate = content.binddate;
body.bindDateChange = content.bindDateChange;
Page(body)