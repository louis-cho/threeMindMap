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

        ihtml[idx] = "<div class='mindUI_Property_Area'>";
        idx++;

        // view type selection
        ihtml[idx] = "<button class='ui-button ui-widget ui-corner-all mindUI_ViewType_Btn'>Style</button>";
        idx++;
        ihtml[idx] = "<button class='ui-button ui-widget ui-corner-all mindUI_ViewType_Btn'>Map</button>";
        idx++;

        // structure
        ihtml[idx] = "<div class='mindUI_Property_Structure'>";
        idx++;
        // div text + selection
        ihtml[idx] = "<div class='mind_Structure_Text'>Structure</div>";
        idx++;
        ihtml[idx] = "<select class='mindUI_Structure_Select' name='structure_style'></select>";
        idx++;
        
        ihtml[idx] = "</div>";
        idx++;


        // topic
        ihtml[idx] = "<div class='mindUI_Property_Topic'>";
        idx++;

        // div text + selection
        ihtml[idx] = "<div class='mindUI_Topic_Text'>Topic</div>";
        idx++;
        ihtml[idx] = "<select name='topic_style' class='mindUI_Topic_Select'></select>";
        idx++;
        ihtml[idx] = "<hr>";
        idx++;

        // checkboxradio + input box
        ihtml[idx] = "<div class='mindUI_Fill'>";
        idx++;
        ihtml[idx] = "<label class='mindUI_Fill_Label' for='fill'>Fill</label>";
        idx++;
        ihtml[idx] = "<input class='mindUI_Fill_Radio' type='radio' name='fill' id='fill'>";
        idx++;
        ihtml[idx] = "<input class='mindUI_Fill_Input' type='number'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // checkboxradio
        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td><label for='bond'>Bonds</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='bond' id='bond'>";
        idx++;
        ihtml[idx] = "</td></tr>";
        idx++;
        // checkboxradio + input box

        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td><label for='fixed_width'>Fixed Width</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='fixed_width' id='fixed_width'></td>";
        idx++;
        ihtml[idx] = "<td><input type='number'></td>";
        idx++;
        ihtml[idx] = "</tr></div>";
        idx++;

        // text
        ihtml[idx] = "<div class='mindUI_Property_Text'>";
        idx++;
        // div text
        ihtml[idx] = "<div>Text</div>";
        idx++;
        // selection + color picker
        ihtml[idx] = "<tr><td><select name='text_font'></select></td>";
        idx++;
        ihtml[idx] = "<td><input type='text'></td></tr>";
        idx++;
        // text style & text size
        ihtml[idx] = "<tr><td><select name='text_style'></td>";
        idx++;
        ihtml[idx] = "<td><select name='text_size'></td></tr>";
        idx++;
        // text setting

        // text align
        ihtml[idx] = "</div>";
        idx++;

        // branch
        ihtml[idx] = "<div class='mindUI_Property_Branch'>";
        idx++;
        // text + selection
        ihtml[idx] = "<tr><td>Branch</td>";
        idx++;
        ihtml[idx] = "<td><select name='branch_style'></td></tr>";
        idx++;
        // division line
        ihtml[idx] = "<hr>";
        idx++;
        // checkbox
        ihtml[idx] = "<div><label for='border'>Border</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='border' id='border'></div>";
        idx++;
        // selection + color picker
        ihtml[idx] = "<tr><td><select name='border_style'></td>";
        idx++;
        ihtml[idx] = "<td><input type='text'></td></tr>";
        idx++;

        // checkbox
        ihtml[idx] = "<div>";
        idx++;
        ihtml[idx] = "<input type='radio' name='multi_branch_color' id='multi_branch_color'><label for='multi_branch_color'>Multi-branch color</label></div>";
        idx++;
        // checkbox
        ihtml[idx] = "<div>";
        idx++;
        ihtml[idx] = "<input type='radio' name='tapper_line' id='tapper_line'><label for='tapper_line'>Tapper line</label></div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        // reset
        ihtml[idx] = "<div class='mindUI_Property_Reset'>";
        idx++;
        // button Ãß°¡
        ihtml[idx] = "<button class='ui-button ui-widget ui-corner-all'>RESET STYLE</button>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }
}