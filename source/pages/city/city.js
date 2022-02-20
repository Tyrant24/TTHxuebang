// pages/city/city.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();
    var memberapi = new MemberApi();
    
    this.Base.setMyData({CurrentName:AppBase.CITYNAME});
	var address=this.Base.getMyData().address;
      var citycode = address.ad_info.adcode.substr(0, 4) + "00";
      this.Base.setMyData({ locationCityCode: citycode});
    memberapi.usecitylist({},(usecitylist)=>{
      this.Base.setMyData({ usecitylist: usecitylist });
    });
  }
  setCity(e){
    var id=e.currentTarget.id;
    var memberinfo=this.Base.getMyData().memberinfo;
    var citylist=memberinfo.citylist;
    for(var i=0;i<citylist.length;i++){
      if(id==citylist[i].id){
        AppBase.CITYID = citylist[i].id;
        AppBase.CITYNAME = citylist[i].name;
        AppBase.CITYSET = true;
        var memberapi = new MemberApi();
        memberapi.usecity({
          city_id: AppBase.CITYID
        });
      }
    }
    
    wx.navigateBack({
      
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.setCity = content.setCity;
Page(body)