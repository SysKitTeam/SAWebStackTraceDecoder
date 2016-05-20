module Base
{
    export class Decoder
    {
        private _button: Wrapper;
        private _encoded: Wrapper;
        private _decoded: Wrapper;

        constructor()
        {
            var that = this;

            this._button = wrap('#decodeButton');
            this._encoded = wrap('#encoded');
            this._decoded = wrap('#decoded');

            this._button.on('click', () =>
            {
                that.buttonClick();
            });
        }

        private buttonClick()
        {
            if (!this._button.hasClass('disabled'))
            {
                var that = this;

                this._decoded.val('');
                this._button.addClass('disabled');
                this._encoded.disabled(true);
                this._button.html('Please wait...');

                var params =
                {
                    Input: this._encoded.val()
                };

                var success = (response: string) =>
                {
                    that._decoded.val(response);

                    that._button.html('Decode >');
                    that._button.removeClass('disabled');
                    that._encoded.disabled(false);
                }

                var request = new Utils.AjaxRequest('Home/Decode', params, success, success);
                request.send();
            }
        }
    }
}

new Base.Decoder();