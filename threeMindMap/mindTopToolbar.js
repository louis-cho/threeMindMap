import { mindTopViewMode } from "./mindTopViewMode.js";
import { mindTopViewEdit } from "./mindTopViewEdit.js";
import { mindTopViewExtra } from "./mindTopViewExtra.js";
export class mindTopToolBar {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        $(this._div).tooltip({
            items: ":hover"
        });

        this._div_topViewMode = document.getElementById(name + '_topViewMode');

        this._div_topViewEdit = document.getElementById(name + '_topViewEdit');

        this._div_topViewExtra = document.getElementById(name + '_topViewExtra');


        this._viewMode = true;
        this._viewEdit = true;
        this._viewExtra = true;

        
        this._topViewMode = new mindTopViewMode(this._name, this._app, this._div_topViewMode);
         
        this._topViewEdit = new mindTopViewEdit(this._name, this._app, this._div_topViewEdit);
         
        this._topViewExtra = new mindTopViewExtra(this._name, this._app, this._div_topViewExtra);
        
    }

    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div class='mindUI_topToolbarPanel' id='" + name + "_topViewMode'></div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_topToolbarSplitter'></div>";
        idx++;

        ihtml[idx] = "<div class=mindUI_topToolbarPanel' id='" + name + "_topViewEdit'></div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_topToolbarSplitter'></div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_topToolbarPanel' id='" + name + "_topViewExtra'></div>";
        idx++;

        return ihtml.join("");
    }

    UpdateToolbarState() {

        this._div_topViewMode.style.display = this._viewMode ? "" : "none";
        this._div_topViewEdit.style.display = this._viewEdit ? "" : "none";
        this._div_topViewExtra.style.display = this._viewExtra ? "" : "none";
    }

    UpdateShowViewMode(show) {
        this._viewMode = show;
        this._app.UpdateUIState();
        this._app.OnResize();
    }

    UpdateShowViewEdit(show) {
        this._viewEdit = show;
        this._app.UpdateUIState();
        this._app.OnResize();
    }

    UpdateShowViewExtra(show) {
        this._viewExtra = show;
        this._app.UpdateUIState();
        this._app.OnResize();
    }
}