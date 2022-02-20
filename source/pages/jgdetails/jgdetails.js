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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var that = this;
    wx.getSystemInfo({
      success(res) {
        console.log(res.model)


        var str = res.model
        var model = str.split("(")[0];
        console.log(model + "机型")

        that.Base.setMyData({
          model: model
        })
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }

    })


  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();



    jigouapi.jginfo({
      id: this.options.id
    }, (jginfo) => {

      

        jigouapi.courselist({
          jg_id: jginfo.id
        }, (courselist) => {
          var mylat = this.Base.getMyData().mylat;
          var mylng = this.Base.getMyData().mylng;
          for (var i = 0; i < courselist.length; i++) {
            console.log("牛逼");
            console.log(mylat);
            var mile = ApiUtil.GetDistance(mylat, mylng, courselist[i].JG_lat, courselist[i].JG_lng);
            console.log("mile=" + mile);
            var miletxt = ApiUtil.GetMileTxt(mile);
            console.log("miletxt=" + miletxt);
            courselist[i]["miletxt"] = miletxt;

          }

          this.Base.setMyData({
            courselist: courselist
          });
        });




      jigouapi.jigouimg({
        jigou: jginfo.id,
        orderby: 'r_main.seq',
        status: "A"
      }, (jigouimg) => {
        this.Base.setMyData({
          jigouimg
        });
      });
      console.log("???????????");

      this.Base.setMyData({
        jginfo,
        isfav: jginfo.isfav
      });



    });

  }

  tokcdetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
    })
  }

  fav(e) {
    var status = e.currentTarget.id;


    if (status == "Y") {
      this.Base.setMyData({
        tishi: 1
      });
    }
    if (status == "N") {
      this.Base.setMyData({
        tishi: 2
      });
    }




    var jigouapi = new JigouApi();
    jigouapi.jigoufav({
      jg_id: this.Base.options.id,
      status
    }, (ret) => {
      this.Base.setMyData({
        isfav: status
      });
    });

    setTimeout(() => {
      this.Base.setMyData({
        tishi: 0
      })
      // clearTimeout(timeoutId);
    }, 1000);


  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tokcdetails = content.tokcdetails;
body.fav = content.fav;

Page(body)