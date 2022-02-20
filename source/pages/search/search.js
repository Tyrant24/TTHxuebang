// pages/search/search.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";
import {
  TeacherApi
} from "../../apis/teacher.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.new=1;
    super.onLoad(options);
    var json = {
      searchrecomm: ""
    };

    if (this.options.tp == undefined) {
      this.options.tp = "kc";
    }
    //this.options.keyword="%E8%8B%B1%E8%AF%AD";
    this.options.keyword = decodeURI(this.options.keyword);

    this.Base.setMyData({
      keyword: this.options.keyword,
      shows: "finished",
      tp: this.options.tp
    });


    var tp = this.Base.getMyData().tp;
    if (tp == "kc") {
      this.Base.setMyData({
        shows: "finished"
      })
    }
    if (tp == "jg") {
      this.Base.setMyData({
        shows: "wait"
      })
    }

    // if (options.new != undefined) {
    //   json.newphone = "N";
    // }
    // var bookapi = new BookApi();


  }





  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var show = this.Base.getMyData().show;
    var teacherapi = new TeacherApi();
    var jigouapi = new JigouApi();

    var json = {
      city_id: AppBase.CITYID
    };
    var kc = {
      city_id: AppBase.CITYID
    };
    var video = {
      city_id: AppBase.CITYID
    };
    json.searchkeyword = this.Base.getMyData().keyword;
    kc.searchkeyword = this.Base.getMyData().keyword;
    video.searchkeyword = this.Base.getMyData().keyword;
    console.log(json.searchkeyword + "电风扇");


    var mylat = that.Base.getMyData().mylat;
    var mylng = that.Base.getMyData().mylng;
    json.mylat = mylat;
    json.mylng = mylng;
    json.orderby = "distance";
    jigouapi.jglist(json, (jglist) => {
      this.Base.setMyData({
        jglist
      });
    });


    kc.mylat = mylat;
    kc.mylng = mylng;
    kc.orderby = "distance";

    jigouapi.courselist(kc, (courselist) => {
      this.Base.setMyData({
        courselist
      });
    });


    teacherapi.teachlist(video, (teachlist) => {
      this.Base.setMyData({
        teachlist
      });
    });


  }



  skey(e) {
    var keyword = e.detail.value;
    console.log(keyword);
    this.Base.setMyData({
      keyword: e.detail.value
    })
  }


  //  search(e) {

  //    this.Base.setMyData({ show: 1 });
  //    wx.showLoading({
  //      title: '加载中...',
  //    })

  //      var json = {};
  //      var data = e.detail.value;

  //      this.Base.setMyData({ value: data });

  //    json.searchkeyword = data;

  //    var teacherapi = new TeacherApi();
  //    var jigouapi = new JigouApi();

  //    jigouapi.courselist(json, (courselist) => {
  //      this.Base.setMyData({
  //        courselist
  //      });
  //    });
  //    jigouapi.jglist(json, (jglist) => {
  //      this.Base.setMyData({
  //        jglist
  //      });
  //    });
  //    teacherapi.teachlist(json, (teachlist) => {
  //      this.Base.setMyData({ teachlist });
  //    });



  //     //  var bookapi = new BookApi();
  //     //  bookapi.keywordlist(json, (result) => {
  //     //    this.Base.setMyData({ result });
  //     //   
  //     //  });
  //    wx.hideLoading();

  //  }

  tosearch(e) {
    //  var word = this.Base.getMyData().value;
    //  if (word != null) {
    //    wx.navigateTo({
    //      url: '/pages/searchbook/searchbook?keyword=' + word,
    //    })
    //  }
    wx.navigateBack({

    })
  }

  // todetails(e) {
  //   var name = e.currentTarget.id;
  //   wx.navigateTo({
  //     url: '/pages/searchbook/searchbook?keyword=' + name,
  //   })
  // }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "wc") {
      this.Base.setMyData({
        shows: "finished"
      })
    }
    if (type == "df") {
      this.Base.setMyData({
        shows: "wait"
      })
    }
    if (type == "mv") {
      this.Base.setMyData({
        shows: "video"
      })
    }

  }
  tojgdetails(e) {
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

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.skey = content.skey;
body.search = content.search;
body.tosearch = content.tosearch;
body.todetails = content.todetails;
body.tokcdetails = content.tokcdetails;
body.tojgdetails = content.tojgdetails;
body.bindshow = content.bindshow;
Page(body)