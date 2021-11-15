export class mindUtil {

    constructor() {

    }

    /**
     * rgb array로부터 html에서 사용가능한 문자열로 변환한다.
     * @param {any} color
     */
    static HTMLColorRGB(color) {

        if (!color)
            return "000000";

        let r = Math.floor(color[0] * 255).toString(16);
        let g = Math.floor(color[1] * 255).toString(16);
        let b = Math.floor(color[2] * 255).toString(16);

        if (r.length < 2)
            r = "0" + r;
        if (g.length < 2)
            g = "0" + g;
        if (b.length < 2)
            b = "0" + b;

        return r + g + b;
    };

    /**
     * html color 문자열로부터 rgb를 반환한다
     * @param {any} fmt
     */
    static HTMLFormattedColorToRGB(fmt) {
        let rs = "0x" + fmt.substring(0, 2);
        let gs = "0x" + fmt.substring(2, 4);
        let bs = "0x" + fmt.substring(4, 6);

        let r = parseInt(rs) / 255.0;
        let g = parseInt(gs) / 255.0;
        let b = parseInt(bs) / 255.0;

        return [r, g, b];
    };

    /**
     * rgb array로부터 hex number를 반환한다
     * @param {Array} color rgb array
     * @returns {Number} hexNum
     */
    static ColorRGBtoHexNum(color) {
        let r = Math.floor(color[0] * 255);
        let g = Math.floor(color[1] * 255);
        let b = Math.floor(color[2] * 255);

        let h = r * 256 * 256 + g * 256 + b;
        return h;
    };
}