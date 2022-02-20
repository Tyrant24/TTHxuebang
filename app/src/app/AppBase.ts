import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { NavController, ModalController, ToastController, NavParams, AlertController }
    from "@ionic/angular";
import { InstApi } from "../providers/inst.api";
import { MemberApi } from "../providers/member.api";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { ViewController } from '@ionic/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';


export class AppBase implements OnInit {
    public needlogin = false;

    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static CurrentNav: NavController = null;

    public static myapp: AppComponent = null;
    public static instapi: InstApi = null;
    public static memberapi: MemberApi = null;
    public static UNICODE = "tthxb";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static InstInfo = null;
    public static MemberInfo=null;
    public InstInfo = {tel:"", h5appid: "", kf: "", openning: "", successtips: "", orderneedknow: "", name: "", logo: "", memberlogo: "", undershipping: 0, shippingfee: 0, about1: "", about2: "", about3: "", about4: "", about5: "" };
    public MemberInfo = { avatarUrl: "", nickName: "" };
    public static MYBABY = [];
    public mybaby = [];
    public options = null;
    public params: Params = null;

    public firseonshow = true;
    public scrolltop = 0;
    public headerscroptshow = 0;

    static Current = null;
    currentpage = "";


    public constructor(
        public router: Router,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public activeRoute: ActivatedRoute) {

        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];

        var memberinfo=window.sessionStorage.getItem("memberinfo");
        if(memberinfo!=null){
            AppBase.MemberInfo=JSON.parse(memberinfo);
        }
    }
    setStatusBar() {
        //  this.statusBar.styleLightContent();
    }
    ngOnInit() {

        ApiConfig.SetUnicode(AppBase.UNICODE);
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();
    }
    onMyLoad() {
    }
    getInstInfo() {
        if (AppBase.InstInfo == null) {
            AppBase.instapi.info({}, false).then((instinfo) => {
                AppBase.InstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo);
                
                if(this.params.code!=undefined&&this.params.state=='123'){

                }else{
                    if(AppBase.MemberInfo==null){
                        var redirecturl=encodeURIComponent(window.location.href);
                        var redurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.InstInfo.h5appid + "&redirect_uri="+redirecturl+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
                        console.log({redurl});
                        //window.location.href=redurl;
                    }
                }
            });
        } else {
            this.InstInfo = AppBase.InstInfo;
        }
    }
    getMemberInfo() {

        AppBase.memberapi.info({}).then((memberinfo) => {
            if (memberinfo == null || memberinfo.mobile == undefined || memberinfo.mobile == "") {
                //alert("?");
                memberinfo = null;
            }
            this.MemberInfo = memberinfo;

        });
    }
    getResources() {
        if (AppBase.Resources == null) {
            AppBase.instapi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }
    ionViewDidEnter() {
        
        if(AppBase.MemberInfo==null){
            //
            if(this.params.code!=undefined&&this.params.state=='123'){
                AppBase.memberapi.getuserinfo({h5:"Y",code:this.params.code,grant_type:"authorization_code"}).then((memberinfo)=>{
                    memberinfo.h5openid=memberinfo.openid;
                    AppBase.MemberInfo=memberinfo;
                    this.MemberInfo=memberinfo;

                    window.sessionStorage.setItem("memberinfo",JSON.stringify(this.MemberInfo));

                    ApiConfig.SetToken(memberinfo.h5openid);
                    ApiConfig.SetTokenKey(memberinfo.unionid);
                    AppBase.memberapi.updateh5(memberinfo).then((res)=>{
                        this.onMyShow();
                    });
                    
                });
            }else{
                //alert("看到这个就是逻辑出大问题了");
            this.onMyShow();
            }
        }else{

            this.MemberInfo=AppBase.MemberInfo;
            this.onMyShow();
        }
        

    }

    onMyShow() {

    }
    onPullRefresh(ref) {
        this.onMyShow();
        ref.complete();
    }
    doRefresh(ref) {
        this.onPullRefresh(ref);
        // setTimeout(() => {
        //     ref.complete();
        // }, 1000);
    }
    onLoadMoreRefresh(ref) {
        ref.complete();
    }
    doInfinite(infiniteScroll) {
        this.onLoadMoreRefresh(infiniteScroll);
        // setTimeout(() => {
        //   infiniteScroll.complete();
        // }, 1000);
    }
    isbacking = false;
    back() {
        if (this.isbacking == true) {
            return;
        }
        this.isbacking = true;
        //alert(this.Params.fromtab);
        if (this.params.fromtab != undefined) {
            this.navCtrl.navigateBack('tabs/' + this.params.fromtab);
        } else {
            this.navCtrl.back();
        }
    }
    backToUrl(url) {
        this.navCtrl.navigateBack(url);
    }
    close(data) {
        this.modalCtrl.dismiss(data);
    }
    returnData(data) {
        this.modalCtrl.dismiss(data);
    }
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}, checkLogin = false) {
        if (checkLogin == true) {
            if (this.MemberInfo == null) {
                this.navigate("mobilelogin");
                return;
            }
        }
        this.router.navigate([pagename], { queryParams: param });

    }
    async showModal(pageobj, param = {}, callback = null) {
        var modal = await this.modalCtrl.create({
            component: pageobj,
            componentProps: param
        });
        await modal.onDidDismiss().then((data) => {
            if (callback != null) {
                callback(data);
            }
        });
        await modal.present();
    }

    showContent(title, key) {
        this.navigate("content", { title, key });
        //this.showModal("ContentPage", { title, key });
    }

    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    async toast(msg) {
        if (msg == "") {
            return;
        }
        console.log(((msg.length / 3) + 1) * 1000);
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: ((msg.length / 3) + 1) * 500
        });
        toast.present();
    }
    async showAlert(msg) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: ["知道了"]
        });
        alert.present();
    }
    async showConfirm(msg, confirmcallback) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: [{
                text: "取消",
                handler: () => {
                    console.log('Disagree clicked');

                    confirmcallback(false);
                }
            }, {
                text: "好的",
                handler: () => {
                    confirmcallback(true);
                }
            }]
        });
        alert.present();
    }
    async checkLogin(callback) {

    }

    async showActionSheet(actionSheetController, header, buttons) {
        const actionSheet = await actionSheetController.create({
            header: header,
            buttons: buttons
        });
        await actionSheet.present();
    }
    hasLogin() {
        return this.MemberInfo != null;
    }
    logout() {
        window.localStorage.removeItem("UserToken");
        this.MemberInfo = null;
    }
    store(name, value = null) {
        if (value == null) {
            return window.localStorage.getItem(name);
        } else {
            window.localStorage.setItem(name, value);
            return "";
        }
    }

    splitRow(content) {
        return content.split("\n");
    }

    getMemberPhoto(photo: string) {
        if (photo == null || photo == undefined || photo.trim() == "") {
            return this.uploadpath + "inst/" + this.InstInfo.logo;
        } else {
            return this.uploadpath + "member/" + photo;
        }
    }

    logScrollStart() {
        console.log("logScrollStart");
    }
    logScrolling(e) {
        console.log(e);
        this.scrolltop = e.detail.scrollTop;
    }
    logScrollEnd() {
        console.log("logScrollEnd");
    }
    gotoDiv(id) {
        var target = document.querySelector('#' + id);
        target.scrollIntoView();
    }

    tryLogin() {
        this.showModal("MobileloginPage", {});
    }
}