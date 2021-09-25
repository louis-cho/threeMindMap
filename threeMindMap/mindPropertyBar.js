export class mindPropertyBar {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);
    }

    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        // div´Â 4°³·Î

        /*
         a: view type
         b: topic style
         c: text style
         d: branch style
         */

        let ihtml[idx] = "<div class='mindUI_Property_Area'></div>";

        return ihtml.join("");
    }
}