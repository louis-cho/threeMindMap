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