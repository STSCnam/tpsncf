'use strict'

export class HTTP {
    static get(url, handler, opts = {}) {
        HTTP.request('GET', url, opts, handler);
    }

    static post(url, handler, opts = {}) {
        HTTP.request('POST', url, opts, handler);
    }

    static request(method, url, opts, handler) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let res = null;
                let err = null;

                if (xhr.status === 200) {
                    res = xhr.responseText;

                    try { res = JSON.parse(res); }
                    catch {}
                } else {
                    err = `Server responded with an ${xhr.status} status code.`;
                }

                handler(err, res);
            }
        }

        if (opts.headers) {
            for (let header in opts.headers) {
                xhr.setRequestHeader(header, opts.headers[header]);
            }
        }

        if (opts.body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send(null);
        }
    }
}