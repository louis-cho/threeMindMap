export class mindMainMenu {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._onMode = false;
    }

    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div class=mind_TopMenuItem id='" + name + "_topMenu_";

        return null;
    }
}