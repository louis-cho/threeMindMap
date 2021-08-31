import { mindTopToolBar } from "./mindTopToolBar.js";
import { Renderer } from "../Renderer/Renderer.js";
export class mindEditor {

    constructor(name, div_elem) {

        this._name = name;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_mainMenu = document.getElementById(name + "_mainMenu");

        this._div_topToolBar = document.getElementById(name + "_topToolBar");

        this._div_renderArea = document.getElementById(name + "_renderArea");

        this._div_propertyBar = document.getElementById(name + "_propertyBar");

        this._div_bottomMenu = document.getElementById(name + "_bottomMenu");

        mindEditor.I = this;

        this._topToolBar = new mindTopToolBar(this._name, this, this._div_topToolBar);

        window.addEventListener("resize", function () {
            mindEditor.I.OnResize();
        });

        this._renderer = new Renderer(this._div_renderArea);
        this._renderer.createPerspectiveCamera(0, 30, 10, 1000, 1, 0.1, 1000);
        this._renderer.createOrbitControl();
        this._renderer.addSample();
        this._render();
        

 

        this.OnResize();
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

        if (this._div_renderArea && this._div_propertyBar) {
            this._property_height = this._divh - $(this._div_topToolBar).height() - $(this._div_mainMenu).height() - $(this._div_bottomMenu).height();
            this._div_propertyBar.style.height = this._property_height + "px";
        }

        this._property_width = $(this._div_propertyBar).width();
        let viewWidth = this._divw - this._property_width;

        this._canvas_width = viewWidth;
        this._canvas_height = this._property_height;
        this._canvas_aspect = this._canvas_width / this._canvas_height;

        this._div_renderArea.style.width = this._canvas_width + "px";
        this._div_renderArea.style.height = this._canvas_height + "px";

        if (this._renderer)
            this._renderer.onWindowResize(this._canvas_width, this._canvas_height);

    }

    _render() {
        requestAnimationFrame(mindEditor.I._render);

        // Renderer.I.tick();
        Renderer.I.render();

    }
}