import { mindTopToolBar } from "./mindTopToolBar.js";
import { Renderer } from "../Renderer/Renderer.js";
import { mindConstant } from "./mindConstant.js";
import { mindTopic } from './mindTopic.js';
import { mindPropertyBar2 } from "./mindPropertyBar2.js";
import * as THREE from '../build/three.module.js';
import { mindTopicInstance } from "./mindTopicInstance.js";
import { mindLog } from '../MindLog/log.js';
import { mindUtil } from "./mindUtil.js";

export class mindEditor {

    constructor(name, div_elem) {

        new mindUtil();

        this._name = name;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_mainMenu = document.getElementById(name + "_mainMenu");

        this._div_topToolBar = document.getElementById(name + "_topToolBar");

        this._div_rbase = document.getElementById(name + "_renderArea");

        this._div_propertyBar = document.getElementById(name + "_propertyBar");

        mindEditor.I = this;

        this._propertyBar = new mindPropertyBar2("mindmap", this, this._div_propertyBar);

        this._topToolBar = new mindTopToolBar(this._name, this, this._div_topToolBar);

        window.addEventListener("resize", function () {
            mindEditor.I.OnResize();
        });

        this._renderer = new Renderer(this, this._div_rbase);
        this._renderer.createPerspectiveCamera(10, 10, 800, 1000, 1, 0.1, 1000);
        this._render();
        
        this.OnResize();

        this._topicInstance = new mindTopicInstance(this, null);

        this._topicList = [];


        // 1. pointer move
        $(this._div_rbase).on("pointermove", function (event) {
            // update current topic position
            if (mindEditor.I.OnMouseMove(event)) {
                event.stopPropagation();
                event.preventDefault();
            }
        });

        // 2. pointer down
        $(this._div_rbase).on("pointerdown", function () {
            // check whether current topic is null
            if (mindEditor.I.OnMouseDown(event)) {
                event.stopPropagation();
                event.preventDefault();
            }
        });
    }

    /**
     * 선택된 topic 객체가 존재할 때, 마우스 이동 이벤트를 처리한다
     * @param {Event} event mouse move event
     */
    OnMouseMove(event) {
        if (this._topicInstance && this._topicInstance._isSelected) {
            if (this._topicInstance.handleMouseMove(event, this))
                return true;
        }

        return false;
    }

    /**
     * 선택된 topic 객체가 존재할 때, 마우스 다운 이벤트를 처리한다
     * @param {Event} event mouse down event
     */
    OnMouseDown(event) {
        if (this._topicInstance && this._topicInstance._isSelected) {
            if (this._topicInstance.handleMouseDown(event, this))
                return true;
        }

        else if (!this._topicInstance._isSelected) {
            let normalizedPosition = this._renderer.ScreenToNormalized(event.offsetX, event.offsetY);
            let pickedObject = this._renderer.pickObject(normalizedPosition);
            if (pickedObject) {
                // pickedObject의 아이디를 가져와서 topicList에서 찾자.
                mindLog(3, pickedObject);
                if (this._topicList[pickedObject._id])
                    // property bar update
                    this._propertyBar.UpdateProperty(pickedObject);
            }
        }

        return false;
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
        ihtml[idx] = "<div class='mind_propertybar' id='" + name + "_propertyBar'></div></div>";
        idx++;

        return ihtml.join("");
    }

    OnResize() {
        this._divw = window.innerWidth;
        this._divh = window.innerHeight;

        this._div.style.width = this._divw + "px";
        this._div.style.height = this._divh + "px";

        if (this._div_rbase && this._div_propertyBar) {
            this._property_height = this._divh - $(this._div_topToolBar).height() - $(this._div_mainMenu).height();
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

        topicMesh = topic.CreateTopic(bSubTopic, this._renderer._canvas, "sample topic");
        
        if (topicMesh) {
            this._renderer._scene.add(topicMesh);
            let quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0));

            topicMesh.setRotationFromQuaternion(quaternion);
            this._selectedTopic = topic;
            this._selectedTopic._mesh = topicMesh;
        }
        else {
            this._selectedTopic = null;
        }

    }

    UpdateTopicPosition() {
        if (this._selectedTopic && this._topicPosition) {
            this._selectedTopic._mesh.position.set(this._topicPosition.x, this._topicPosition.y, this._topicPosition.z);
        }
    }

    onMoveTopic(event) {

    }

    onFixTopic(event) {

    }

    onDeleteTopic() {
        // remove selected topic
    }


}