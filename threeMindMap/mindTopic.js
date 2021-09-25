import { mindConstant } from './mindConstant.js';
import * as THREE from '../build/three.module.js';

export class mindTopic {

    constructor() {
        this._geom = null;
        this._mesh = null;
        this._title = mindConstant.DefaultPref.Title;
        this._color = mindConstant.DefaultPref.Color;
        this._position = mindConstant.DefaultPref.Position;
        this._size = mindConstant.DefaultPref.Topic.Size;
        this._font = null;
        this._fontSize = 0;
        this._parent = null;
        this._textColor = mindConstant.DefaultPref.TextColor;
        this._border = null;
        this._icon = null;
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
        this._font = font;
    }

    getFont() {
        return this._font;
    }

    setFontSize(fontSize) {
        this._fontSize = fontSize;
    }

    getFontSize() {
        return this._fontSize;
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

    setBorder(border) {
        this._border = border;
    }

    getBorder() {
        return this._border;
    }

    createTopic() {
        try {

            let rect = new THREE.PlaneGeometry(this._size[0], this._size[1]);
            this._geom = rect;

            let color = new THREE.Color(this._color);
            let material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });

            let plane = new THREE.Mesh(rect, material);
            plane.position.set(this._position.x, this._position.y, this._position.z);

            this._mesh = plane;

            return plane;
        }
        catch (e) {
            return null;
        }
    }
}