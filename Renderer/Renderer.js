import * as THREE from '../build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';


export class Renderer {

    constructor(div_elem) {

        this._div = div_elem;

        Renderer.I = this;

        this._camera = null;

        this._scene = null;

        this._renderer = null;

        this._clock = new THREE.Clock();

        this._container = null;

        this._backgroundColor = new THREE.Color(0.5, 0.5, 0.5);

        this._group = null;

        this._container = document.createElement('div');
       
        this._div.appendChild(this._container);

        this._sceneUI = new THREE.Scene();

        this._scene = new THREE.Scene();

        this._scene.background = this._backgroundColor;

        let scr_width = this._div.offsetWidth;
        let scr_height = this._div.offsetHeight;

        this._renderer = new THREE.WebGLRenderer({ antialias: true });

        this._renderer.setPixelRatio(1.0);

        this._renderer.setSize(scr_width, scr_height);

        this._container.appendChild(this._renderer.domElement);

        this._raycaster = new THREE.Raycaster();
        this._intersectedObjects = [];

    }

    setBackgroundColor(r, g, b) {
        this._backgroundColor = new THREE.Color(r, g, b);
        this._scene.background = this._backgroundColor;
    }

    getBackgroundColor() {
        return [this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b];
    }

    getContainer() {
        return this._renderer.domElement;
    }

    createPerspectiveCamera(x, y, z, fov, aspect, near, far) {
        if (this._camera) {
            this._scene.remove(this._camera);
        }

        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(x, y, z);

        this._scene.add(this._camera);
    }

    createOrbitControl() {
        this._controls = new OrbitControls(this._camera, this._container);
        this._controls.target.set(0, 0, 0);

        this._controls.update();
    }

    render() {

        this._renderer.render(Renderer.I._scene, Renderer.I._camera);

        if (this._controls)
            this._controls.update();
    }

    tick() {
        this._dtime = this._clock.getDelta();
    }

    getDeltaTime() {
        return this._dtime;
    }

    autofit3DOrthoCameraObjList(obj_list) {

        let bbox = new THREE.Box3();

        const len = obj_list.length;
        for (let i = 0; i < len; ++i) {
            let obj = obj_list[i];
            bbox.expandByObject(obj);
        }

        let size = new THREE.Vector3();
        bbox.getSize(size);

        let zoom = size.x;
        if (zoom < size.y)
            zoom = size.y;
        if (zoom < size.z)
            zoom = size.z;

        zoom = 1 / zoom * 150;

        let center = new THREE.Vector3();
        bbox.getCenter(center);

        let r = size.length();

        let dir = new THREE.Vector3();

        this._camera.getWorldDirection(dir);
        dir.normalize();
        dir.multiplyScalar(-100);

        let pos = new THREE.Vector3();
        pos.add(center);
        pos.add(dir);

        this._controls.target.set(center.x, center.y, center.z);
        this._controls.zoom0 = zoom;
        this._controls.reset();
    }

    onWindowResize(width, height) {
        if (this._camera) {
            this._camera.aspect = width / height;
            this._camera.updateProjectionMatrix();
        }

        this._renderer.setSize(width, height);
    }

    saveScreenshot(filename) {
        var dataURL = this._renderer.domElement.toDataURL();

        //var data = dataURL.replace(strMime, strDownloadMime);

        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link); //Firefox requires the link to be in the body
            link.download = filename;
            link.href = dataURL;
            link.click();
            document.body.removeChild(link); //remove the link when done
        } else {
            location.replace(uri);
        }
    }

    pickObject(normalizedPosition) {
        this._raycaster.setFromCamera(normalizedPosition, this._camera);
        this._intersectedObjects = this._raycaster.intersectObjects(this._scene.children, true);
        this._pickedObject = null;

        for (var i = 0; i < this._intersectedObjects.length; i++) {
            var obj = this._intersectedObjects[i].object;
            if (!this.isObjVisible(obj))
                continue;

            if (obj._canPick) {
                this._pickedObject = obj;
                return obj;
            }
        }

        return null;
    }

    isObjVisible(obj) {
        if (!obj)
            return true;

        if (!obj.visible) {
            return false;
        }

        return this.isObjVisible(obj.parent);
    }

    /**
     * Ä¿¼­ÀÇ ÇÈ¼¿ ÁÂÇ¥¸¦ normalized ÁÂÇ¥·Î º¯È¯ÇÑ´Ù.
     * @param {any} px Ä¿¼­ÀÇ ÇÈ¼¿ »ó x ÁÂÇ¥
     * @param {any} py Ä¿¼­ÀÇ ÇÈ¼¿ »ó y ÁÂÇ¥
     * @return {any} È­¸éÀÇ Áß½ÉÀÌ (0,0)ÀÎ Á¤±ÔÈ­µÈ ÁÂÇ¥
     */
    ScreenToNormalized(px, py) {

        var cx = (px / this._app._div_rbase.clientWidth) * 2.0 - 1.0;
        var cy = (1.0 - py / this._app._div_rbase.clientHeight) * 2.0 - 1.0;

        var nc = new THREE.Vector2(cx, cy);
        return nc;
    }

    addSample() {
        let geom = new THREE.SphereBufferGeometry(10, 32, 32);
        let mat = new THREE.MeshBasicMaterial({ color: 0x4488aa });

        let mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(3, 4, 0);
        this._scene.add(mesh);
    }

    getMouseCoordinate(px, py) {
        let vec = new THREE.Vector3();
        let pos = new THREE.Vector3();

        vec = this.ScreenToNormalized(px, py);

        // camera unproject¸¦ ÅëÇØ world »óÀÇ ÁÂÇ¥¸¦ ¾Ë¾Æ³½´Ù.
        vec.unproject(this._camera);
        vec.sub(this._camera.position).normalize();

        let distance = - this._camera.position.z / vec.z;

        pos.copy(this._camera.position).add(vec.multiplyScalar(distance));

        return pos;
    }
}