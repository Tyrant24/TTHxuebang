import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { PurchaseApi } from 'src/providers/purchase.api';
import { WechatApi } from 'src/providers/wechat.api';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
declare let WeixinJSBridge: any;

@Component({
  selector: 'app-shipingoumai',
  templateUrl: './shipingoumai.page.html',
  styleUrls: ['./shipingoumai.page.scss'],
  providers: [MemberApi, JigouApi, PurchaseApi, WechatApi]
})
export class ShipingoumaiPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public jigouApi: JigouApi,
    public elementRef: ElementRef,
    public purchaseApi: PurchaseApi,
    public wechatApi: WechatApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);

  }
  onMyLoad() {
  }
  kecheninfo = null;
  onMyShow() {
    var that = this;
    var jigouapi = this.jigouApi;
    jigouapi.zaixiankecheninfo({ id: this.params.id }).then((kecheninfo) => {
      this.kecheninfo = kecheninfo

    })
  }
  youhuijuan() {
    this.showAlert("该功能暂未开放");
  }
  tijiao() {

    var json = {
      onlineclassroom_id: this.params.id, type: "SP"
    }

    var that = this;

    this.showConfirm('是否确认购买课程？',
      (confirm) => {
        if (confirm) {
          var api = this.purchaseApi;
          api.create(json).then((ret) => {
            if (ret.code == '0') {
              if (ret.return.pstatus == 'P') {
                // wx.navigateTo({
                //   url: '/pages/order/order' + ret.return.id,
                // })
                this.showAlert(ret.result);
                return;
              } else {

                var wechatapi = this.wechatApi;
                wechatapi.prepay3({ id: ret.return.id, h5: "Y" }).then((payret) => {
                  if (payret.code != 0) {

                    this.showAlert(payret.result);
                    return;
                  }

                  console.log(payret);
                  //wx.requestPayment(payret)

                  WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', payret,
                    (res) => {
                      if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        api.purchaseinfo({ id: ret.return.id }).then((res) => {
                          that.navigate("videopurcsucc", { id: res.onlineclassroom_id })
                        })
                      } else {
                        this.showAlert(res.errMsg);
                      }
                    });
                });
              }
            } else {
              this.showAlert(ret.result);
            }
          })
        }
      }
    )
  }

}
