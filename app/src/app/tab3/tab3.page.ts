import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { JigouApi } from 'src/providers/jigou.api';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[MemberApi,JigouApi]
})
export class Tab3Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public jigouApi:JigouApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
      
  }
  onMyShow() {
    var that = this;


  }

  todetails(name){
    var pagename="";
    if (name == "jfsc") {
      pagename="shopmall";
    }
    // if (name == "yhq") {
    //   wx.navigateTo({
    //     url: '/pages/myorder/myorder',
    //   })
    // }
    if(name=="dd"){
      pagename="myorder";
    }
    if (name == "dz") {
      pagename="address";
    }
    if (name == "xx") {
      pagename="mymessage";
    }
    if (name == "wt") {
      pagename="problem";
    }
    if (name == "sc") {
      pagename="mycollect";
    }
    if (name == "wm") {
      pagename="aboutus";
    }
    if (name == "jg") {
      pagename="addmechanism";
    }
    if (name == "tg") {
      pagename="promotion";
    }

    this.navigate(pagename);
  
  }
}
