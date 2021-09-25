import { mindTopToolBar } from "./mindTopToolBar.js";
import { Renderer } from "../Renderer/Renderer.js";
import { mindConstant } from "./mindConstant.js";
import { mindTopic } from './mindTopic.js';

export class mindEditor {

    constructor(name, div_elem) {

        this._name = name;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_mainMenu = document.getElementById(name + "_mainMenu");

        this._div_topToolBar = document.getElementById(name + "_topToolBar");

        this._div_rbase = document.getElementById(name + "_renderArea");

        this._div_propertyBar = document.getElementById(name + "_propertyBar");

        this._div_bottomMenu = document.getElementById(name + "_bottomMenu");

        mindEditor.I = this;

        this._topToolBar = new mindTopToolBar(this._name, this, this._div_topToolBar);

        window.addEventListener("resize", function () {
            mindEditor.I.OnResize();
        });

        this._renderer = new Renderer(this, this._div_rbase);
        this._renderer.createPerspectiveCamera(10, 10, 800, 1000, 1, 0.1, 1000);
        this._render();
        
        this.OnResize();

        this._selectedTopic = null;     // 현재 선택된 topic

        // render base를 클릭 시 현재 활성화된 모드에 따라 개체를 추가해야 한다.
        $(this._div_rbase).on("mousedown", function () {

            // mode가 topic인 경우, topic에 대한 default pref 크기의 사각형을 추가해보자.
            if (mindEditor.I._topToolBar._topViewEdit._mode === mindConstant.DefaultPref.Mode["topic"]) {
                // 현재 Scene에 활성화된 객체를 복사해서 붙여넣기
            }

            // mode가 subtopic인 경우, subtopic에 대한 default pref 크기의 사각형을 추가해보자.
            else if (mindEditor.I._topToolBar._topViewEdit._mode === mindConstant.DefaultPref.mode["subtopic"]) {
                // 현재 Scene에 활성화된 객체를 복사해서 붙여넣기
            }

        });
    }

    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        // main menu
        ihtml[idx] = "<div class='mind_mainmenu' id='" + name + "_mainMenu'>main menu</div>";
        idx++;

        // top tool bar
        ihtml[idx] = "<div class='mind_toptoolbar' id='" + name + "_topToolBar'>top tool bar</div>";
        idx++;

        // sub div area (render area + property bar)
        ihtml[idx] = "<div class='mind_subdivarea' id='" + name + "_subDivArea'>";
        idx++;

        // render area
        ihtml[idx] = "<div class='mind_renderarea' id='" + name + "_renderArea'></div>";
        idx++;

        // property bar
        ihtml[idx] = "<div class='mind_propertybar' id='" + name + "_propertyBar'>property bar</div></div>";
        idx++;
    
        // bottom menu
        ihtml[idx] = "<div class='mind_bottommenu' id='" + name + "_bottomMenu'>bottom menu</div>";
        idx++;

        return ihtml.join("");
    }

    OnResize() {
        this._divw = window.innerWidth;
        this._divh = window.innerHeight;

        this._div.style.width = this._divw + "px";
        this._div.style.height = this._divh + "px";

        if (this._div_rbase && this._div_propertyBar) {
            this._property_height = this._divh - $(this._div_topToolBar).height() - $(this._div_mainMenu).height() - $(this._div_bottomMenu).height();
            this._div_propertyBar.style.height = this._property_height + "px";
        }

        this._property_width = $(this._div_propertyBar).width();
        let viewWidth = this._divw - this._property_width;

        this._canvas_width = viewWidth;
        this._canvas_height = this._property_height;
        this._canvas_aspect = this._canvas_width / this._canvas_height;

        this._div_rbase.style.width = this._canvas_width + "px";
        this._div_rbase.style.height = this._canvas_height + "px";

        if (this._renderer)
            this._renderer.onWindowResize(this._canvas_width, this._canvas_height);

    }

    _render() {
        requestAnimationFrame(mindEditor.I._render);

        // Renderer.I.tick();
        Renderer.I.render();

    }

    CreateTopic(bSubTopic = false) {

        let topic = new mindTopic();
        let topicMesh = null;

        topicMesh = topic.createTopic(bSubTopic);
        
        if(topicMesh)
            this._renderer._scene.add(topicMesh);

        this._selectedTopic = topic;
    }

    UpdateTopicPosition() {
        if (this._selectedTopic && this._topicPosition)
            this._selectedTopic._mesh.position.set(this._topicPosition.x, this._topicPosition.y, this._topicPosition.z  );
    }
}