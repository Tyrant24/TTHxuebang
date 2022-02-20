
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
      title: '收支明细',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new JigouApi();
    api.tgjilu({},(tgjilu)=>{
        var shouru=0;
       tgjilu.map((item)=>{
      
         
         shouru += Number(item.jiner);
       
         
          

       })
      
      this.Base.setMyData({ tgjilu, shouru: shouru});

    })
  }
 

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)