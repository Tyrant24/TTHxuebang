import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { nextTick } from 'q';

@Component({
  selector: 'app-ketangdetails',
  templateUrl: './ketangdetails.page.html',
  styleUrls: ['./ketangdetails.page.scss'],
  providers: [MemberApi, JigouApi]
})
export class KetangdetailsPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public elementRef: ElementRef
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);

  }
  shipin = null;
  liebiao = false;
  quanbu = false;
  pinlun = '';
  tanguole = true;
  spbf = false;
  animationData = {};
  onMyLoad() {
    this.shipin = this.elementRef.nativeElement.querySelector("#v_1");
    console.log("牛逼");
    console.log(this.shipin);
  }
  fenxiaoinfo = {};
  kecheninfo = {isfree_value:"N",idd:"",id:""};
  isfav = "";
  pinjunjia = "";
  ketanpinlunlist = [];
  danqianzhanjie = {id:0,proved_date:"",cover:"",video:"",};
  zhanjie = [];
  rad=1;
  onMyShow() {
    var that = this;
    var jigouapi = this.jigouApi;

    //alert(screen.width);
    this.rad=375*1.0/screen.width;

    jigouapi.fenxiaoinfo({}).then((fenxiaoinfo) => {
      this.fenxiaoinfo = fenxiaoinfo;
    })


    jigouapi.zaixiankecheninfo({
      id: this.params.id
    }).then((kecheninfo) => {
      var pinjunjia = kecheninfo.price / kecheninfo.chapter_num;
      console.log("kecheninfo",kecheninfo);
      this.kecheninfo = kecheninfo;
      this.isfav = kecheninfo.isfav;
      this.pinjunjia = pinjunjia.toFixed(2);
    })
    jigouapi.ketanpinlunlist({
      onlineclassroom_id: this.params.id
    }).then((ketanpinlunlist) => {
      this.ketanpinlunlist = ketanpinlunlist;
    })


    jigouapi.kechenzhanjie({
      classroom_id: this.params.id
    }).then((zhanjie) => {
      zhanjie[0].dq = true;
      this.danqianzhanjie = zhanjie[0];

      nextTick(() => {

        setTimeout(() => {
          this.shipin.play();

        }, 500)
        this.zhanjie = zhanjie;
      });
    })


  }
  qiehuanzhanjie(id) {
    var mulu = this.zhanjie;
    var kecheninfo = this.kecheninfo;
    if (mulu[id].isproved_value == 'N' && kecheninfo.idd == '') {
      this.showAlert("需要付费观看,如果想观看要购买观看全集");
      return

    }
    // if ((mulu[e.currentTarget.dataset.id].isproved_value == 'Y' && kecheninfo.idd == '') && this.tanguole) {
    //   this.setMyData({
    //     tanguole: false
    //   })
    //   this.info("购买后观看完整版视频");
    //   return

    // }



    for (var i = 0; i < mulu.length; i++) {
      if (i == id) {
        mulu[i].dq = true;
      } else {
        mulu[i].dq = false;

      }
    }
    if (mulu[id].id == this.danqianzhanjie.id) {
      console.log("相同的哈哈");
      if (this.spbf) {
        console.log("暂停");
        this.shipin.pause();
      }
      else {
        console.log("播放");
        this.shipin.play();
      }
      return
    }
    this.zhanjie = mulu;
    this.danqianzhanjie = mulu[id];
    this.liebiao = false;

    nextTick(() => {
      setTimeout(() => {
        this.shipin.play();
      }, 500)
    });


  }
  tishi = 0;
  fav(status) {
    var that = this;


    if (status == "Y") {
      this.tishi = 1;
    }
    if (status == "N") {
      this.tishi = 2;
    }

    var jigouapi = this.jigouApi;
    jigouapi.zaixiankechenshoucan({
      onlineclassroom_id: this.params.id,
      status
    }).then((ret) => {
      //this.zhendon();
      this.isfav = status;
    });

    setTimeout(() => {
      this.tishi = 0;
      // clearTimeout(timeoutId);
    }, 3000);




  }

  jindu(e) {
  console.log(e);
    //alert(e.detail.currentTime);

    //wx.setStorageSync(this.options.id + 'sp', this.danqianzhanjie.id + ',' + e.detail.currentTime)
    window.localStorage.setItem(this.params.id + 'sp', this.danqianzhanjie.id + ',' + e.target.currentTime);
    var idd = this.kecheninfo.idd;
    var mianfei = this.kecheninfo.isfree_value;

    if (idd != '' || mianfei == 'Y') {
      return;
    }

    console.log("进来了1");

    // console.log(this.danqianzhanjie.proved_date);
    var a = Number(this.danqianzhanjie.proved_date);
    if (e.detail.currentTime >= a) {

      // this.info("购买后观看完整版视频");

      this.shipin.pause();
      if (e.currentTime >= a + 1) {
        this.shipin.seek(a);
      }


    }

  }
  chakanliebiao() {


    var that = this;
    this.liebiao = true;
    // 创建一个动画实例
    // var animation = wx.createAnimation({
    //   // 动画持续时间
    //   duration: 500,
    //   // 定义动画效果，当前是匀速
    //   timingFunction: 'linear'
    // })
    // // 将该变量赋值给当前动画
    // that.animation = animation
    // // 先在y轴偏移，然后用step()完成一个动画
    // animation.translateY(200).step()
    // // 用setData改变当前动画
    // that.setMyData({
    //   // 通过export()方法导出数据
    //   animationData: animation.export(),
    //   // 改变view里面的Wx：if
    //   liebiao: true
    // })
    // // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    // setTimeout(function () {
    //   animation.translateY(0).step()
    //   that.setMyData({
    //     animationData: animation.export()
    //   })
    // }, 200)


    // this.setMyData({
    //   liebiao: true
    // });
  }
  chakanquanbu() {
    this.quanbu = true;
  }
  guanbiquanbu() {
    this.quanbu = false;
  }
  guanbiliebiao() {
    this.liebiao = false;
  }
  shikan() {
    //this.backtotop();
    this.shipin.scrollIntoView();
    //this.shipin.play();

    var canshu = window.localStorage.getItem(this.params.id + 'sp');
    console.log(canshu);
    if (canshu == '') {
      this.showAlert("购买后观看完整版视频");
      return
    } else {
      var canshuarr = canshu.split(',');
      var zhanjie = this.zhanjie;
      var danqianzhanjie = zhanjie.filter(item => item.id == canshuarr[0]);
      this.danqianzhanjie = danqianzhanjie[0];
      this.shipin.seek(canshuarr[1]);
      this.shipin.play();
    }


  }
  goumai() {
    this.navigate("shipingoumai", { id: this.kecheninfo.id });
  }

  fabiao() {
    var that = this;
    var api = this.jigouApi;
    if (this.kecheninfo.idd != '' || this.kecheninfo.isfree_value == 'Y') {
      var pinlun = this.pinlun;
      if (pinlun == '') {
        this.showAlert("至少说点什么才可以发送哦");
        return
      }
      api.ketanpinlun({
        onlineclassroom_id: this.params.id,
        neiron: pinlun
      }).then((res) => {



        api.ketanpinlunlist({
          onlineclassroom_id: this.params.id
        }).then((ketanpinlunlist) => {
          this.ketanpinlunlist = ketanpinlunlist;
          this.pinlun = '';
        })
      })


    } else {
      this.showAlert("购买此专栏后才能进行评论哦！");
    }
  }
  dianzan(idx,id) {
    var ketanpinlunlist = this.ketanpinlunlist;
    var api = this.jigouApi;

    api.pinlundianzan({
      zaixianpinlun_id: id
    }).then((res) => {
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
      this.ketanpinlunlist = ketanpinlunlist;

    })

  }
  huifudianzan(idx,id) {
    var ketanpinlunlist = this.ketanpinlunlist;
    var api = this.jigouApi;

    api.pinlunhuifudianzan({
      zaixianpinlun_id: id
    }).then((res) => {
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
      this.ketanpinlunlist = ketanpinlunlist;

    })

  }
  ksbf(e) {
    console.log("开始播放了");
    this.spbf = true;
    console.log(e);
  }
  jsbf(e) {
    console.log("结束播放了");

    this.spbf = false;
    console.log(e);
  }
  bfjs(e) {
    var danqian = this.danqianzhanjie;
    var zhanjie = this.zhanjie;
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
      this.showAlert("购买后观看完整版视频");

      return

    }

    this.danqianzhanjie = zhanjie[idx + 1];

    nextTick(() => {

      setTimeout(() => {
        this.shipin.play();

      }, 500)
    });




  }
}
