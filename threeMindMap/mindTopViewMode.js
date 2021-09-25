export class mindTopViewMode {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._btnMindMap = document.getElementById(name + "_mind_map");

        this._btnOutliner = document.getElementById(name + "_outliner");

        mindTopViewMode.I = this;

        $(this._btnMindMap).button();
        $(this._btnOutliner).button();

        $(this._btnMindMap).css("background-image", "url(images/Icon_Molecule_00.png)");
        $(this._btnOutliner).css("background-image", "url(images/Icon_Molecule_00.png)");
    }

    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table class='mindUI_topToolbarTab'><tr>";
        idx++;

        ihtml[idx] = "<td><button title='MindMap' id='" + name + "_mind_map' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>MindMap</td>";
        idx++;

        ihtml[idx] = "<td><button title='Outliner' id='" + name + "_outliner' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>Outliner</td>";
        idx++;

        ihtml[idx] = "</tr></table>";
        idx++;

        return ihtml.join("");
    }
}