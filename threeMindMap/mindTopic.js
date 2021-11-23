import { mindConstant } from './mindConstant.js';
import * as THREE from '../build/three.module.js';

var DESCENDER_ADJUST = 1.28;

export class mindTopic {

    constructor() {
        this._geom = null;
        this._mesh = null;
        this._topic = mindConstant.DefaultPref.Title;
        this._color = mindConstant.DefaultPref.Color;
        this._position = mindConstant.DefaultPref.Position;
        this._size = mindConstant.DefaultPref.Topic.Size;
        this._parent = null;
        this._textColor = mindConstant.DefaultPref.TextColor;
        this._borderColor = mindConstant.DefaultPref.BorderColor;
        this._icon = null;
        this._message = "";

        this._parameters = {
            "fontface": "Arial",
            "fontsize": 42,
            "borderThickness": 4,
            "borderColor": {
                "r": 0,
                "g": 0,
                "b": 0
            },
            "backgroundColor": {
                "r": 255,
                "g": 255,
                "b": 255,
                "a": 1.0
            }
        };
    }

    setGeom(geom) {
        this._geom = geom;
    }

    getGeom() {
        return this._geom;
    }

    setTitle(title) {
        this._title = title;
    }

    getTitle() {
        return this._title;
    }

    setColor(color) {
        this._color = color;
    }

    getColor() {
        return this._color;
    }

    setPosition(position) {
        this._position = position;
    }

    getPosition() {
        return this._position;
    }

    setSize(size) {
        this._size = size;
    }

    getSize() {
        return this._size;
    }

    setFont(font) {
        this._parameters["font"] = font;
    }

    getFont() {
        return this._parameters["font"];
    }

    setFontSize(fontSize) {
        this._parameters["fontsize"] = fontSize;
    }

    getFontSize() {
        return this._parameters["fontsize"];
    }

    setParent(parent) {
        this._parent = parent;
    }

    getParent() {
        return this._parent;
    }

    setTextColor(textColor) {
        this._textColor = textColor;
    }

    getTextColor() {
        return this._textColor;
    }

    setIcon(icon) {
        this._icon = icon;
    }

    getIcon() {
        return this._icon;
    }

    setBorderColor(borderColor) {
        this._borderColor = borderColor;
    }

    getBorderColor() {
        return this._borderColor;
    }

    setMesh(mesh) {
        this._mesh = mesh;
    }

    getMesh() {
        return this._mesh;
    }

    setMessage(message) {
        this._message = message;
    }

    getMessage() {
        return this._message;
    }

    CreateTopic(bMessage, topic) {
        if (parameters === undefined) parameters = {};

        let fontface = this._parameters.hasOwnProperty("_fontface") ?
            parameters["_fontface"] : "Arial";

        let fontsize = this._parameters.hasOwnProperty("_fontsize") ?
            parameters["_fontsize"] : 42;

        let borderThickness = this._parameters.hasOwnProperty("_borderThickness") ?
            parameters["_borderThickness"] : 4;

        let borderColor = this._parameters.hasOwnProperty("_borderColor") ?
            parameters["_borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };
            
        let backgroundColor = this._parameters.hasOwnProperty("_backgroundColor") ?
            parameters["_backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };

        // let spriteAlignment = THREE.SpriteAlignment.topLeft;

        let canvas = document.createElement('canvas');

        let context = canvas.getContext('2d');

        context.font = "Bold " + fontsize + "px " + fontface;

        // size 데이터 받아오기 (높이는 폰트 사이즈에만 영향을 받는다)
        let metrics = context.measureText(topic);
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
        context.fillText(topic, 0, 0);

        // canvas contents will be used for a texture
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        let spriteMaterial = new THREE.SpriteMaterial(
            { map: texture });
        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(350, 150, 1.0);

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

    clone() {
        let topic = new mindTopic();

        if (this._geom) {
            topic._geom = this._geom.clone();
        }

        if (this._mesh) {
            topic._mesh = this._mesh.clone();
        }

        topic._title = this._title;
        topic._color = this._color;
        topic._position = this._position.clone();
        topic._size = this._size.slice();
        topic._fontSize = this._fontSize;
        topic._parent = this._parent;
        topic._textColor = this._textColor.slice();
        topic._borderColor = this._borderColor;
        topic._icon = this._icon;
        topic._message = this._message;

        return topic;
    }

}