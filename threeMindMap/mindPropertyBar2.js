import { mindConstant } from "./mindConstant.js";


export class mindPropertyBar2 {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._viewmode = mindConstant.DefaultPref.ViewMode;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_viewsetting = document.getElementById(name + "_property_setting");

        this.UpdateUI();

        this._div_subtopic = document.getElementById(name + "_property_subtopic");

        $(this._div_subtopic).accordion();
    }

    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ////////////// view type selection ////////////////
        ihtml[idx] = "<div class='mindUI_View_Selection'>";
        idx++;

        ihtml[idx] = "<button class='ui-button ui-widget ui-corner-all mindUI_ViewType_Btn'>Style</button>";
        idx++;
        ihtml[idx] = "<button class='ui-button ui-widget ui-corner-all mindUI_ViewType_Btn'>Map</button>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;
        /////////////////////////////////////////////////

        ihtml[idx] = "<div class='mindUI_Property_Area' id='" + name + "_property_setting'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    UpdateUI() {
        // mindUI Property Area 내의 모든 element 제거
        // this._div_viewsetting.innerHTML = "";

        switch (this._viewmode) {
            case mindConstant.DefaultPref.WidgetView:
                // mindUI Property Area 내에 widget을 설정할 수 있는 ui를 배치하기
                this._div_viewsetting.innerHTML = this._appWidgetView(this._name);
                break;

            case mindConstant.DefaultPref.TreeView:
                // mindUI Property Area 내에 tree를 설정할 수 있는 ui를 배치하기
                this._div_viewsetting.innerHTML = this._appTreeView(this._name);
                break;
        }
    }

    _appWidgetView(name) {
        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div class='mindUI_Property_Topic' id='" + name + "_property_topic'>";
        idx++;

        // topic label
        
        // topic text

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_Property_SubTopic' id='" + name + "_property_subtopic'>";
        idx++;

        // subtopic label
        ihtml[idx] = "<h3>SubTopic</h3>";
        idx++;

        // subtopic text area
        ihtml[idx] = "<div><p id='" + name + "_property_subtopic_paragraph'>";
        idx++;

        ihtml[idx] = mindConstant.Message.NoSubTopic;
        idx++;

        ihtml[idx] = "</p>";
        idx++;

        ihtml[idx] = "</div></div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_Property_Position' id='" + name + "_property_position'>";
        idx++;

        // position label

        // x,y input with label

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_Property_TextColor' id='" + name + "_property_textcolor'>";
        idx++;

        // text color label

        // color picker

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_Property_BorderColor' id='" + name + "_property_bordercolor'>";
        idx++;

        // border color label

        // border color

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_Property_Apply' id='" + name + "_property_apply'>";
        idx++;

        // apply button

        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    _appTreeView(name) {
        let ihtml = [];
        let idx = 0;

        return ihtml.join("");
    }
}