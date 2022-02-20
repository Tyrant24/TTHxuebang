// pages/xuanzedizhi/xuanzedizhi.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  JifenApi
} from "../../apis/jifen.api.js";
import {
  AddressApi
} from "../../apis/address.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '选择地址',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ show: false, jifen: this.Base.options.interral, kong: false, type:this.Base.options.type})
  }
  onMyShow() {
    var that = this; 



    var addressapi = new AddressApi();
    
    addressapi.addresslist({ member_id:this.Base.getMyData().memberinfo.id   }, (addresslist) => {
      this.Base.setMyData({ addresslist })
    })

  }


  bindcheck(e){
    var id=e.currentTarget.id;

    this.Base.setMyData({ check: id})

  }

  addressmanage(e) {
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/addressmanage/addressmanage?xiugai=1&id=' + id,
    })
  }

  addnew(e){
    
    wx.navigateTo({
      url: '/pages/addressmanage/addressmanage',
    })
  }
  queren(e){
    var jifen = this.Base.options.interral;


    var jifenapi = new JifenApi();
    jifenapi.commodityinfo({ id: this.Base.options.id }, (info) => {

      this.Base.setMyData({ info })

    })
    

  

    var shuliang = this.Base.options.shuliang;
    if(this.Base.getMyData().check==null){
      this.Base.toast("请选择地址");
      return;
    }
    
    this.Base.setMyData({
      show: true, xiaofei: jifen * shuliang
    })

  }
  quedin(e){
    
    console.log(this.Base.getMyData().info.inventory);
    //return;

    if (this.Base.getMyData().info.inventory == 0) {
      wx.showToast({
        title: '库存不足，无法兑换',
        icon: 'none'
      })
      this.Base.setMyData({ show: false})
      return;
    }

    console.log("成功");

//return;
    var inventory = this.Base.options.inventory;

    var jifen = this.Base.options.interral;
    var shuliang=this.Base.options.shuliang;

    var myjifen = e.currentTarget.id;
    var img=this.Base.options.img;

    console.log(img);
    //return;

    var shanpin=this.Base.options.name;

    var shengyu = myjifen - jifen * shuliang;

    var zonger = jifen * shuliang;

    

    console.log(shengyu + "剩余");
    if (parseInt(jifen) > parseInt(myjifen)){
      this.Base.setMyData({ kong: true});
      return;
    }
    //return;
    var jifenapi = new JifenApi();

    var addressapi = new AddressApi();

    addressapi.addressinfo({
      id: this.Base.getMyData().check
    }, (info) => {


      jifenapi.addjifenorder({ 
        member_id:this.Base.getMyData().memberinfo.id,
        jifen: zonger,
        danjia:jifen,
        img:img,
        shuliang: shuliang,
        name:shanpin,
        orderstatus:"A",
        consignee: info.name,
        mobile: info.phonenumber,
        address:info.region+info.address,
        orderid:'1234567891011',
        status:"A"
       }, (addjifenorder) => {


         var jifenapi = new JifenApi();
         
         jifenapi.deduction({ member_id: this.Base.getMyData().memberinfo.id, goods_id: this.Base.options.id }, (deduction)=>{
           this.Base.setMyData({ deduction })
         })


         //console.log(addjifenorder.return+"阿");
        // return;

         jifenapi.updatekucun({ id: this.Base.options.id, inventory: inventory - shuliang }, (updatekucun) => {
           this.Base.setMyData({ updatekucun })
         })

         jifenapi.updatejifen({ id: this.Base.getMyData().memberinfo.id, integral: shengyu }, (updatejifen) => {
           this.Base.setMyData({ updatejifen, tanchuan: 2, show: false })
           this.onMyShow();
           wx.redirectTo({
             url: '/pages/yiduihuang/yiduihuang?id=' + addjifenorder.return+'&shopid='+this.Base.options.id,
           })
         })

         this.Base.setMyData({ addjifenorder })

      })

      this.Base.setMyData({
        info
      })
    })




    


     
   
  }
  quxiao(e) {
    this.Base.setMyData({
      show: false
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.addressmanage = content.addressmanage; 
body.addnew = content.addnew; 
body.queren = content.queren; 
body.quxiao = content.quxiao; 
body.quedin = content.quedin; 

body.bindcheck = content.bindcheck; 
Page(body)