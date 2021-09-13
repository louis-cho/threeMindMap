export class mindTopViewExtra {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(this._name);
    }

    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table class='mindUI_topToolbarTab'><tr>";
        idx++;

        ihtml[idx] = "<td><button title='Export' id='" + name + "_edit_export' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>Export</td>";
        idx++;

        ihtml[idx] = "</tr></table>";
        idx++;

        return ihtml.join("");}
}