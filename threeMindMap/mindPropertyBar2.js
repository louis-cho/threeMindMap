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

        this._div_topic = document.getElementById(name + "_property_topic_text");

        this._div_subtopic = document.getElementById(name + "_property_subtopic");

        this._div_position_x = document.getElementById(name + "_property_position_x");

        this._div_position_y = document.getElementById(name + "_property_position_y");

        this._div_text_colorpicker = document.getElementById(name + "_property_text_colorpicker");

        this._div_border_colorpicker = document.getElementById(name + "_property_border_colorpicker");

        $(this._div_text_colorpicker).colorpicker({
            modal: true,
            buttonColorize: true,
            buttonImageOnly: true,
            ok: function (event, formatted) {
                event.target.style.backgroundColor = formatted.css;
                // [formatted.rgb["r"], formatted.rgb["g"], formatted.rgb["b"]]);
            }
        });

        $(this._div_border_colorpicker).colorpicker({
            modal: true,
            buttonColorize: true,
            buttonImageOnly: true,
            ok: function (event, formatted) {
                event.target.style.backgroundColor = formatted.css;
                // [formatted.rgb["r"], formatted.rgb["g"], formatted.rgb["b"]]);
            }
        });
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

        // view mode가 widget view인 경우, propery setting하기
        if (this._viewmode === mindConstant.DefaultPref.WidgetView) {
            // topic div elem

            // subtopic div elem

            // position div elem

            // text color div elem

            // border color div elem
        }

    }

    _appWidgetView(name) {
        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div class='mindUI_Property_Topic' id='" + name + "_property_topic'>";
        idx++;

        // topic label
        ihtml[idx] = "<div>Topic</div>";
        idx++;

        // topic text
        ihtml[idx] = "<input type='text' id='" + name + "_property_topic_text'></input>";
        idx++;

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
        ihtml[idx] = "<div>Position</div>";
        idx++;

        // x,y input with label
        ihtml[idx] = "<table>";
        idx++;

        ihtml[idx] = "<tr><td>x: </td><td><input type='number' disabled='disabled' id='" + name + "_property_position_x'></input></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td>y:</td><td><input type='number' disabled='disabled' id='" + name + "_property_position_y'></input></tr>";
        idx++;

        ihtml[idx] = "</table>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_Property_TextColor' id='" + name + "_property_textcolor'>";
        idx++;

        // text color label
        // color picker
        ihtml[idx] = "<table>";
        idx++;
        ihtml[idx] = "<tr><td>text color:</td><td><input type='text' id='" + name + "_property_text_colorpicker'></td></tr>";
        idx++;
        ihtml[idx] = "</table>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='mindUI_Property_BorderColor' id='" + name + "_property_bordercolor'>";
        idx++;

        // border color label
        // border color

        ihtml[idx] = "<table>";
        idx++;
        ihtml[idx] = "<tr><td>border color:</td><td><input type='text' id='" + name + "_property_border_colorpicker'></td></tr>";
        idx++;
        ihtml[idx] = "</table>";
        idx++;

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