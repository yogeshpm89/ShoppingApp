import { HttpInterceptor, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { AppConstant } from '../constants/app-constant';
import { TokenService } from '../services/token.service';
import { Inject } from '@angular/core';


class ResponseCache {

    cache = {};

    get(req: HttpRequest<any>): HttpResponse<any> | null {
        return this.cache[req.url];
    }

    put(req: HttpRequest<any>, resp: HttpResponse<any>): HttpResponse<any> | null {
        this.cache[req.url] = resp;
        return null;
    }
}

export class Interceptor implements HttpInterceptor {
    cachingUrls = [];
    cache: ResponseCache = new ResponseCache();

    constructor(
        @Inject(TokenService) private loginTokenService: TokenService
    ) {
        // this.cachingUrls.push(AppConstant.REMOTE_API.MESSAGES);
    }
    intercept(req: import("@angular/common/http").HttpRequest<any>,
        next: import("@angular/common/http").HttpHandler):
        import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        // throw new Error("Method not implemented.");

        const started = Date.now();
        let url = req.url;
        if (!req.url.startsWith('.')) {
            url = AppConstant.SERVER_URL + req.url;
            const cachedResponse = this.cache.get(req);

            let headers = req.headers;
            const token = this.loginTokenService.getToken();
            if (token) {
              headers = headers.set('user-key', this.loginTokenService.getToken());
            }
            const request = req.clone({
                url: url,
                headers: headers,
                body: req.body
            });

            return next.handle(request);
            // .do(
            //     event => {

            //         if (event instanceof HttpResponse) {
            //             const elapsed = Date.now() - started;
            //             console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
            //             const index = this.cachingUrls.findIndex(function (item) {
            //                 return item.endsWith(req.url);
            //             });

            //             if (index > -1) {
            //                 console.log(req.url + ' cached');
            //                 this.cache.put(req, event);
            //             }
            //         } else {
            //             switch (event.type) {
            //                 case HttpEventType.Sent:
            //                     break;
            //                 case HttpEventType.UploadProgress:
            //                     break;
            //                 case HttpEventType.ResponseHeader:
            //                     break;
            //                 case HttpEventType.DownloadProgress:
            //                     break;
            //                 case HttpEventType.User:
            //                     break;
            //             }
            //         }
            //     },
            //     error => {
            //         if (error.status === 0) {
            //         }

            //         if (error.status === 500) {
            //         }

            //         // if service is unavailable
            //         if (error.status === 503) {
            //         }

            //         if (error.status === 401) {
            //         }


            //         // License expired error code 403
            //         if (error.status === 403) {
            //         }

            //         if (error.status === 406) {
            //         }
            //     }
            // );

        }
    }
}
