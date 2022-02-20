// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";
import {
  HaibaoApi
} from "../../apis/haibao.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.daojishi();
    super.onLoad(options);
   

  }
  onUnload() {
    console.error(66666);
    clearInterval(this.timer);

 
  }
  onHide() {
    console.error(66666);
    clearInterval(this.timer);


  }
  onMyShow() {
    var that = this;
    var api = new JigouApi();
    api.pintuaninfo({ id: this.Base.options.id }, (pintuaninfo) => {
        if(pintuaninfo.type=='T')
        {
          pintuaninfo.price = Number( Number(pintuaninfo.expeprice).toFixed(2));
          pintuaninfo.group_course_group_price = Number(Number(pintuaninfo.group_course_group_expeprice).toFixed(2));
        }
        else{
          pintuaninfo.price = Number(Number(pintuaninfo.price).toFixed(2));
          pintuaninfo.group_course_group_price = Number(Number(pintuaninfo.group_course_group_price).toFixed(2));
        }

      pintuaninfo.group_course_group_number = parseInt(pintuaninfo.group_course_group_number);
      console.error(pintuaninfo);
      var daojishilist = [];
      daojishilist[0] = pintuaninfo.jieshushijian;
      this.Base.setMyData({
        pintuaninfo: pintuaninfo, daojishilist: daojishilist, chajia: 
          Number((pintuaninfo.price - pintuaninfo.group_course_group_price).toFixed(2))
      })
   
    })

  }
  daojishi() {
    var that = this;
    this.timer = setInterval(() => {
      var list = that.Base.getMyData().daojishilist;
      var sjlist = [];
      for (var i = 0; i < list.length; i++) {
        var listtt = [];
        var danqiandate = new Date();
        var jisuandate = new Date(list[i].replace(/-/g, '/'));
        var dateDiff = jisuandate.getTime() - danqiandate.getTime();
        listtt.push(Math.floor(dateDiff / (24 * 3600 * 1000)));//计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        listtt.push(Math.floor(leave1 / (3600 * 1000)));   //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
        listtt.push(Math.floor(leave2 / (60 * 1000)));//计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        listtt.push(Math.round(leave3 / 1000));
        sjlist.push(listtt);
      }
      console.log("循环");
      that.Base.setMyData({

        sjlist: sjlist

      })



    }, 1000)





  }
  yuanjiagoumai(){
    var leixin = this.Base.getMyData().pintuaninfo.type;
        leixin=   leixin=='T'?'1':'0';
    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.getMyData().pintuaninfo.group_course_course_id + '&&leixin=' + leixin
    })


  }
  chakankechen(){
    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + this.Base.getMyData().pintuaninfo.group_course_course_id
      })
  }
  kaigexintuan(){
    var leixin = this.Base.getMyData().pintuaninfo.type;
    leixin =  leixin == 'T' ? '1' : '0';
    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.getMyData().pintuaninfo.group_course_course_id + '&&type=0'+'&&leixin='+leixin
    })

  }
  laren(){
  
    this.onShareAppMessage();

  }
  addgroup(){
    var leixin = this.Base.getMyData().pintuaninfo.type;
    leixin =   leixin == 'T' ? '1' : '0';
    wx.navigateTo({
      url: '/pages/purchase/purchase?course_id=' + this.Base.getMyData().pintuaninfo.group_course_course_id + '&&type=' + this.Base.options.id + '&&leixin=' + leixin

    })


  }
  fenxian(){
    var tz = this.Base.getMyData().pintuaninfo.commander_id == this.Base.getMyData().memberinfo.id?'1':'0';
    console.log(this.Base.getMyData().pintuaninfo.commander_id);
    console.log(this.Base.getMyData().memberinfo.id);
     console.log(tz);
     

    var api = new HaibaoApi;
    api.haibao2({tz:tz,ptid:this.Base.options.id}, (res) => {
      console.log(res);

      
      if (res.code == 0) {

      
         
        wx.navigateTo({
          url: '/pages/pintuanhaibao/pintuanhaibao?name=' + res.return+'&id='+this.Base.options.id,
        })


      }
    })


  }
}
var timer = 1;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.chakankechen = content.chakankechen;
body.yuanjiagoumai = content.yuanjiagoumai;
body.onMyShow = content.onMyShow;
body.daojishi = content.daojishi;
body.addgroup = content.addgroup;
body.laren = content.laren;
body.fenxian = content.fenxian;
Page(body)