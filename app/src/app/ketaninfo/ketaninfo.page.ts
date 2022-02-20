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

@Component({
  selector: 'app-ketaninfo',
  templateUrl: './ketaninfo.page.html',
  styleUrls: ['./ketaninfo.page.scss'],
  providers: [MemberApi, JigouApi, PurchaseApi]
})
export class KetaninfoPage extends AppBase {

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
    public puchaseApi: PurchaseApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);

  }
  kecheninfo=null;
  onMyShow() {
    var api = this.puchaseApi;
    api.purchaseinfo({ id: this.params.id }).then((info) => {
      console.log(info);
      console.log(211213);
      this.kecheninfo= info ;
    })
    var that = this;
  }
  shipininfo() {
    this.navigate("ketangdetails",{id:this.kecheninfo.onlineclassroom_id})

  }
}
