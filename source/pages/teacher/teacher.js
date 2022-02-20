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
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      vteach: []
    });
    var teacherapi = new TeacherApi();
    teacherapi.teachlist({
      status:"A",
      orderby: 'r_main.id'
    }, (teachlist) => {
      var vteach = [];
      vteach.push(teachlist[0]);
      vteach.push(teachlist[1]);
      vteach.push(teachlist[2]);
      this.Base.setMyData({
        teachlist,
        vteach
      });
    });
  }


  onReachBottom() {
    console.log("???kk");
    var vteach = this.Base.getMyData().vteach;
    var teachlist = this.Base.getMyData().teachlist;
    var count = 0;
    for (var i = vteach.length; i < teachlist.length; i++) {
      vteach.push(teachlist[i]);
      count++;
      if (count >= 5) {
        break;
      }
    }
    
    if (count == 0) {

      wx.showToast({
        title: '已经没有了',
        icon:'none'
      });
      this.Base.setMyData({
        nomore: 1,
      });
    }else{
      setTimeout(() => {
        console.log("llll");
        this.Base.setMyData({
          vteach
        });
      }, 1000);
    }
  }

  tojgdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jgdetails/jgdetails?id=' + id,
    })
  }

  fav(e) {
    var that = this;

    var id = e.currentTarget.id;
    console.log(id);
    id = id.split("_");
    var status = id[1];
    id = id[0];
    var teachlist = this.Base.getMyData().vteach;
    for (var i = 0; i < teachlist.length; i++) {
      if (teachlist[i].id == id) {
        teachlist[i].isfav = status;
      }

    }

    if (status == "N") {
      this.Base.setMyData({
        show: 1
      });
    }
    if (status == "Y") {
      this.Base.setMyData({
        show: 2
      });
    }
    var totop = this.Base.getMyData().res.totop;
    console.log(totop);
    //return;
    // wx.showToast({
    //   title: '收藏成功',
    //   icon: 'none'
    //   //image: "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/tthxb/resource/766e8ff191a9ac7409e308f3c203e824_19040417026.png"
    // })
    var jigouapi = new JigouApi();
    jigouapi.videofav({
      video_id: id,
      status
    }, (ret) => {
      //this.Base.info(ret.result);

      this.Base.setMyData({
        vteach:teachlist
      });

    });


    setTimeout(() => {
      this.Base.setMyData({
        show: 0
      })
      // clearTimeout(timeoutId);
    }, 1000);


  }
  play(e) {
    var id = e.currentTarget.id;
    id=id.split("_");
    id = id[1];
    console.log("bindplay");
    console.log(id);
    var teachlist = this.Base.getMyData().vteach;
    for (var i = 0; i < teachlist.length; i++) {
      if (id != teachlist[i].id) {
        try{
          
          var videoContext = wx.createVideoContext("v_" + teachlist[i].id);
          videoContext.pause();
        }catch(ex){

        }
      }else{
        teachlist[i].play="Y";
        this.Base.setMyData({ vteach: teachlist});
        setTimeout(()=>{
          console.log("play");
          console.log(id);
          var videoContext = wx.createVideoContext("v_" + id);
          videoContext.play();
          console.log("played");
        },500);
      }
    }
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tojgdetails = content.tojgdetails;
body.fav = content.fav;
body.play = content.play;
Page(body)