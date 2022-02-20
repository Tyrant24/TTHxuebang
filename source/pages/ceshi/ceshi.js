// pages/ceshi/ceshi.js 
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  BaomaApi
} from "../../apis/baoma.api.js";

import {
  JifenApi
} from "../../apis/jifen.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      signNum: 0, //签到数
      signState: false, //签到状态
      min: 1, //默认值日期第一天1
      max: 7, //默认值日期最后一天7
      weeks: 0, //默认倍数
      dk : -1,
      jf:5,
      dakashow: false,
      tangchuan: false,
      dian:0,
      items: [{
        id: '001',
        text: 'Face',
        value: 1,
      },
      {
        id: '002',
        text: 'Eye',
        value: 2,
      },
      ],
      slider: 0,
    })
  }

  onMyShow() {

    var that = this
    // this.btn();

    // this.jifen();

    // var jifenapi = new JifenApi();


  }



  showtc(e) {

    this.Base.setMyData({
      tangchuan: true
    })

  }

  chakanjilu(e) {
    this.Base.setMyData({
      tangchuan: true,
      dakashow: false
    })
  }
  
  closetanchuang(e) {
    this.Base.setMyData({
      dakashow: false,
      tangchuan: false,
      guize: false
    })
  }

  btn() {
    var dian = this.Base.getMyData().dian;
    var jifenapi = new JifenApi();

    jifenapi.dakalist({member_id:this.Base.getMyData().memberinfo.id}, (dakalist) => {
      this.Base.setMyData({
        dakalist
      })


      if (dakalist.length == 0) {
        var jintian = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime());
        var time = this.Base.util.FormatDate(new Date(jintian.getFullYear() + '-' + (jintian.getMonth() + 1 < 10 ? '0' + (jintian.getMonth() + 1) : jintian.getMonth() + 1) + '-' + (jintian.getDate() < 10 ? '0' + (jintian.getDate()) : jintian.getDate()) + ' '));

        var panduan = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime()) ;
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        var a = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
       
        var week = ApiUtil.GetDates(7, pd_time);

          this.Base.setMyData({
            day: -1,
            dian: 0,
            no: 1,
            week
          })
          console.log("哈哈哈开始" )
        
          return
       
      }

      if(this.Base.getMyData().dk == -1) {
        var jintian = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime());
        var time = this.Base.util.FormatDate(new Date(jintian.getFullYear() + '-' + (jintian.getMonth() + 1 < 10 ? '0' + (jintian.getMonth() + 1) : jintian.getMonth() + 1) + '-' + (jintian.getDate() < 10 ? '0' + (jintian.getDate()) : jintian.getDate()) + ' '));

        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) + 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        var a = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        
        if (a.length == 0) {
          this.Base.setMyData({
            xianzai: jintian, day: -1,no:1
          })
          console.log("考虑开始");

    

        }

        else {
          this.Base.setMyData({
            day: 0,
            dk: 0, 
            dian:1,
            xianzai: time
          })
          console.log("今天")
        }

      }


      if (this.Base.getMyData().dk == 0) {
        
        var jintian = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian.getFullYear() + '-' + (jintian.getMonth() + 1 < 10 ? '0' + (jintian.getMonth() + 1) : jintian.getMonth() + 1) + '-' + (jintian.getDate() < 10 ? '0' + (jintian.getDate()) : jintian.getDate()) + ' '));
        var panduan = new Date(new Date(ApiUtil.GetNowFormatDate()).getTime());
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        var a = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        if (a.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("一天前开始")
          //return
        } 
        else {
          this.Base.setMyData({
            day: 1,
            dk: 1
          })
          console.log("一天前")
        }

      }

      if (this.Base.getMyData().dk == 1) {
        
        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) -  2*86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '-' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '-' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        console.log("离开了")
        console.log(a2)
        console.log("离开了")

        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("前天")
          //return
        } else {
          this.Base.setMyData({
            day: 2,
            dk: 2
          })
          console.log("两天前")
        }
      }

      if (this.Base.getMyData().dk == 2) {
        
        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 3 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '-' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '-' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 2*86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("三天前开始")

          //return
        } else {
          this.Base.setMyData({
            day: 3,
            dk: 3
          })
          console.log("三天前")
        }

      }

      if (this.Base.getMyData().dk == 3) {

        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 4 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '-' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '-' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 3*86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));

        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("四天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 4,
            dk: 4
          })
          console.log("四天前")
        }

      }

      if (this.Base.getMyData().dk == 4) {

        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 5 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '-' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '-' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 4*86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("五天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 5,
            dk: 5
          })
          console.log("五天前")
        }

      }

      if (this.Base.getMyData().dk == 5) {
        var jf = this.Base.getMyData().jf;
        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 6 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '-' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '-' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 5*86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("六天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 6,
            dk: 6,
            jf:25
          })
          console.log("三天前")
        }

      }

      if (this.Base.getMyData().dk == 6) {

        var jintian2 = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 7 * 86400000);
        var time = this.Base.util.FormatDate(new Date(jintian2.getFullYear() + '-' + (jintian2.getMonth() + 1 < 10 ? '0' + (jintian2.getMonth() + 1) : jintian2.getMonth() + 1) + '-' + (jintian2.getDate() < 10 ? '0' + (jintian2.getDate()) : jintian2.getDate()) + ' '));
        var a2 = dakalist.filter((item, idx) => {
          return this.Base.util.FormatDate(new Date(item.daka_date_dateformat)) == time
        })
        var panduan = new Date((new Date(ApiUtil.GetNowFormatDate()).getTime()) - 6*86400000);
        var pd_time = this.Base.util.FormatDate(new Date(panduan.getFullYear() + '-' + (panduan.getMonth() + 1 < 10 ? '0' + (panduan.getMonth() + 1) : panduan.getMonth() + 1) + '-' + (panduan.getDate() < 10 ? '0' + (panduan.getDate()) : panduan.getDate()) + ' '));
        if (a2.length == 0) {
          this.Base.setMyData({
            xianzai: pd_time
          })
          console.log("七天前开始")
          //return
        } else {
          this.Base.setMyData({
            day: 7,
            dk: 7
          })
          console.log("三天前")
        }

      }

      //  if (dakalist.length==0){
      //   var xianzai = ApiUtil.GetNowFormatDate();
      //  }
      //  else{
      //    var xianzai = this.Base.getMyData().xianzai;
      //  }
      var xianzai = this.Base.getMyData().xianzai;
      console.log("现在" + xianzai)

      var nowdate = ApiUtil.GetNowFormatDate();

      var timestamp = new Date(nowdate).getTime();

      var cj = new Date('2019-07-03 15:35').getTime();

      var time = ApiUtil.DateLater('2019-07-02', 7);

      var week = ApiUtil.GetDates(7, xianzai);

      console.log("现在时间" + nowdate)
      console.log("时间戳" + timestamp)
      console.log("创建时间戳" + cj)
      console.log(week)

      for (var i = 0; i < week.length;i++){
        if (new Date(week[i].seven_date).getTime() == timestamp){
          week[i].daka_date="今天"
        }
      }

      this.Base.setMyData({
        week: week
      });

    })

  }

  bindSignIn(e) {
    var that = this;
    //   days = e.currentTarget.dataset.days;
    // days++

    if (this.Base.getMyData().jf == 25) {
      this.Base.setMyData({ jifen: 25 })
    } else {
      this.Base.setMyData({ jifen: 5 })
    }

    var jifenapi = new JifenApi();
    jifenapi.daka({
      member_id: this.Base.getMyData().memberinfo.id,
      jifen: this.Base.getMyData().jifen,
      status: "A"
    }, (daka) => {
      this.Base.setMyData({
        daka
      })
      this.onMyShow();

    })


    //console.log(days + "天数");
    // wx.showToast({
    //   icon: 'success',
    //   title: '打卡成功',
    // })

    this.Base.setMyData({
      // signNum: days,
      signState: true,
      dakashow: true,
      tangchuan: false
    })

    // var min = e.currentTarget.dataset.min,
    //   max = e.currentTarget.dataset.max,
    //   weeks = e.currentTarget.dataset.weeks;

    // if (days % 7 == 0) {
    //   weeks += 1;
    //   this.Base.setMyData({
    //     weeks: weeks
    //   })
    // }

    // if (days == 7 * weeks + 1) {
    //   this.Base.setMyData({
    //     min: 7 * weeks + 1,
    //     max: 7 * weeks + 7
    //   })
    // }

  }

  jifen(){
    var jifenapi=new JifenApi();
    jifenapi.dakalist({ member_id: this.Base.getMyData().memberinfo.id }, (dakalist) => {
      this.Base.setMyData({
        dakalist
      })
      var sum=0
      for (var i = 0; i<dakalist.length;i++){
         

        sum += parseInt(dakalist[i].jifen);
      }
      this.Base.setMyData({ sum})
    })
  }

  getDates(days, todate) { //todate默认参数是当前日期，可以传入对应时间
    var dateArry = [];
    for (var i = 0; i < days; i++) {
      var dateObj = ApiUtil.DateLater(todate, i);
      dateArry.push(dateObj)
    }
    return dateArry;
  }



}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.btn = content.btn;
body.getDates = content.getDates; 
body.jifen = content.jifen; 

body.bindSignIn = content.bindSignIn;

body.showtc = content.showtc;
body.chakanjilu = content.chakanjilu;
body.closetanchuang = content.closetanchuang;
Page(body)