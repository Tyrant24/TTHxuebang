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
  PingjiaApi
} from "../../apis/pingjia.api.js";
import {
  PingceApi
} from "../../apis/pingce.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id = 1;
    super.onLoad(options);
    this.Base.setMyData({
      check: true
    });



  }


  onMyShow() {
    var that = this;
    this.Base.setMyData({
      count: 0,
      count2: 0,
      count3: 0,
      countTimer: null,
      countTimer2: null,
      countTimer3: null
    });
    this.drawProgressbg();
    this.countInterval();

    this.drawProgressbg2();
    this.countInterval2();

    this.drawProgressbg3();
    this.countInterval3();

    var pingceapi = new PingceApi();
    pingceapi.indexinfo({
      id: this.Base.options.id
    }, (info) => {

      console.log(info.yidong + "啦啦啦")

      this.Base.setMyData({
        info,
        yd: parseFloat(info.yidong).toFixed(1),
        zq: parseFloat(info.zhunque).toFixed(1),
        sy: parseFloat(info.shiyon).toFixed(1)
      });

    });


    pingceapi.mypingcelist({}, (mypingcelist) => {
      this.Base.setMyData({
        mypingcelist
      })
    })


  }


  drawProgressbg() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')

    console.log("滴滴滴滴");
    console.log(ctx);
    console.log("滴滴滴滴");

    ctx.setLineWidth(6); // 设置圆环的宽度
    ctx.setStrokeStyle('#C0D0FF'); // 设置圆环的颜色
    ctx.setLineCap('stroke') // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(45, 45, 35, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  }

  drawCircle(step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0.1", "#C0D0FF");
    gradient.addColorStop("0.5", "#5F52A0");
    gradient.addColorStop("1.0", "#C0D0FF");

    context.setLineWidth(6);
    context.setStrokeStyle(gradient);
    context.setLineCap('stroke')
    context.beginPath();

    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(45, 45, 35, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  }

  countInterval() {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    var pingceapi = new PingceApi();
    pingceapi.indexinfo({
      id: this.Base.options.id
    }, (info) => {

      var zq = parseFloat(info.zhunque);

      console.log(zq + "共和国")
      var jindu = (zq / 5) * 60;
      console.log(jindu + "巅峰");

      this.countTimer = setInterval(() => {
        if (this.data.count <= jindu) {
          /* 绘制彩色圆环进度条  
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */
          this.drawCircle(this.data.count / (60 / 2))
          this.data.count++;
        } else {
          clearInterval(this.countTimer);
        }
      }, 10)


    });
  }

  drawProgressbg2() {
    console.log("顶1");
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx2 = wx.createCanvasContext('canvasProgressbg2')

    console.log("顶1");
    console.log(ctx2);
    console.log("顶1");

    ctx2.setLineWidth(6); // 设置圆环的宽度
    ctx2.setStrokeStyle('#C0D0FF'); // 设置圆环的颜色
    ctx2.setLineCap('stroke') // 设置圆环端点的形状
    ctx2.beginPath(); //开始一个新的路径
    ctx2.arc(45, 45, 35, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx2.stroke(); //对当前路径进行描边
    ctx2.draw();
  }

  drawCircle2(step2) {
    var context2 = wx.createCanvasContext('canvasProgress2');
    // 设置渐变
    var gradient2 = context2.createLinearGradient(200, 100, 100, 200);
    gradient2.addColorStop("0.1", "#C0D0FF");
    gradient2.addColorStop("0.5", "#5F52A0");
    gradient2.addColorStop("1.0", "#C0D0FF");

    context2.setLineWidth(6);
    context2.setStrokeStyle(gradient2);
    context2.setLineCap('stroke')
    context2.beginPath();

    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context2.arc(45, 45, 35, -Math.PI / 2, step2 * Math.PI - Math.PI / 2, false);
    context2.stroke();
    context2.draw()
  }

  countInterval2() {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    var pingceapi = new PingceApi();
    pingceapi.indexinfo({
      id: this.Base.options.id
    }, (info) => {

      var sy = parseFloat(info.shiyon);

      console.log(sy + "共和国")
      var jindu = (sy / 5) * 60;
      console.log(jindu + "巅峰");

      this.countTimer2 = setInterval(() => {
        if (this.data.count2 <= jindu) {
          /* 绘制彩色圆环进度条  
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */
          this.drawCircle2(this.data.count2 / (60 / 2))
          this.data.count2++;
        } else {
          clearInterval(this.countTimer2);
        }
      }, 10)


    });
  }


  drawProgressbg3() {
    console.log("顶1");
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx3 = wx.createCanvasContext('canvasProgressbg3')

    console.log("顶1");
    console.log(ctx3);
    console.log("顶1");

    ctx3.setLineWidth(6); // 设置圆环的宽度
    ctx3.setStrokeStyle('#C0D0FF'); // 设置圆环的颜色
    ctx3.setLineCap('stroke') // 设置圆环端点的形状
    ctx3.beginPath(); //开始一个新的路径
    ctx3.arc(45, 45, 35, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx3.stroke(); //对当前路径进行描边
    ctx3.draw();
  }

  drawCircle3(step3) {
    var context3 = wx.createCanvasContext('canvasProgress3');
    // 设置渐变
    var gradient3 = context3.createLinearGradient(200, 100, 100, 200);
    gradient3.addColorStop("0.1", "#C0D0FF");
    gradient3.addColorStop("0.5", "#5F52A0");
    gradient3.addColorStop("1.0", "#C0D0FF");

    context3.setLineWidth(6);
    context3.setStrokeStyle(gradient3);
    context3.setLineCap('stroke')
    context3.beginPath();

    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context3.arc(45, 45, 35, -Math.PI / 2, step3 * Math.PI - Math.PI / 2, false);
    context3.stroke();
    context3.draw()
  }

  countInterval3() {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈

    var pingceapi = new PingceApi();
    pingceapi.indexinfo({
      id: this.Base.options.id
    }, (info) => {

      var yd = parseFloat(info.yidong);

      console.log(yd + "昆仑决")
      var jindu = (yd / 5) * 60;
      console.log(jindu + "法规");

      this.countTimer3 = setInterval(() => {
        if (this.data.count3 <= jindu) {
          /* 绘制彩色圆环进度条  
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */
          this.drawCircle3(this.data.count3 / (60 / 2))
          this.data.count3++;
        } else {
          this.setData({
            progress_txt: "匹配成功"
          });
          clearInterval(this.countTimer3);
        }
      }, 10)


    });

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



  todati(e) {
    var id = e.currentTarget.id;
    //console.log(id+"所属");
    var pcid = e.currentTarget.dataset.pc_id;
    //console.log(pcid + "题目id");
    var pingceapi = new PingceApi();
    var mypingcelist = this.Base.getMyData().mypingcelist;

    if (mypingcelist.length == 0) {
      console.log("电风扇");
    } else {

     var a=  mypingcelist.filter((item,idx)=>{
       return item.pingce_id == pcid & item.member_id==id
      })
      
   console.log(a,"嗷嗷");
   //return

      if (a.length > 0) {
        wx.navigateTo({
          url: '/pages/pingcedati/pingcedati?id=' + this.Base.options.id + '&upid=' + this.Base.options.pcid
        })
      }

     else {
        console.log("先增再跳000000");
        var pingceapi = new PingceApi();
        pingceapi.addpingce({
          member_id: id,
          pingce_id: pcid,
          status: "A",
          dati_status: "N"
        }, (addpingce) => {
          
          console.log(addpingce.return,"滴滴");
          
          wx.navigateTo({
            url: '/pages/pingcedati/pingcedati?id=' + this.Base.options.id + '&upid=' + addpingce.return
          })
          this.Base.setMyData({
            addpingce
          })
        })
      }


    }

 


  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.check = content.check;
body.todati = content.todati;

body.drawProgressbg = content.drawProgressbg;
body.drawCircle = content.drawCircle;
body.countInterval = content.countInterval;

body.drawProgressbg2 = content.drawProgressbg2;
body.drawCircle2 = content.drawCircle2;
body.countInterval2 = content.countInterval2;

body.drawProgressbg3 = content.drawProgressbg3;
body.drawCircle3 = content.drawCircle3;
body.countInterval3 = content.countInterval3;

Page(body)