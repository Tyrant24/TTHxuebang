// pages/searchword/searchword.js
// pages/search/search.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
import { TeacherApi } from "../../apis/teacher.api.js";
import { MemberApi } from "../../apis/member.api.js";

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
    this.Base.setMyData({ show: 0, result:[] });


  }

  

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "搜索",
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new MemberApi();
    instapi.searchkeyword({}, (ret) => {
      that.Base.setMyData({ history: ret.history, hotest: ret.hotest });
    });
  }
  skey(e) {
    var keyword = e.detail.value;
    console.log(keyword);
    this.Base.setMyData({
      keyword: e.detail.value
    })
  }


  search(e) {
    //console.log(e.detail.value);
    this.Base.setMyData({ show: 1 });
    // wx.showLoading({
    //   title: '加载中...',
    // })


      var json = {};
      var data = e.detail.value;
      this.Base.setMyData({ value: data });
      json.searchkeyword = data;

    var jigouapi = new JigouApi();
    jigouapi.keywordlist(json, (result) => {
        this.Base.setMyData({ result });
        wx.hideLoading();
      });



  }

  tosearch(e) {
    var word = this.Base.getMyData().value;
    
    var instapi = new MemberApi();
    instapi.setsearch({keyword:word});

    if (word != null) {
      wx.navigateTo({
        url: '/pages/search/search?keyword=' + word+'&tp='+this.Base.options.tp,
      })
    }
  }

  todetails(e) {
    var name = e.currentTarget.id;

    var instapi = new MemberApi();
    instapi.setsearch({ keyword: name });

    wx.navigateTo({
      url: '/pages/search/search?keyword=' + name,
    })
  }

  fav(e) {
    var id = e.currentTarget.id;
    console.log(id);
    id = id.split("_");
    var status = id[1];
    id = id[0];
    var teachlist = this.Base.getMyData().teachlist;
    for (var i = 0; i < teachlist.length; i++) {
      if (teachlist[i].id == id) {
        teachlist[i].isfav = status;
      }
    }
    var jigouapi = new JigouApi();
    jigouapi.videofav({ video_id: id, status }, (ret) => {
      //this.Base.info(ret.result);
      this.Base.setMyData({ teachlist });
    });
  }
  clearrecord(e){
    var that=this;
    wx.showModal({
      title: '删除',
      content: '确认删除历史搜索记录？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var memberapi = new MemberApi();
          memberapi.clearkeyword({}, (clearkeyword) => {
            that.Base.setMyData({ clearkeyword });
            that.onMyShow();
          });
        }
      }
      
    });
    
 
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
body.clearrecord = content.clearrecord;
body.fav = content.fav;

Page(body)