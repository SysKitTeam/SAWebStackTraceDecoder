module Utils
{
    export class AjaxRequest
    {
        private _xhr: XMLHttpRequest;
        private _data: FormData = null;
        private _aborted: boolean = false;
        private _params: string = null;

        private _onsuccess: (response: any) => void;
        private _onerror: (response: any) => void;

        constructor(url: string, params: { [key: string]: any; }, onsuccess: (response: any) => void = null, onerror: (response: any) => void = null)
        {
            var that = this;

            this._onsuccess = onsuccess;
            this._onerror = onerror;
            this._xhr = new XMLHttpRequest();
            this._params = JSON.stringify(params);

            this._xhr.open('POST', url, true);
            this._xhr.setRequestHeader('Content-Type', 'application/json');
            this._xhr.onload = function () { that.onresponse(); }
            this._xhr.onerror = function () { that.onresponse(); }
        }

        private onresponse()
        {
            var callback = this._xhr.status == 200 ? this._onsuccess : this._onerror;
            if (callback)
            {
                callback(this.toObjectOrString(this._xhr.responseText));
            }
        }

        private toObjectOrString(response: string): any
        {
            if (response)
            {
                try
                {
                    return JSON.parse(response);
                }
                catch (e)
                {
                }
            }

            return response;
        }

        public isAborted(): boolean
        {
            return this._aborted && this._xhr.readyState == 4;
        }

        public abort()
        {
            if (this._xhr.readyState != 4)
            {
                this._xhr.abort();
                this._aborted = true;
            }
        }

        public send()
        {
            this._xhr.send(this._params);
        }
    }
}