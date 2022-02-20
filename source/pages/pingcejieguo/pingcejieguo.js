// pages/pingcejieguo/pingcejieguo.js 
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
  PingceApi
} from "../../apis/pingce.api.js";



class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.typeA = "A";
    super.onLoad(options);
    this.Base.setMyData({
      check: true,
      xh: 0

    });

    var typeA = this.options.typeA;
    var typeB = this.options.typeB;
    var typeC = this.options.typeC;
    var typeD = this.options.typeD;
    console.log(typeA, typeB, typeC, typeD,"看看")
    if (typeA != "undefined") {
      this.Base.setMyData({
        typeA: "A"
      })
    }
    if (typeB != "undefined") {
      this.Base.setMyData({
        typeB: "B"
      })
    }
    if (typeC != "undefined") {
      this.Base.setMyData({
        typeC: "C"
      })
    }
    if (typeD != "undefined") {
      this.Base.setMyData({
        typeD: "D"
      })
    }
    console.log(this.Base.options.pingce_id,"是是是");
  }
  onMyShow() {

    var that = this;
    var pingceapi = new PingceApi();
    var jigouapi = new JigouApi();
    var typeA = this.options.typeA;
    var typeB = this.options.typeB;
    var typeC = this.options.typeC;
    var typeD = this.options.typeD;

    console.log(typeA, typeB, typeC, typeD,"累了")

    pingceapi.pingcejieguo({
      pingceindex_id: this.Base.options.id,options: [typeA, typeB, typeC, typeD]
    }, (pingcejieguo) => {
      this.Base.setMyData({
        pingcejieguo
      });
      // console.log(pingcejieguo.coursetype_id+"看了房价高");

      var type = [];

      for (var a = 0; a < pingcejieguo.length; a++) {

        console.log(pingcejieguo[a].coursetype_id + "看了房价高");

        type.push(pingcejieguo[a].coursetype_id);

      }

      
      console.log(type);
      console.log("的客话")
      
      if(type[0]!=undefined){
        jigouapi.courselist({
          type: type
        }, (courselist) => {
          this.Base.setMyData({
            courselist
          });
          console.log(88888888888888);
          that.bindhuan();
        });
      }
      
    });

  }


  tokcdetails(e){
    var id=e.currentTarget.id
    wx.navigateTo({
      url: '/pages/kcdetails/kcdetails?id=' + id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

  check(e) {
    var ck = e.currentTarget.dataset.ck;
    console.log(ck);
    if (ck == "nm") {
      this.Base.setMyData({
        check: false
      })
    } else {
      this.Base.setMyData({
        check: true
      })
    }
  }
  again() {
 
    wx.navigateBack({
       delta:1    
    })
     
    console.log(555555);
  }
  bindhuan() {
    console.log(5555555555555);
    var courselist = this.Base.getMyData().courselist;
    var xianshilist = [];
    var xh = this.Base.getMyData().xh;
    console.log(xh);
    console.log("序号");
    for (var i = 0; i < courselist.length; i++) {
      if (i == xh) {
        console.log("进来了");
        console.log(i);

        if (courselist.length == 1) {
          xianshilist.push(courselist[i]);
          // xianshilist.push(courselist[0]);
          //xianshilist.push(courselist[1]);
          xh = 2;
          this.Base.setMyData({
            xianshilist: xianshilist,
            xh: xh
          });
          console.log(xianshilist);
          console.log(66666666);
          return
        }
        if (courselist.length == 2) {
          xianshilist.push(courselist[i]);
          xianshilist.push(courselist[0]);
          //xianshilist.push(courselist[1]);
          xh = 2;
          this.Base.setMyData({
            xianshilist: xianshilist,
            xh: xh
          });
          console.log(xianshilist);
          console.log(66666666);
          return
        }


        if (i == courselist.length - 2) {
          xianshilist.push(courselist[i]);
          xianshilist.push(courselist[i + 1]);
          xianshilist.push(courselist[0]);
          xh = 1;
          this.Base.setMyData({
            xianshilist: xianshilist,
            xh: xh
          });
          console.log(xianshilist);
          console.log(66666666);
          return
        }
        if (i == courselist.length - 1) {
          xianshilist.push(courselist[i]);
          xianshilist.push(courselist[0]);
          xianshilist.push(courselist[1]);
          xh = 2;
          this.Base.setMyData({
            xianshilist: xianshilist,
            xh: xh
          });
          console.log(xianshilist);
          console.log(66666666);
          return
        }


        if (i == courselist.length) {
          console.log(788888888);
          xianshilist.push(courselist[0]);
          xianshilist.push(courselist[1]);
          xianshilist.push(courselist[2]);
          xh = 3;
          this.Base.setMyData({
            xianshilist: xianshilist,
            xh: xh
          })
          return
        }


        xianshilist.push(courselist[i]);
        xianshilist.push(courselist[i + 1]);
        xianshilist.push(courselist[i + 2]);
        xh = xh + 3;
        if (xh == courselist.length) {
          xh = 0;
        }
        console.log(xh);
        this.Base.setMyData({
          xianshilist: xianshilist,
          xh: xh
        })
        return
      }

    }

  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check;
body.again = content.again;
body.bindhuan = content.bindhuan; 
body.tokcdetails = content.tokcdetails; 
Page(body)