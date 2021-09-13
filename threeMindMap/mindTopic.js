export class mindTopic {

    constructor() {
        this._geom = null;
        this._title = "";
        this._color = null;
        this._position = null;
        this._size = null;
        this._font = null;
        this._fontSize = 0;
        this._parent = null;
        this._textColor = null;
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

}