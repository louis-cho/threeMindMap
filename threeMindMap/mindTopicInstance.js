import { mindLog } from "../MindLog/log.js";
import { mindTopic } from "./mindTopic.js";
import * as THREE from "../build/three.module.js";

/**
 * 현재 선택된 topic을 관리하는 클래스
 * */
export class mindTopicInstance {

    static NextID = 0;

    static AllocTopicID() {
        let topicId = mindTopicInstance.NextID;
        mindTopicInstance.NextID++;
        return topicId;
    }

    ClearAllTopic() {
        for (let i = 0; i < mindTopicInstance.NextID; ++i) {
            this._app._renderer._scene.remove(this._app._topicList[i]);
            this._app._topicList[i]._topic = null;
            this._app._topicList[i]._isCreated = false;
            this._app._topicList[i]._isSelected = false;
            this._app._topicList[i]._topicPosition = null;
        }

        mindTopicInstance.NextID = 0;
    }


    constructor(app, topic) {
        this._app = app;

        this._topic = topic;

        this._isSelected = false;

        this._isCreated = false;

        this._topicPosition = null;

        mindTopicInstance.I = this;
    }

    /**
     * mindTopicInstance의 위치를 갱신한다.
     * @param {any} event
     * @param {any} app
     */
    handleMouseMove(event, app) {

        let x = event.offsetX;
        let y = event.offsetY;
        mindLog(3, "mouse coord >> (" + x + "," + y + ")");

        let coord3d = mindTopicInstance.I._app._renderer.getMouseCoordinate(x, y);
        mindLog(3, "3d coord >> (" + coord3d.x + "," + coord3d.y + "," + coord3d.z + ")");

        mindTopicInstance.I._topicPosition = coord3d;

        if (mindTopicInstance.I._isSelected) {
            if (!mindTopicInstance.I._isCreated) {
                // mindTopViewEdit의 모드를 보고 CreateInstance의 인자 넘겨주기
                mindTopicInstance.I.CreateInstance();
                mindTopicInstance.I._isCreated = true;
            }

            mindTopicInstance.I.UpdateTopicPosition();
        }
    }


    /**
     * Topic Instance를 생성한다.
     * @param {Boolean} bSubTopic sub topic 여부
     * @param {any} params topic 부가 정보
     */
    CreateInstance(bSubTopic = false, params = null, message = "default text") {

        let topic = new mindTopic();
        let topicMesh = null;

        if (params) {
            if (params._title)
                topic.setTitle(params._title);

            if (params._color)
                topic.setColor(params._color);

            if (params._position)
                topic.setPosition(params._position);

            if (params._size)
                topic.setSize(params._size);

            if (params._font)
                topic.setFont(params._font);

            if (params._fontSize)
                topic.setFontSize(params._fontSize);

            if (params._parent) 
                topic.setParent(params._parent);

            if (params._textColor)
                topic.setTextColor(params._textColor);

            if (params._icon)
                topic.setIcon(params._icon);

            if (params._border)
                topic.setBorder(params._border);

            if (params._mesh)
                topic.setMesh(params._mesh);
        }

        topicMesh = this.CreateMesh(bSubTopic, params, message);
        topic._mesh = topicMesh;
        this._topic = topic;

        this._isCreated = true;
        this._isSelected = true;
    }

    CreateMesh(bSubTopic, parameters, message) {
        if (!parameters) {
            parameters = {};
        }

        let fontface = parameters.hasOwnProperty("fontface") ?
            parameters["fontface"] : "Arial";

        let fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 42;

        let borderThickness = parameters.hasOwnProperty("borderThickness") ?
            parameters["borderThickness"] : 4;

        let borderColor = parameters.hasOwnProperty("borderColor") ?
            parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

        let backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
            parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };

        let canvas = document.createElement('canvas');

        let context = canvas.getContext('2d');

        context.font = "Bold " + fontsize + "px " + fontface;

        // size 데이터 받아오기 (높이는 폰트 사이즈에만 영향을 받는다)
        let metrics = context.measureText(message);
        let textWidth = metrics.width * 3;

        // background color
        context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
            + backgroundColor.b + "," + backgroundColor.a + ")";

        // border color
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
            + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        this.roundRect(context, 0, 0, textWidth + borderThickness, fontsize * 10 + borderThickness, 6);
        // 1.4는 baseline 아래에 나오는 g,j,p,q를 위한 factor다

        // translate context to center of canvas
        context.translate(canvas.width / 2, canvas.height / 2);
        context.scale(-1, -1);
        context.textAlign = 'center';
        context.fillStyle = "rgba(0,0,0,1.0)";
        context.fillText(message, 0, 0);

        // canvas contents will be used for a texture
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        let spriteMaterial = new THREE.SpriteMaterial(
            { map: texture });
        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(350, 150, 1.0);

        sprite._id = mindTopicInstance.AllocTopicID();
        return sprite;
    }

    roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    /**
     * Topic의 위치를 갱신한다.
     * */
    UpdateTopicPosition() {
        if (this._topic && this._topicPosition) {
            this._topic._mesh.position.set(this._topicPosition.x, this._topicPosition.y, this._topicPosition.z);
        }
    }

    /**
     * mindTopicInstance의 위치를 고정시키고 현재 topic 객체를 더 이상 tracking하지 않는다.
     * @param {any} event
     * @param {any} app
     */
    handleMouseDown(event, app) {

        let x = event.offsetX;
        let y = event.offsetY;
        mindLog(3, "mouse coord >> (" + x + "," + y + ")");

        let coord3d = mindTopicInstance.I._app._renderer.getMouseCoordinate(x, y);
        mindLog(3, "3d coord >> (" + coord3d.x + "," + coord3d.y + "," + coord3d.z + ")");

        mindTopicInstance.I._topicPosition = coord3d;

        mindTopicInstance.I.UpdateTopicPosition();

        mindTopicInstance.I._app._topicList[mindTopicInstance.I._topic._mesh._id] = mindTopicInstance.I;

        mindTopicInstance.I._isSelected = false;
        mindTopicInstance.I._isCreated = false;
    }


    /**
     * mindTopicInstance의 보조 지점들을 표기한다.
     * @param {any} bShow
     */
    setShowAux(bShow) { }

    /**
     * Aux 포인트 지점에 대한 마우스 이벤트 처리를 진행한다.
     * */
    handleClickAux(ncoord) {

    }

    setTopic(topic) {
        this._topic = topic;
    }

    getTopic() {
        return this._topic;
    }
}