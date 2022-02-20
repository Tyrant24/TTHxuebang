import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';
import { InstApi } from 'src/providers/inst.api';

@Component({
  selector: 'app-videopurcsucc',
  templateUrl: './videopurcsucc.page.html',
  styleUrls: ['./videopurcsucc.page.scss'],
  providers:[MemberApi,JigouApi,InstApi]
})
export class VideopurcsuccPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi,
    public elementRef:ElementRef,
    public instApi:InstApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
      
  }
  kechenlist=[];
  remenkechen=[];
  mianfeikechen=[];
  onMyShow() {
    var that = this;
    var instapi = this.instApi;

    var jigouapi = this.jigouApi;
    jigouapi.zaixiankechenlist({}).then((zaixiankechen) => {
      var remenkechen = zaixiankechen.filter(item => item.ishot_value == 'Y');
      var mianfeikechen = zaixiankechen.filter(item => item.isfree_value == 'Y');
      this.kechenlist=zaixiankechen;
      this.remenkechen=remenkechen;
      this.mianfeikechen=mianfeikechen;
    })
  }
  tohome() {
    this.backToUrl("/tabs/tab1");
  }
  lijixuexi(){
    this.backToUrl( '/pages/ketangdetails/ketangdetails?id='+this.params.id);
  }

  kechenxianqin(id) {
    this.backToUrl( '/pages/ketangdetails/ketangdetails?id='+id);

  }
}
