// pages/seek/seek.js
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
  JigouApi
} from "../../apis/jigou.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    //this.options.type="jg";
    if (options.type == undefined) {
      options.type = 'kc';
    }


    if (options.ftype_id == undefined) {
      options.ftype_id = "0";
    }

    if (options.fage_id == undefined) {
      options.fage_id = "0";
    }

    if (options.fdistrict_id == undefined) {
      options.fdistrict_id = "0";
    }

    this.Base.setMyData({
      type: options.type,
      xiala: "yc",
      //type: "kc",
      show: "jx",
      options: "j_x",
      mylat: 0,
      mylng: 0,
      filtercoursetype: [],
      ftype_id: options.ftype_id,
      ttype_id: "0",
      filtercourseage: [],
      fage_id: options.fage_id,
      tage_id: "0",
      filterdistrict: [],
      fdistrict_id: options.fdistrict_id,
      tdistrict_id: "0",
      options_show: false,
      courselist: [],
      jglist: [],
      buyshow: [],
      vteach: []
    });

    //  console.log(this.options.type);



  }

  onUnload() {
    var timerStart = this.Base.getMyData().timerStart;
    clearInterval(timerStart);
  }
  onMyShow() {

    var isload = this.Base.getMyData().isload;
    if(isload==true){
      return;
    }
    this.Base.setMyData({ isload:true});
    wx.showLoading({
      title: '加载中...'
    });

    var type = this.Base.getMyData().type;

    var that = this;
    var instapi = new InstApi();
    var show = this.Base.getMyData().show;

    var jigouapi = new JigouApi();
    jigouapi.gongaolist({
      orderby: " rand() "
    }, (gongaolist) => {

      this.Base.setMyData({
        gongaolist
      });
    });

    jigouapi.coursetype({}, (filtercoursetype) => {
      this.Base.setMyData({
        filtercoursetype
      });
    });
    jigouapi.courseage({}, (filtercourseage) => {
      this.Base.setMyData({
        filtercourseage
      });
    });
    jigouapi.buyshow({}, (buyshow) => {
      this.Base.setMyData({
        buyshow
      });
    });

    console.log(show);
    this.loadcourse();

    jigouapi.activedistrictlist({
      city_id: AppBase.CITYID
    }, (filterdistrict) => {
      this.Base.setMyData({
        filterdistrict
      });
      if (this.Base.options.type == 'jg') {
		    var address=this.Base.getMyData().address;
        var adcode = address.ad_info.adcode;
        for (var i = 0; i < filterdistrict.length; i++) {
          if (adcode == filterdistrict[i].id) {
            var fdistrict_id = filterdistrict[i].id;
            this.Base.setMyData({
              fdistrict_id
            });
          }
        }
      }

      this.loadjg();
    });

    setTimeout(() => {
      wx.hideLoading()
    }, 1000);


  }
  tojgdetails(e) {
    this.Base.setMyData({
      xiala: "yc"
    })
    var id = e.currentTarget.id;

    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }

  tokcdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
    })
  }

  bindshow(e) {
    this.Base.setMyData({
      xiala: "yc"
    })
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "jx") {
      this.Base.setMyData({
        show: "jx"
      })
    }
    if (type == "xs") {
      this.Base.setMyData({
        show: "xs"
      })
    }
    if (type == "hp") {
      this.Base.setMyData({
        show: "hp"
      })
    }
    this.loadjg();

  }

  bindxuanxiang(e) {
    var options = e.currentTarget.dataset.options;
    console.log(options);
    if (options == "j_x") {
      this.Base.setMyData({
        options: "j_x"
      })


    }
    if (options == "x_s") {
      this.Base.setMyData({
        options: "x_s"
      })


    }
    if (options == "bm_za") {
      this.Base.setMyData({
        options: "bm_za"
      })


    }
    if (options == "h_p") {
      this.Base.setMyData({
        options: "h_p"
      })

    }
    this.loadcourse();
  }
  loadjg() {
    var jigouapi = new JigouApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;

    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    };
    var data = this.Base.getMyData();

    if (data.fdistrict_id != "0") {
      opt.district_id = data.fdistrict_id;
    }
    if (data.show == "jx") {
      opt.orderby = "jxrate,distance";
    }
    if (data.show == "xs") {
      opt.orderby = "up_time desc,distance";
    }
    if (data.show == "hp") {
      opt.orderby = "scoring desc,distance";
    }


    jigouapi.jglist(opt, (jglist) => {
      for (var i = 0; i < jglist.length; i++) {
        console.log(jglist[i]);
        var mile = ApiUtil.GetDistance(mylat, mylng, jglist[i].lat, jglist[i].lng);
        console.log("mile=" + mile);
        var miletxt = ApiUtil.GetMileTxt(mile);
        console.log("miletxt=" + miletxt);
        jglist[i]["miletxt"] = miletxt;
      }

      var jgvteach = [];
      for (var j = 0; j < jglist.length && j < 5; j++) {
        jgvteach.push(jglist[j]);
      }

      this.Base.setMyData({
        jglist,
        jgvteach
      });
    });
  }
  loadcourse() {
    var jigouapi = new JigouApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    var opt = {
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    };

    var data = this.Base.getMyData();
    if (data.fdistrict_id != "0") {
      opt.district_id = data.fdistrict_id;
    }
    if (data.ftype_id != "0") {
      opt.type = data.ftype_id;
    }
    if (data.fage_id != "0") {
      opt.age = data.fage_id;
    }
    if (data.options == "j_x") {
      opt.orderby = "jxrate,distance";
    }
    if (data.options == "x_s") {
      opt.orderby = "up_time desc,distance";
    }
    if (data.options == "bm_za") {
      opt.orderby = "people_num desc,distance";
    }
    if (data.options == "h_p") {
      opt.orderby = "scoring desc,distance";
    }


    jigouapi.courselist(opt, (courselist) => {
      for (var i = 0; i < courselist.length; i++) {
        var mile = ApiUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
        console.log("mile=" + mile);
        var miletxt = ApiUtil.GetMileTxt(mile);
        console.log("miletxt=" + miletxt);
        courselist[i]["miletxt"] = miletxt;

      }

      var vteach = [];
      for (var i = 0; i < courselist.length && i < 5; i++) {
        vteach.push(courselist[i]);
      }
      this.Base.setMyData({
        courselist,
        vteach
      });

    });
  }



  // onReachBottom() {
  //   console.log("???kk");
  //   var vteach = this.Base.getMyData().vteach;
  //   var courselist = this.Base.getMyData().courselist;

  //   var count = 0;
  //   for (var i = vteach.length; i < courselist.length; i++) {
  //     vteach.push(courselist[i]);
  //     count++;
  //     if (count >= 3) {
  //       break;
  //     }
  //   }

  //   if (count == 0) {
  //     wx.showToast({
  //       title: '已经没有了',
  //       nomore: 1,
  //       icon: 'none'
  //     })
  //   }
  //   else {
  //     setTimeout(() => {
  //       console.log("llll");
  //       this.Base.setMyData({
  //         vteach
  //       });
  //     }, 100);
  //   }
  // }

  onReachBottom() {
    console.log("???kk");
    wx.showLoading({
      title: '加载中...'
    })
    var jgvteach = this.Base.getMyData().jgvteach;
    var vteach = this.Base.getMyData().vteach;
    var courselist = this.Base.getMyData().courselist;
    var jglist = this.Base.getMyData().jglist;
    var count = 0;
    var cs = 0;

    if (this.Base.options.type == "kc") {
      for (var i = vteach.length; i < courselist.length; i++) {
        vteach.push(courselist[i]);
        count++;
        if (count >= 7) {
          break;
        }
      }
      console.log(count + "AAA")
      if (count == 0) {
        console.log("diaoni2");
        wx.hideLoading();
        wx.showToast({
          title: '已经没有了',
          icon: 'none'
        })
      }

      if (count != 0) {
        console.log("diaoni1");
        setTimeout(() => {
          console.log("llll");
          this.Base.setMyData({
            vteach
          });
          wx.hideLoading()
        }, 500);
      }

    }



    if (this.Base.options.type == "jg") {
      for (var j = jgvteach.length; j < jglist.length; j++) {
        jgvteach.push(jglist[j]);
        cs++;
        if (cs >= 4) {
          break;
        }
      }
      if (cs == 0) {
        console.log("diaoni2");
        wx.hideLoading();
        wx.showToast({
          title: '已经没有了',
          icon: 'none'
        });
      }
      if (cs != 0) {
        setTimeout(() => {
          console.log("llll");
          console.log("diaoni1");
          this.Base.setMyData({
            jgvteach
          });
          wx.hideLoading()
        }, 500);
      }
    }

    console.log("diaoni3");


  }


  hideFilter() {
    var data = this.Base.getMyData();
    var tdistrict_id = data.fdistrict_id;
    var ttype_id = data.ftype_id;
    var tage_id = data.fage_id;
    this.Base.setMyData({
      options_show: false,
      tdistrict_id,
      ttype_id,
      tage_id
    });
  }


  bindScreening(e) {
    var data = this.Base.getMyData();
    var qd = e.currentTarget.dataset.qd;
    if (qd == "ok") {
      var fdistrict_id = data.tdistrict_id;
      var ftype_id = data.ttype_id;
      var fage_id = data.tage_id;
      this.Base.setMyData({
        options_show: false,
        fdistrict_id,
        ftype_id,
        fage_id
      });
      this.loadcourse();
    } else {

      var tdistrict_id = data.fdistrict_id;
      var ttype_id = data.ftype_id;
      var tage_id = data.fage_id;
      this.Base.setMyData({
        // options: "s_x",
        options_show: true,
        tdistrict_id,
        ttype_id,
        tage_id
      })
    }

  }
  changeDistrict(e) {
    console.log(e);
    var seq = parseInt(e.currentTarget.id);
    if (seq == -1) {
      this.Base.setMyData({
        fdistrict_id: 0,
        xiala: "yc"
      });
    } else {

      var filterdistrict = this.Base.getMyData().filterdistrict;
      this.Base.setMyData({
        fdistrict_id: filterdistrict[seq].id,
        xiala: "yc"
      });
    }

    this.backtotop();
    this.loadjg();

  }
  setTDistrict(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({
      tdistrict_id: id
    });
  }
  setTType(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({
      ttype_id: id
    });
  }
  setTAge(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({
      tage_id: id
    });
  }
  resetFilter() {
    var that = this;



    // var that=this;
    wx.showModal({
      title: '确定',
      content: '确认重置？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {


          var tdistrict_id = that.Base.getMyData().fdistrict_id;
          var ttype_id = that.Base.getMyData().ftype_id;
          var tage_id = that.Base.getMyData().fage_id;

          that.Base.setMyData({
            tdistrict_id: 0,
            ttype_id: 0,
            tage_id: 0
          });



          // // wx.showToast({
          // //   title: '保存成功',
          // //   icon: '',
          // // })
        }
      }
    });




  }


  bindxiala(e) {
    var xiala = this.Base.getMyData().xiala;

    this.Base.setMyData({
      xiala: xiala == "xs" ? "yc" : "xs"
    })

  }

  yingcang(e) {
    this.Base.setMyData({
      xiala: "yc"
    })
  }

  catchTouchMove() {
    return false;
  }


  onShareAppMessage() {
    var data = this.Base.getMyData();
    return {
      path: "/pages/seek/seek?type=" + data.type +
        "&ftype_id=" + data.ftype_id +
        "&fage_id=" + data.fage_id +
        "&fdistrict_id=" + data.fdistrict_id
    };
  }





}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.onMyLoad = content.onMyLoad;
body.tojgdetails = content.tojgdetails;
body.tokcdetails = content.tokcdetails;
body.bindxuanxiang = content.bindxuanxiang;
body.bindxiala = content.bindxiala;
body.yingcang = content.yingcang;

body.bindScreening = content.bindScreening;
body.bindshow = content.bindshow;
body.loadjg = content.loadjg;
body.loadcourse = content.loadcourse;
body.hideFilter = content.hideFilter;
body.resetFilter = content.resetFilter;
body.setTDistrict = content.setTDistrict;
body.setTType = content.setTType;
body.setTAge = content.setTAge;
body.changeDistrict = content.changeDistrict;
body.catchTouchMove = content.catchTouchMove;
Page(body)