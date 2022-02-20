export class ApiConfig {

  static GetApiUrl() {
    return "https://tthxb.artxb.cn/api/";
  }
  static GetUploadPath() {
    return "https://tthxboss.oss-cn-shenzhen.aliyuncs.com/";
  }
  static GetFileUploadAPI() {
    return "https://tthxb.artxb.cn/fileupload";
  }

  static GetHeader() {
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'UNICODE': ApiConfig.UNICODE,
      'TOKEN': ApiConfig.TOKEN
    };
    return headers;
  }
  static UNICODE = "";
  static SetUnicode(unicode) {
    ApiConfig.UNICODE = unicode;
  }
  static TOKEN = "";
  static SetToken(token) {
    ApiConfig.TOKEN = token;
  }

  static showLoadingCounter = 0;
  static ShowLoading = function () {
    return;
    if (ApiConfig.showLoadingCounter == 0) {
      wx.showLoading({
        title: '加载中',
      });
    }
    ApiConfig.showLoadingCounter = ApiConfig.showLoadingCounter + 1;
  }

  static CloseLoading = function () {
    return;
    ApiConfig.showLoadingCounter = ApiConfig.showLoadingCounter - 1;
    if (ApiConfig.showLoadingCounter == 0) {
      console.log(ApiConfig.showLoadingCounter);
      wx.hideLoading();
    }
  }




}