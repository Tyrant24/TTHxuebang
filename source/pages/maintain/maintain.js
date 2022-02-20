

import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { JigouApi } from "../../apis/jigou.api.js";
import { BaomaApi } from "../../apis/baoma.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.inmaintain=true;
    super.onLoad(options);
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var jigouapi = new JigouApi();



  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)