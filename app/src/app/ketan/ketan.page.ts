import { Component, ViewChild,ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { PurchaseApi } from 'src/providers/purchase.api';

@Component({
  selector: 'app-ketan',
  templateUrl: './ketan.page.html',
  styleUrls: ['./ketan.page.scss'],
  providers: [MemberApi, JigouApi,PurchaseApi]
})
export class KetanPage extends AppBase {

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
    public puchaseApi:PurchaseApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);

  }

  show= "all";
  wclist= [];
  dflist= [];
  type="";
  onMyLoad(){
    var type = "SP";
    console.log("那真的牛批" + type);
    if (type != undefined) {
      if (type == 'ygm') {
        var show = 'wc';
      }
      if (type == 'dfk') {
        var show = 'wait'
      }
      if (type == 'dsh') {
        var show = 'dsh';
      }
      if (type == 'dpj') {
        var show = 'dpj';
      }
      this.type=type;
      this.show=show;
    }


  }

  kechenxianqin(id) {
    this.navigate("ketaninfo",{id})
  }
  alllist=[];
  onMyShow() {
    var that = this;
    var api = this.puchaseApi;

    api.purchaselist({
      type: 'SP', sppp:1
    }).then( (alllist) => {

      this.alllist=alllist;
    });

  }

  bindshow(e) {
    var type = e.currentTarget.dataset.type;
    console.log(type);
    if (type == "all") {
      this.show="all";
    }
    if (type == "wc") {
      this.show="wc";
    }
    if (type == "df") {
      this.show="wait";
    }
    if (type == "dsh") {
      this.show="dsh";
    }
    if (type == "dpj") {
      this.show="dpj";
    }
  }

}
