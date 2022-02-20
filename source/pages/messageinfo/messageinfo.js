// pages/messageinfo/messageinfo.js
// pages/myorder/myorder.js 
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
  MemberApi
} from "../../apis/member.api.js";
import {
  TeacherApi
} from "../../apis/teacher.api.js";
import {
  PurchaseApi
} from "../../apis/purchase.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
     
    })
  }
  onMyShow() {
    var that = this;
    var api = new MemberApi();
    var jigouapi = new JigouApi();
    var purchaseapi = new PurchaseApi();
    api.favcourselist({}, (kclist) => {
      this.Base.setMyData({
        kclist
      });
    });


    purchaseapi.purchaseinfo({
      id: this.Base.options.id
    }, (info) => {
      this.Base.setMyData({
        info
      });

      jigouapi.courseinfo({
        id: info.course_id
      }, (courseinfo) => {
        this.Base.setMyData({
          courseinfo
        });
      })

    });

  }
  todetails(e){
   wx.navigateTo({
     url: '/pages/kcdetails/kcdetails?id=' + this.Base.getMyData().courseinfo.id,
   })
  }




}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.todetails = content.todetails;

Page(body)