// pages/pingjia/pingjia.js
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
      images: [], pingfen: 0, jgpingfen: 0, check:false
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();



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

  uploadimg() {
    var that = this;
    this.Base.uploadImage("pingjia", (ret) => {
      var images = that.Base.getMyData().images;
      images.push(ret);
      that.Base.setMyData({
        images
      });
    }, 6, undefined);
  }

  minusImg(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var images = that.Base.getMyData().images;
    var imgs = [];
    for (var i = 0; i < images.length; i++) {
      if (seq != i) {
        imgs.push(images[i]);
      }
    }
    that.Base.setMyData({
      images: imgs
    });
  }
  
  //课程评分
  bindkcpingfen(e) {          
    var fen = e.currentTarget.id;
    this.Base.setMyData({ pingfen:fen})

  }


  //机构评分
  bindjgpingfen(e) {           
    var jgfen = e.currentTarget.id;
    this.Base.setMyData({ jgpingfen: jgfen })
  }

  submit(e) {

    var that = this;
    var data = e.detail.value;

    var pingfen = this.Base.getMyData().pingfen; 
    console.log(pingfen+"课程评分");

    var jgpingfen = this.Base.getMyData().jgpingfen;
    console.log(jgpingfen + "机构评分");

    var text = data.text;
    console.log(text + "评分文字");

    if (this.Base.getMyData().check==false){
      this.Base.setMyData({niming:"N"})
    }else{
      this.Base.setMyData({ niming: "Y" })
    }
    var niming = this.Base.getMyData().niming;
    console.log(this.Base.getMyData().check + "是否匿名");
    console.log(niming + "是否匿名");

    if (data.text == null || data.text == "") {
      this.Base.info("请输入您的评价");
      return;
    }

    var img1 = that.Base.getMyData().images[0];
    var img2 = that.Base.getMyData().images[1];
    var img3 = that.Base.getMyData().images[2];
    var img4 = that.Base.getMyData().images[3];
    var img5 = that.Base.getMyData().images[4];
    var img6 = that.Base.getMyData().images[5];

    console.log(img1+"困了累了");
   // return;


    wx.showModal({
      title: '提交',
      content: '确认提交评价？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          var pingjiaapi = new PingjiaApi();

          pingjiaapi.addpingjia({
            member_id:that.Base.getMyData().memberinfo.id,
            kecheng_id: that.Base.options.id,
            pingfen: pingfen,
            content: text,
            img1: img1,
            img2, img2,
            img3, img3,
            img4, img4,
            img5, img5,
            img6: img6,
            niming: niming,
            status:"A"

          }, (addpingjia) => {
            that.Base.setMyData({
              addpingjia
            });
          });

          wx.reLaunch({
              url: '/pages/pingjiawanchen/pingjiawanchen',
          }),

            wx.showToast({
              title: '提交成功',
              mask: false
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
body.check = content.check;
body.minusImg = content.minusImg;
body.uploadimg = content.uploadimg;
body.submit = content.submit; 
body.bindjgpingfen = content.bindjgpingfen;
body.bindkcpingfen = content.bindkcpingfen;
Page(body)