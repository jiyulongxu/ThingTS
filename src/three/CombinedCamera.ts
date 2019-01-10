import { Camera, OrthographicCamera, PerspectiveCamera, Matrix4, Frustum, Box3 } from 'three';
import * as THREE from 'three';

/*
 * @Author: kekeqy
 * @Date: 2018-12-18 17:41:12
 * @LastEditors: kekeqy
 * @LastEditTime: 2019-01-07 16:09:45
 * @Description: 复合相机
 */
export class CombinedCamera extends Camera {
    public fov: number;
    public near: number;
    public far: number;
    public aspect: number;
    public left: number;
    public right: number;
    public top: number;
    public bottom: number;
    public zoom: number;
    public projectionMatrix: Matrix4;
    public cameraO: OrthographicCamera;
    public cameraP: PerspectiveCamera;
    public isPerspectiveCamera: boolean;
    public isOrthographicCamera: boolean;
    public constructor(width: number, height: number, fov: number, near: number, far: number) {
        super();
        this.fov = fov;

        this.far = far;
        this.near = near;

        this.left = - width / 2;
        this.right = width / 2;
        this.top = height / 2;
        this.bottom = - height / 2;

        this.aspect = width / height;
        this.zoom = 1;
        // 我们也可以在内部处理projectionMatrix，但只是想测试嵌套的摄像机对象

        this.cameraO = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, near, far);
        this.cameraP = new THREE.PerspectiveCamera(fov, width / height, near, far);

        this.toPerspective();
        // this.toOrthographic();
    }
    public toPerspective(): void {
        // 切换到透视相机

        this.near = this.cameraP.near;
        this.far = this.cameraP.far;

        this.cameraP.aspect = this.aspect;
        this.cameraP.fov = this.fov;

        this.cameraP.updateProjectionMatrix();

        this.projectionMatrix = this.cameraP.projectionMatrix;

        this.isPerspectiveCamera = true;
        this.isOrthographicCamera = false;
        this.type = 'PerspectiveCamera';
    }
    /** 切换到正交相机 */
    public toOrthographic(): void {
        //切换到正交相机，从透视评估视口

        let fov: number = this.fov;
        let aspect: number = this.cameraP.aspect;
        let near: number = this.cameraP.near;
        let far: number = this.cameraP.far;

        // 我们设置的大小是视锥台的中间平面

        let hyperfocus: number = (near + far) / 2;

        let halfHeight: number = Math.tan(fov * Math.PI / 180 / 2) * hyperfocus;
        // let halfWidth: number = halfHeight * aspect;

        // halfHeight /= this.zoom;
        // halfWidth /= this.zoom;

        // this.cameraO.left = - halfWidth;
        // this.cameraO.right = halfWidth;
        // this.cameraO.top = halfHeight;
        // this.cameraO.bottom = - halfHeight;
        // this.cameraO.view = this.view;
        this.cameraO.zoom = halfHeight / 17;

        this.cameraO.updateProjectionMatrix();

        this.near = this.cameraO.near;
        this.far = this.cameraO.far;
        this.projectionMatrix = this.cameraO.projectionMatrix;

        this.isPerspectiveCamera = false;
        this.isOrthographicCamera = true;
        this.type = 'OrthographicCamera';
        this.zoom = halfHeight * 1.8;
    }
    public updateProjectionMatrix(): void {
        if (this.isPerspectiveCamera) {
            this.toPerspective();
        } else {
            this.toPerspective();
            this.toOrthographic();
        }
    }
}