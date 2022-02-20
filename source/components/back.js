// components/back.js

// pages/city/city.js
import { AppBase } from "../appbase";
import { ApiConfig } from "../apis/apiconfig";
import { InstApi } from "../apis/inst.api.js";
import { JigouApi } from "../apis/jigou.api.js";
import { MemberApi } from "../apis/member.api.js";

Component({
  /**
   * 组件的属性列表
   */


  /**
   * 组件的初始数据
   */
  data: {
    // 这里是一些组件内部数据
    
      uploadpath: ApiConfig.GetUploadPath(),
    fanhui: "dac0aaadca3af190f785b274dd20dca5_19070213051_1588711162.png"
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    shouye() {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  }
})
