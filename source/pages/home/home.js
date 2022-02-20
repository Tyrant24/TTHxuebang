// pages/content/content.js
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
import {
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      currentItemId: 2,
      mylat: 0,
      mylng: 0,
      currectcityid: 0
    })



  }

  onMyShow() {
    var that = this;
    var jigouapi = new JigouApi();



    this.loadBanner();


    var lastdistance = this.Base.getMyData().lastdistance;

    if (AppBase.CITYID != this.Base.getMyData().currectcityid ||
      this.lastdistance > 500
    ) {
      this.Base.setMyData({
        currectcityid: AppBase.CITYID
      });
      this.loadjg();
    }

  }
  tojgdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }
  loadBanner() {
    var instapi = new InstApi();
    // console.log()
    instapi.indexbanner({
      orderby: 'r_main.seq'
    }, (indexbanner) => {
      var bn = [];
      for (var item of indexbanner) {
        if (item.city_id == "0" || AppBase.CITYID.toString() == item.city_id.toString()) {
          bn.push(item);
        }
      }
      this.Base.setMyData({
        indexbanner: bn
      });
    });

    var cacheid = wx.getStorageSync("homenoticecacheid");

    instapi.lasthomenotice({
      orderby: 'r_main.seq',
      cacheid: cacheid
    }, (noticebanner) => {
      var bn = [];
      cacheid = cacheid.split(",");
      for (var item of noticebanner) {
        if (item.city_id == "0" || AppBase.CITYID.toString() == item.city_id.toString()) {
          bn.push(item);
          cacheid.push(item.id);
        }
      }
      wx.setStorageSync("homenoticecacheid", cacheid.join(","));
      if (bn.length > 0) {
        this.Base.setMyData({
          noticebanner: bn,
          showlastnotice: true
        });
      }
    });


  }

  closenotice() {
    this.Base.setMyData({
      showlastnotice: false
    });
  }
  totake(e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
    if (name == "jg") {
      wx.navigateTo({
        url: '/pages/seek/seek?type=' + "jg",
      })
    } else {
      wx.navigateTo({
        url: '/pages/seek/seek?type=' + "kc",
      })
    }

  }
  onPullDownRefresh() {
    this.onLoad({});
    super.onPullDownRefresh();
  }
  tobaoma(e) {
    wx.navigateTo({
      url: '/pages/baoma/baoma',
    })
  }

  swiperChange(e) {
    var currentItemId = e.detail.currentItemId;
    this.Base.setMyData({
      currentItemId: currentItemId
    })
  }

  clickChange(e) {
    var itemId = e.currentTarget.dataset.itemId;
    this.Base.setMyData({
      currentItemId: itemId
    });
  }
  loadjg() {
    var jigouapi = new JigouApi();
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    jigouapi.jglist({
      mylat,
      mylng,
      city_id: AppBase.CITYID,
      orderby: "distance"
    }, (jglist) => {
      for (var i = 0; i < jglist.length; i++) {
        console.log(jglist[i]);
        var mile = ApiUtil.GetDistance(mylat, mylng, jglist[i].lat, jglist[i].lng);
        console.log("mile=" + mile);
        var miletxt = ApiUtil.GetMileTxt(mile);
        console.log("miletxt=" + miletxt);
        jglist[i]["miletxt"] = miletxt;
      }

      var jgvteach = [];
      for (var i = 0; i < 4 && i < jglist.length; i++) {
        jgvteach.push(jglist[i]);
      }


      this.Base.setMyData({
        jglist,
        jgvteach
      });
    });
  }



  onReachBottom() {
    console.log("???kk");
    wx.showLoading({
      title: '加载中...'
    })
    var jgvteach = this.Base.getMyData().jgvteach;
    var jglist = this.Base.getMyData().jglist;
    var cs = 0;


    for (var j = jgvteach.length; j < jglist.length; j++) {
      jgvteach.push(jglist[j]);
      cs++;
      if (cs >= 7) {
        break;
      }
    }
    if (cs == 0) {
      wx.showToast({
        title: '已经没有了',
        icon: 'none'
      })
      this.Base.setMyData({
        jgnomore: 1,
      });
    } else {
      setTimeout(() => {
        console.log("llll");
        this.Base.setMyData({
          jgvteach
        });
        wx.hideLoading()
      }, 500);
    }


  }



  bannerGo(e) {
    var id = e.currentTarget.id;
    var indexbanner = this.Base.getMyData().indexbanner;
    for (var i = 0; i < indexbanner.length; i++) {
      if (id == indexbanner[i].id) {
        if (indexbanner[i].type == 'KC') {
          wx.navigateTo({
            url: '/pages/kcdetails/kcdetails?id=' + indexbanner[i].course_id
          })
        }
        if (indexbanner[i].type == 'JG') {
          wx.navigateTo({
            url: '/pages/jgdetails/jgdetails?id=' + indexbanner[i].jg_id
          })
        }
        if (indexbanner[i].type == 'SF') {
          wx.navigateTo({
            url: indexbanner[i].url
          })
        }
        return;
      }
    }
  }



  bannerGo2(e) {

    this.Base.setMyData({
      showlastnotice: false
    });

    var id = e.currentTarget.id;
    console.log(id);
    var indexbanner = this.Base.getMyData().noticebanner;
    for (var i = 0; i < indexbanner.length; i++) {
      if (id == indexbanner[i].id) {
        if (indexbanner[i].type == 'KC') {
          wx.navigateTo({
            url: '/pages/kcdetails/kcdetails?id=' + indexbanner[i].course_id
          })
        }
        if (indexbanner[i].type == 'JG') {
          wx.navigateTo({
            url: '/pages/jgdetails/jgdetails?id=' + indexbanner[i].jg_id
          })
        }
        if (indexbanner[i].type == 'SF') {
          wx.navigateTo({
            url: indexbanner[i].url
          })
        }
        return;
      }
    }
  }

  tocity(e) {
    wx.navigateTo({
      url: '/pages/city/city',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

  onPageScroll(e) {
    console.log(e)
    //this.Base.setMyData({ scrolltop: e.scrollTop})
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    }
    if (e.scrollTop > 520) {
      this.setData({
        sco: 1
      });
    }
    if (e.scrollTop <= 520) {
      this.setData({
        sco: 2
      });
    }
    if (e.scrollTop <= 100) {
      this.setData({
        floorstatus: false
      });
    }
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.totake = content.totake;
body.swiperChange = content.swiperChange;
body.clickChange = content.clickChange;
body.tobaoma = content.tobaoma;
body.loadjg = content.loadjg;
body.bannerGo = content.bannerGo;
body.bannerGo2 = content.bannerGo2;
body.tocity = content.tocity;
body.onReachBottom = content.onReachBottom;
body.onPageScroll = content.onPageScroll;
body.loadBanner = content.loadBanner;
body.closenotice = content.closenotice;
Page(body)