import { Camera } from './Camera';
import { Object3D } from 'three';

export class OrthographicCamera extends Camera {
    public zoom: number;
    public view: any;
    public left: number;
    public right: number;
    public top: number;
    public bottom: number;
    public near: number;
    public far: number;
    public readonly isOrthographicCamera: boolean = true;
    public constructor(left: number, right: number, top: number, bottom: number, near: number, far: number) {
        super();
        this.type = 'OrthographicCamera';
        this.zoom = 1;
        this.view = null;
        this.left = (left !== undefined) ? left : - 1;
        this.right = (right !== undefined) ? right : 1;
        this.top = (top !== undefined) ? top : 1;
        this.bottom = (bottom !== undefined) ? bottom : - 1;
        this.near = (near !== undefined) ? near : 0.1;
        this.far = (far !== undefined) ? far : 2000;
        this.updateProjectionMatrix();
    }
    public copy(source: OrthographicCamera, recursive?: boolean) {
        super.copy(source, recursive);
        this.left = source.left;
        this.right = source.right;
        this.top = source.top;
        this.bottom = source.bottom;
        this.near = source.near;
        this.far = source.far;
        this.zoom = source.zoom;
        this.view = source.view === null ? null : Object.assign({}, source.view);
        return this;
    }

    public setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number) {
        if (this.view === null) {
            this.view = {
                enabled: true,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            };
        }
        this.view.enabled = true;
        this.view.fullWidth = fullWidth;
        this.view.fullHeight = fullHeight;
        this.view.offsetX = x;
        this.view.offsetY = y;
        this.view.width = width;
        this.view.height = height;
        this.updateProjectionMatrix();
    }

    public clearViewOffset(): void {
        if (this.view !== null) {
            this.view.enabled = false;
        }
        this.updateProjectionMatrix();
    }

    public updateProjectionMatrix(): void {
        var dx = (this.right - this.left) / (2 * this.zoom);
        var dy = (this.top - this.bottom) / (2 * this.zoom);
        var cx = (this.right + this.left) / 2;
        var cy = (this.top + this.bottom) / 2;
        var left = cx - dx;
        var right = cx + dx;
        var top = cy + dy;
        var bottom = cy - dy;
        if (this.view !== null && this.view.enabled) {
            var zoomW = this.zoom / (this.view.width / this.view.fullWidth);
            var zoomH = this.zoom / (this.view.height / this.view.fullHeight);
            var scaleW = (this.right - this.left) / this.view.width;
            var scaleH = (this.top - this.bottom) / this.view.height;
            left += scaleW * (this.view.offsetX / zoomW);
            right = left + scaleW * (this.view.width / zoomW);
            top -= scaleH * (this.view.offsetY / zoomH);
            bottom = top - scaleH * (this.view.height / zoomH);
        }
        this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
        this.projectionMatrixInverse.getInverse(this.projectionMatrix);
    }
    public toJSON(meta) {
        var data = Object3D.prototype.toJSON.call(this, meta);
        data.object.zoom = this.zoom;
        data.object.left = this.left;
        data.object.right = this.right;
        data.object.top = this.top;
        data.object.bottom = this.bottom;
        data.object.near = this.near;
        data.object.far = this.far;
        if (this.view !== null) data.object.view = Object.assign({}, this.view);
        return data;
    }
}