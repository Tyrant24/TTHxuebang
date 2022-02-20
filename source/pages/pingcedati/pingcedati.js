// pages/pingcedati/pingcedati.js
// pages/pingceindex/pingceindex.js 
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
  PingceApi
} from "../../apis/pingce.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=2;
    super.onLoad(options);
    this.Base.setMyData({
      check: "",
      sx: 0,
      //ck:0,
      qie: 0,
      pingce: []
    });
  }
  onMyShow() {
    var that = this;
    //this.onLoad();

    this.Base.setMyData({
      gif: false
    });

    var pingceapi = new PingceApi();

    pingceapi.pingcelist({
      pingceindex_id: this.Base.options.id
    }, (pingcelist) => {
      this.Base.setMyData({
        pingcelist
      });
    });

  }

  bindcheck(e) {

    var id = e.currentTarget.id;
    var sx = e.currentTarget.dataset.sx;

    var pingcelist = this.Base.getMyData().pingcelist;

    pingcelist[sx].check = id;

    this.Base.setMyData({
      pingcelist: pingcelist,
      ck: parseInt(sx)
    })
    if (sx < pingcelist.length - 1) {
      this.next(sx);
    }

  }

  next(sx) {
    var id = sx;
    console.log(id + "谷歌");

    var ck = this.Base.getMyData().ck;
    console.log(ck + "苹果");

    var check = this.Base.getMyData().check;

    var idx = parseInt(id) + 1;
    var pingce = this.Base.getMyData().pingce;

    pingce.push([parseInt(id) + 1, check]);

    setTimeout(() => {
      this.Base.setMyData({
        sx: idx,
        qie: parseInt(id) + 1
      })
    }, 300)

  }


  last(e) {
    var ck = this.Base.getMyData().ck;
    var qie = this.Base.getMyData().qie;

    this.Base.setMyData({
      ck: ck - 1,
      qie: qie - 1
    })

    console.log(this.Base.getMyData().ck + "随时");

    var id = this.Base.getMyData().sx;
    var idx = parseInt(id) - 1;

    this.Base.setMyData({
      sx: idx
    })

  }

  stoptouch(e) {
    console.log("禁止滑动")
  }


  tijiao() {

    var pingcelist = this.Base.getMyData().pingcelist;
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    for (var i = 0; i < pingcelist.length; i++) {
      if (pingcelist[i].check == 'A') {
        a++;
      }

      if (pingcelist[i].check == 'B') {
        b++;
      }

      if (pingcelist[i].check == 'C') {
        c++;
      }

      if (pingcelist[i].check == 'D') {
        d++;
      }

      // console.log(a,b,c,d)

    }
    console.log(a, b, c, d)


    var numbers = [a, b, c, d];
    // var max = arr[i];

    var sum = a + b + c + d;
    console.log(sum + "巅峰时代" + pingcelist.length);


    if (sum != pingcelist.length) {
      wx.showToast({
        title: '请认真填写所有问题',
        icon: 'none'
      })
      return;
    }


    var maxInNumbers = Math.max.apply(Math, numbers);

    // for (var i = 1; i < arr.length; i++) {
    //  var max = arr[i]; 
    // }
    var type = [];
    console.log(maxInNumbers);
    if (a == maxInNumbers) {
      console.log("乐观")
      var typeA = "A"
    }
    if (b == maxInNumbers) {
      console.log("悲观")
      var typeB = "B"
    }
    if (c == maxInNumbers) {
      console.log("积极")
      var typeC = "C"
    }
    if (d == maxInNumbers) {
      console.log("消极")
      var typeD = "D"
    }

    console.log(typeA, typeB, typeC, typeD,"力量")

    this.Base.setMyData({
      gif: true
    });

   setTimeout(() => {

      this.Base.setMyData({
        gif: false,
        check: "",
        qie: 0
      })

      var pingceapi = new PingceApi();

      console.log(this.Base.options.upid,"啦啦啦")
     console.log(typeA, typeB, typeC, typeD, "智力")
      pingceapi.updatepingce({
        dati_status: "Y",
        typeA: typeA,
        typeB: typeB,
        typeC: typeC,
        typeD: typeD,
        id: this.Base.options.upid
      }, (updatepingce) => {
        this.Base.setMyData({
          updatepingce
        })

      })


      wx.redirectTo({
        url: '/pages/pingcejieguo/pingcejieguo?typeA=' + typeA + '&typeB=' + typeB + '&typeC=' + typeC + '&typeD=' + typeD + '&id=' + this.Base.options.id,

        success: function(res) {

          if (res.confirm) {

            this.Base.setMyData({
              sx: 0,
              pingce: [],
              gif: false
            });

          }

        }

      })



 }, 1100)


  }


}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcheck = content.bindcheck;
body.last = content.last;
body.next = content.next;
body.tijiao = content.tijiao;
body.stoptouch = content.stoptouch;
Page(body)