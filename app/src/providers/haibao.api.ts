import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class HaibaoApi {

    constructor(public http: Http) {

    }


    public haibao(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'haibao/haibao';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                if (ApiConfig.DataLoadedHandle('haibao/haibao', data, res)) {
                    if (showLoadingModal) {
                        ApiConfig.DimissLoadingModal();
                    }
                    if (res==null) {
                        return null;
                    }
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .catch(err => {
                if (showLoadingModal) {
                    ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('haibao/haibao', data, err);
            });
    }


    public haibao1(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'haibao/haibao1';
        var headers = ApiConfig.GetHeader(url, data);
        let options = new RequestOptions({ headers: headers });
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                if (ApiConfig.DataLoadedHandle('haibao/haibao1', data, res)) {
                    if (showLoadingModal) {
                        ApiConfig.DimissLoadingModal();
                    }
                    if (res==null) {
                        return null;
                    }
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .catch(err => {
                if (showLoadingModal) {
                    ApiConfig.DimissLoadingModal();
                }
                return ApiConfig.ErrorHandle('haibao/haibao1', data, err);
            });
    }

}
