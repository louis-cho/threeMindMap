import { mindConstant } from "./mindConstant.js";
import { mindLog } from "../MindLog/log.js";

export class mindTopViewEdit {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        mindTopViewEdit.I = this;

        this._mode = 0;

        this._btnTopic = document.getElementById(name + "_edit_topic");
        this._btnSubtopic = document.getElementById(name + "_edit_subtopic");
        this._btnRelation = document.getElementById(name + "_edit_relation");
        this._btnSummary = document.getElementById(name + "_edit_summary");
        this._btnNote = document.getElementById(name + "_edit_note");

        $(this._btnTopic).button();
        $(this._btnSubtopic).button();
        $(this._btnRelation).button();
        $(this._btnSummary).button();
        $(this._btnNote).button();

        $(this._btnTopic).css("background-image", "url(images/Icon_Molecule_00.png)");
        $(this._btnSubtopic).css("background-image", "url(images/Icon_Molecule_00.png)");
        $(this._btnRelation).css("background-image", "url(images/Icon_Molecule_00.png)");
        $(this._btnSummary).css("background-image", "url(images/Icon_Molecule_00.png)");
        $(this._btnNote).css("background-image", "url(images/Icon_Molecule_00.png)");

        $(this._btnTopic).click(function () {
            mindTopViewEdit.I._mode = mindConstant.DefaultPref.Mode["topic"];

            // raycaster 사용해서 핸들링하기

            // mouse move event 추가

            // rendering area에 mouse move 이벤트 달기
            mindTopViewEdit.I._app._div_rbase.addEventListener('mousemove', event => {
                let x = event.offsetX;
                let y = event.offsetY;
                mindLog(3, "mouse coord >> (" + x + "," + y + ")");

                let coord3d = mindTopViewEdit.I._app._renderer.getMouseCoordinate(x, y);
                mindLog(3, "3d coord >> (" + coord3d.x + "," + coord3d.y + "," + coord3d.z + ")");
            });

            // mindTopViewEdit.I._app._renderer.getMouseCoordinate();
            // 엔터 혹은 마우스 클릭하면 추가하고 종료

            // esc 누르면 아무것도 하지 않고 종료
        });

        $(this._btnSubtopic).click(function () {
            this._mode = mindConstant.DefaultPref.Mode["subtopic"];
        });
    }

    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table class='mindUI_topToolbarTab'><tr>";
        idx++;

        ihtml[idx] = "<td><button title='Topic' id='" + name + "_edit_topic' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>Topic</td>";
        idx++;

        ihtml[idx] = "<td><button title='Subtopic' id='" + name + "_edit_subtopic' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>Subtopic</td>";
        idx++;

        ihtml[idx] = "<td><button title='Relationship' id='" + name + "_edit_relationship' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>Relationship</td>";
        idx++;

        ihtml[idx] = "<td><button title='Summary' id='" + name + "_edit_summary' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>Summary</td>";
        idx++;

        ihtml[idx] = "<td><button title='Boundary' id='" + name + "_edit_boundary' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>Boundary</td>";
        idx++;

        ihtml[idx] = "<td><button title='Note' id='" + name + "_edit_note' class='ui-button ui-widget ui-corner-all ui-button-icon-only mindUI_topBar_Btn_Tool'></button>Note</td>"
        idx++;

        return ihtml.join("");
    }
}