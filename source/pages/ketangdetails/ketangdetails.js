// pages/ketangdetails/ketangdetails.js 
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
  PingjiaApi
} from "../../apis/pingjia.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      liebiao: false,
      quanbu: false,
      pinlun: '',
      tanguole: true,
      spbf: false,
      animationData: {}
    });
    this.Base.shipin = wx.createVideoContext("v_1");
    console.log("牛逼");
    console.log(this.Base.shipin);
  }

  onMyShow() {
    var that = this;
    var jigouapi = new JigouApi();

    jigouapi.fenxiaoinfo({}, (fenxiaoinfo) => {
      this.Base.setMyData({ fenxiaoinfo: fenxiaoinfo })
    })
    

    jigouapi.zaixiankecheninfo({
      id: this.Base.options.id
    }, (kecheninfo) => {
      var pinjunjia = kecheninfo.price / kecheninfo.chapter_num;
      this.Base.setMyData({
        kecheninfo: kecheninfo,
        isfav: kecheninfo.isfav,
        pinjunjia: pinjunjia.toFixed(2)
      })
    })
    jigouapi.ketanpinlunlist({
      onlineclassroom_id: this.Base.options.id
    }, (ketanpinlunlist) => {
      this.Base.setMyData({
        ketanpinlunlist: ketanpinlunlist
      })


    })


    jigouapi.kechenzhanjie({
      classroom_id: this.Base.options.id
    }, (zhanjie) => {
      zhanjie[0].dq = true;
      this.Base.setMyData({
        danqianzhanjie: zhanjie[0]
      });

      setTimeout(() => {
        this.Base.shipin.play();

      }, 500)
      this.Base.setMyData({
        zhanjie: zhanjie
      });
    })


  }
  qiehuanzhanjie(e) {
    var mulu = this.Base.getMyData().zhanjie;
    var kecheninfo = this.Base.getMyData().kecheninfo;


    if (mulu[e.currentTarget.dataset.id].isproved_value == 'N' && kecheninfo.idd == '' && kecheninfo.isfree_value=='N') {
      this.Base.info("需要付费观看,如果想观看要购买观看全集");
      return

    }
    // if ((mulu[e.currentTarget.dataset.id].isproved_value == 'Y' && kecheninfo.idd == '') && this.Base.getMyData().tanguole) {
    //   this.Base.setMyData({
    //     tanguole: false
    //   })
    //   this.Base.info("购买后观看完整版视频");
    //   return

    // }



    for (var i = 0; i < mulu.length; i++) {
      if (i == e.currentTarget.dataset.id) {
        mulu[i].dq = true;
      } else {
        mulu[i].dq = false;

      }
    }
    if (mulu[e.currentTarget.dataset.id].id == this.Base.getMyData().danqianzhanjie.id) {
      console.log("相同的哈哈");
      if (this.Base.getMyData().spbf) {
        console.log("暂停");
        this.Base.shipin.pause();
      }
      else {
        console.log("播放");
        this.Base.shipin.play();
      }
      return
    }
    this.Base.setMyData({
      zhanjie: mulu,
      danqianzhanjie: mulu[e.currentTarget.dataset.id],
      liebiao: false
    });
    setTimeout(() => {
      this.Base.shipin.play();

    }, 500)


  }
  fav(e) {
    var that = this;
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
    jigouapi.zaixiankechenshoucan({
      onlineclassroom_id: this.Base.options.id,
      status
    }, (ret) => {
      that.Base.zhendon();
      this.Base.setMyData({
        isfav: status
      });
    });

    setTimeout(() => {
      this.Base.setMyData({
        tishi: 0
      })
     //  clearTimeout(timeoutId);
    }, 3000);




  }
  shipin = null;


  jindu(e) {


    wx.setStorageSync(this.Base.options.id + 'sp', this.Base.getMyData().danqianzhanjie.id + ',' + e.detail.currentTime)


    var idd = this.Base.getMyData().kecheninfo.idd;
    var mianfei = this.Base.getMyData().kecheninfo.isfree_value;

    if (idd != '' || mianfei == 'Y') {
      return;
    }

    console.log("进来了1");

    // console.log(this.Base.getMyData().danqianzhanjie.proved_date);
    var a = Number(this.Base.getMyData().danqianzhanjie.proved_date);
    if (e.detail.currentTime >= a) {

      // this.Base.info("购买后观看完整版视频");

      this.Base.shipin.pause();
      if (e.detail.currentTime >= a + 1) {
        this.Base.shipin.seek(a);
      }


    }

  }
  chakanliebiao() {

    
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.Base.setMyData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      liebiao: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.Base.setMyData({
        animationData: animation.export()
      })
    }, 200)


    // this.Base.setMyData({
    //   liebiao: true
    // });
  }
  chakanquanbu() {
    this.Base.setMyData({
      quanbu: true
    });
  }
  guanbiquanbu() {
    this.Base.setMyData({
      quanbu: false
    });
  }
  guanbiliebiao() {
    this.Base.setMyData({
      liebiao: false
    });
  }
  shikan() {
    this.Base.backtotop();
    //this.Base.shipin.play();

    var canshu = wx.getStorageSync(this.Base.options.id + 'sp');
    console.log(canshu);
    if (canshu == '') {
      this.Base.info("购买后观看完整版视频");
      return
    } else {
      var canshu = canshu.split(',');
      var zhanjie = this.Base.getMyData().zhanjie;
      var danqianzhanjie = zhanjie.filter(item => item.id == canshu[0])
      this.Base.setMyData({
        danqianzhanjie: danqianzhanjie[0]
      })
      this.Base.shipin.seek(canshu[1]);
      this.Base.shipin.play();
    }


  }
  goumai() {
    wx.navigateTo({
      url: '/pages/shipingoumai/shipingoumai?id=' + this.Base.getMyData().kecheninfo.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  }
  shuru(e) {
    this.Base.setMyData({
      pinlun: e.detail.value
    })

  }
  fabiao() {
    var that = this;
    var api = new JigouApi();
    if (this.Base.getMyData().kecheninfo.idd != '' || this.Base.getMyData().kecheninfo.isfree_value == 'Y') {
      var pinlun = this.Base.getMyData().pinlun;
      if (pinlun == '') {
        this.Base.info("至少说点什么才可以发送哦");
        return
      }
      api.ketanpinlun({
        onlineclassroom_id: this.Base.options.id,
        neiron: pinlun
      }, (res) => {



        api.ketanpinlunlist({
          onlineclassroom_id: this.Base.options.id
        }, (ketanpinlunlist) => {
          that.Base.setMyData({
            ketanpinlunlist: ketanpinlunlist,
            pinlun: ''
          })
        })
      })


    } else {
      this.Base.info("购买此专栏后才能进行评论哦！");
    }
  }
  dianzan(e) {
    var ketanpinlunlist = this.Base.getMyData().ketanpinlunlist;
    var idx = e.currentTarget.dataset.idx;
    var api = new JigouApi();

    api.pinlundianzan({
      zaixianpinlun_id: e.currentTarget.dataset.id
    }, (res) => {
      console.log(res);
      if (res.return == "") {
        console.log(123132132);
        ketanpinlunlist[idx].dianzanrenshu = Number(ketanpinlunlist[idx].dianzanrenshu) - 1;
        ketanpinlunlist[idx].isfav = 'N';
      } else {
        console.log(45645646);
        ketanpinlunlist[idx].dianzanrenshu = Number(ketanpinlunlist[idx].dianzanrenshu) + 1;
        ketanpinlunlist[idx].isfav = 'Y';

      }
      this.Base.setMyData({
        ketanpinlunlist: ketanpinlunlist
      })

    })
    console.log(e);

  }
  huifudianzan(e) {
    var ketanpinlunlist = this.Base.getMyData().ketanpinlunlist;
    var idx = e.currentTarget.dataset.idx;
    var api = new JigouApi();

    api.pinlunhuifudianzan({
      zaixianpinlun_id: e.currentTarget.dataset.id
    }, (res) => {
      console.log(res);
      if (res.return == "") {
        console.log(123132132);
        ketanpinlunlist[idx].huifudianzanrenshu = Number(ketanpinlunlist[idx].huifudianzanrenshu) - 1;
        ketanpinlunlist[idx].huifuisfav = 'N';
      } else {
        console.log(45645646);
        ketanpinlunlist[idx].huifudianzanrenshu = Number(ketanpinlunlist[idx].huifudianzanrenshu) + 1;
        ketanpinlunlist[idx].huifuisfav = 'Y';

      }
      this.Base.setMyData({
        ketanpinlunlist: ketanpinlunlist
      })

    })
    console.log(e);

  }
  ksbf(e) {
    console.log("开始播放了");
    this.Base.setMyData({
      spbf: true
    })
    console.log(e);
  }
  jsbf(e) {
    console.log("结束播放了");
    this.Base.setMyData({
      spbf: false
    })
    console.log(e);
  }
  bfjs() {
    var danqian = this.Base.getMyData().danqianzhanjie;
    var zhanjie = this.Base.getMyData().zhanjie;
    console.log(zhanjie);
    var idx = 0;

    for (var i = 0; i < zhanjie.length; i++) {
      if (danqian.id == zhanjie[i].id) {
        idx = i;
      }
    }
    if (idx == zhanjie.length) {
      return
    }

    if (zhanjie[idx + 1].isproved_value == 'N') {
      this.Base.info("购买后观看完整版视频");

      return

    }


    this.Base.setMyData({
      danqianzhanjie: zhanjie[idx + 1]

    })

    setTimeout(() => {
      this.Base.shipin.play();

    }, 500)



  }

}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qiehuanzhanjie = content.qiehuanzhanjie;
body.bindcheck = content.bindcheck;
body.fav = content.fav;
body.jindu = content.jindu;
body.shikan = content.shikan;
body.chakanliebiao = content.chakanliebiao;
body.guanbiliebiao = content.guanbiliebiao;
body.chakanquanbu = content.chakanquanbu;
body.guanbiquanbu = content.guanbiquanbu;
body.goumai = content.goumai;
body.fabiao = content.fabiao;
body.shuru = content.shuru;
body.dianzan = content.dianzan;
body.huifudianzan = content.huifudianzan;
body.ksbf = content.ksbf;
body.jsbf = content.jsbf;
body.bfjs = content.bfjs;
Page(body)