// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JigouApi
} from "../../apis/jigou.api.js";
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
  }
  onMyShow() {
    var that = this;
  var api=new JigouApi();
  var nian=new Date();
    nian = nian.getFullYear();

  console.log("哈哈哈哈");
    api.xueyuanlist({},(xueyuan)=>{
      xueyuan.map((item)=>{
        console.log(Number(item.shengri.substring(0, 4)));
        console.log(Number(nian))
        item.sui = Number(nian) - Number(item.shengri.substring(0,4))+1;
        item.sj0 = item.shouji.substring(0,3);
        item.sj1 = item.shouji.substring(3,7);
        item.sj2 = item.shouji.substring(7,11);
      })
      this.Base.setMyData({ xueyuanlist: xueyuan})
    })

  }
  studentinfo(e){
   
    wx.navigateTo({
      url: '/pages/studentinfo/studentinfo?id=' + e.currentTarget.dataset.id,
    })
  }
  tianjia(){
    wx.navigateTo({
      url: '/pages/studentinfo/studentinfo',
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.studentinfo = content.studentinfo;
body.tianjia = content.tianjia;
Page(body)