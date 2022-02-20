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
      title: '推广规则',
    });
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var api = new JigouApi();
    var that = this;
  
    api.problemlist({ chanjin: 'tg' }, (problemlist)=>{
      this.Base.setMyData({ problemlist: problemlist})

    })

 

  }
  lijishenqin()
  {
    var api = new JigouApi();
    api.fenxiaoinfo({}, (res) => {
      console.log(res.length);
      if (res.length == 0) {
       wx.navigateBack({
         
       })
       return

      }
      if(res[0].status=='A')
      {
      this.Base.info("正在审核中哦");
      return
      }
      if (res[0].status == 'S') {
        this.Base.info("您已经是推广员了,无需申请");
      }

    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.lijishenqin = content.lijishenqin;
Page(body)