// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";
import {
  HaibaoApi
} from "../../apis/haibao.api.js";

import {
  MemberApi
} from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '大使中心',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ name: "", photo: "", yanzhenma: "", dizhi: "" })
  }
  ycmobile(str) {
    return str.substr(0, 3) + "****" + str.substr(7);
  }
  jisuanchaoshi(a, b) {
    var date1 = new Date();
    var date2 = new Date(a);
    var date3 = date1.getTime() - date2.getTime();
    var days = Math.floor(date3 / (24 * 3600 * 1000));

    return days < b;

  }
  onMyShow() {
    var api = new JigouApi();
    var that = this;
    var mobile = this.Base.getMyData().memberinfo.mobile;
    if (mobile != '') {
      this.Base.setMyData({ ycmobile: this.ycmobile(mobile) })
    }

    api.fenxiaoinfo({}, (res) => {
      console.log(res);
     
      console.log(res.length);
      this.Base.setMyData({ tuiguaninfo: res})
      if (res.length == 0) {
        this.Base.setMyData({ showModal: true, });
      }

    })
    var memberapi = new MemberApi();
    var leijikehu = [];
    var xiajituiguan = [];
    var shijian = this.Base.getMyData().instinfo.xiajishijian;
    memberapi.chakanxiaji({}, (xiaji) => {
      for (var i = 0; i < xiaji.length; i++) {
        
        leijikehu.push(xiaji[i]);
      }
      console.log("数据");
      console.log(leijikehu);
      console.log(xiajituiguan);
      this.Base.setMyData({ leijikehu: leijikehu.length, xiajituiguan: leijikehu.length, tuiguandindan: this.zhuandindan(leijikehu) })
    })


  }
  tuiguanguize() {
    wx.navigateTo({
      url: '/pages/tuiguanguize/tuiguanguize',
    })
  }
  hideModal() {
    this.Base.setMyData({ showModal: false });
  }
  name(e) {
    this.Base.setMyData({ name: e.detail.value })
  }
  photo(e) {
    this.Base.setMyData({ photo: e.detail.value })
  }
  yanzhenma(e) {
    this.Base.setMyData({ yanzhenma: e.detail.value })
  }
  dizhi(e) {
    this.Base.setMyData({ dizhi: e.detail.value })
  }
  queren() {
    var api = new JigouApi();
    var name = this.Base.getMyData().name;
    var photo = this.Base.getMyData().photo;
    var yanzhenma = this.Base.getMyData().yanzhenma;
    var dizhi = this.Base.getMyData().dizhi;
    console.log(name);
    console.log(photo);
    console.log(yanzhenma);
    console.log(dizhi);
    if (name == '') {
      this.Base.info("请填写真实姓名");
      return
    }
    if (photo == '') {
      photo = this.Base.getMyData().memberinfo.mobile;
    }
    if (yanzhenma == '') {
      this.Base.info("请输入验证码");
      return
    }
    if (dizhi == '') {
      this.Base.info("请输入地址");
      return
    }
    api.fenxiaoshenhe({ reainame: name, mobile: photo, dizhi: dizhi }, (res) => {

      if (res.code == '0') {
        this.Base.setMyData({ showModal: false });
        wx.navigateTo({
          url: '/pages/review/review',
        })
      }

    })


  }
  lijitixian() {

    wx.navigateTo({
      url: '/pages/tixian/tixian',
    })

  }
  mykehu() {
    if (this.Base.getMyData().leijikehu.length==0) {
      this.Base.info("暂无成功邀请的推广员，请先邀请好友成为推广员。")
      return
    }
    wx.navigateTo({
      url: '/pages/mykehu/mykehu',
    })
  }

  myinvite() {
    if (this.Base.getMyData().xiajituiguan.length == 0) {
      this.Base.info("暂无成功邀请的推广员，请先邀请好友成为推广员。")
      return
    }
    wx.navigateTo({
      url: '/pages/myinvite/myinvite',
    })
  }
  tuiguandindan() {
    wx.navigateTo({
      url: '/pages/tuiguandindan/tuiguandindan',
    })

  }
  yaoqin() {
    var api = new HaibaoApi;
      
    if (this.Base.getMyData().tuiguaninfo[0].status != 'S')
    {
        this.Base.info("您现在还不是推广员");

    }
     
    api.haibao({}, (res) => {
      console.log(res);
      if (res.code == 0) {
        wx.navigateTo({
          url: '/pages/yaoqinhaibao/yaoqinhaibao?name=' + res.return,
        })


      }
    })

  }
  zhuandindan(quanbu) {
    var dindan = [];

    quanbu.map((item) => {

      item.dindan.map((item1) => {
        dindan.push(item1)
      })

    })
    console.log("嚯嚯嚯");
    console.log(dindan);
    return dindan;

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.tuiguanguize = content.tuiguanguize;
body.hideModal = content.hideModal;
body.zhuandindan = content.zhuandindan;
body.ycmobile = content.ycmobile;
body.name = content.name;
body.photo = content.photo;
body.yanzhenma = content.yanzhenma;
body.dizhi = content.dizhi;
body.queren = content.queren;
body.lijitixian = content.lijitixian;
body.mykehu = content.mykehu;
body.myinvite = content.myinvite;
body.tuiguandindan = content.tuiguandindan;
body.yaoqin = content.yaoqin;
body.jisuanchaoshi = content.jisuanchaoshi;
Page(body)