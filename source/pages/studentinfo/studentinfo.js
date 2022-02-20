// pages/content/content.js
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
  ApiUtil
} from "../../apis/apiutil.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '学员管理',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;

    super.onLoad(options);
    var myDate = new Date();

    var id = this.Base.options.id;
    if (id != undefined) {
      var api = new JigouApi();
      api.xueyuaninfo({ id: id }, (info) => {
        console.log(123132132);
        console.log(info);
        var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
        this.Base.setMyData({
          jintian: jintian, name: info.name, sex: info.sex, nianji: info.nianji, sjpiko: info.shouji, weixin: info.weixinhao, menpai: info.menpaihao, shouji: info.shouji, xssj: info.shengri, niubi: 1
        })

      })

    }
    else {

      var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
      this.Base.setMyData({
        jintian: jintian, name: '', sex: 'nan', nianji: '', xssj:'', sjpiko: '', weixin: '', menpai: '', shouji: '', niubi: 0
      })
    }
  }
  onMyShow() {
    var that = this;
    this.Base.getAddress((address) => {
      console.log(address);
      var region = [address.address_component.province, address.address_component.city, address.address_component.district];
      this.Base.setMyData({
        region, dizhi: region[0] + region[1] + region[2]
      });
      console.log(region[0] + region[1] + region[2]);
    });

  }
  studentinfo() {
    wx.navigateTo({
      url: '/pages/studentinfo/studentinfo',
    })
  }
  bindDateChange(e) {
    console.log(e);

    console.log(e.detail.value);

    var shijian = e.detail.value;
    var shijians = shijian.split("-");
    var xssj = (shijians[0] + ' 年 ' + shijians[1] + ' 月 ' + shijians[2] + ' 日 ');

    this.Base.setMyData({
      xssj: xssj
    })
  }
  name(e) {
    this.Base.setMyData({ name: e.detail.value })
  }
  sex(e) {

    this.Base.setMyData({ sex: e.currentTarget.dataset.id })
  }
  nianji(e) {
    this.Base.setMyData({ nianji: e.detail.value })
  }
  shouji(e) {
    this.Base.setMyData({ shouji: e.detail.value })
  }
  weixin(e) {
    this.Base.setMyData({ weixin: e.detail.value })
  }
  menpai(e) {
    this.Base.setMyData({ menpai: e.detail.value })
  }
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value, dizhi: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    })
  }
  baocun() {
    var api = new JigouApi();


    var name = this.Base.getMyData().name;
    var shouji = this.Base.getMyData().shouji;
    var xinbie = this.Base.getMyData().sex;
    var shenri = this.Base.getMyData().xssj;
    var nianji = this.Base.getMyData().nianji;
    var weixin = this.Base.getMyData().weixin;
    var dizhi = this.Base.getMyData().dizhi;
    var menpai = this.Base.getMyData().menpai;

    if (this.Base.options.id != undefined) {

      var iddd = this.Base.options.id;
      var json = {
        primary_id: iddd, name: name, sex: xinbie, shengri: shenri, nianji: nianji, shouji: shouji, weixinhao: weixin, dizhi: dizhi, menpaihao: menpai, status: 'A'
      }
    }
    else {
      var json = {
        name: name, sex: xinbie, shengri: shenri, nianji: nianji, shouji: shouji, weixinhao: weixin, dizhi: dizhi, menpaihao: menpai, status: 'A'
      }

    }


    if (name == '') {
      this.Base.info("请输入姓名");

      return

    }
    if (shouji == '') {
      this.Base.info("请输入手机");
      return

    }
    if (!ApiUtil.zhenze(shouji)) {
      this.Base.info("手机号格式不正确");
      return
    }
 
    if (shenri == '') {
      this.Base.info("请选择生日");

      return

    }
    api.addxueyuan(json, (res) => {
      if (res.code == '0') {
        wx.navigateBack({

        })
      }

    })

  }
  shanchu() {
    var that = this;
    wx.showModal({
      title: '',
      content: '确认删除学员？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          var api = new JigouApi();
          api.shanchuxueyuan({ id: that.Base.options.id }, (res) => {
            that.Base.setMyData({ res })
            wx.navigateBack({

            })
          })


        }
      }
    });



  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.studentinfo = content.studentinfo;
body.bindDateChange = content.bindDateChange;
body.name = content.name;
body.nianji = content.nianji;
body.sex = content.sex;
body.shouji = content.shouji;
body.weixin = content.weixin;
body.menpai = content.menpai;
body.bindRegionChange = content.bindRegionChange;
body.baocun = content.baocun;
body.shanchu = content.shanchu;
Page(body)