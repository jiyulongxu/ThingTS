import { Object3D, Matrix4, Vector3 } from 'three';

/*
 * @Author: kekeqy
 * @Date: 2018-12-21 14:16:13
 * @LastEditors: kekeqy
 * @LastEditTime: 2019-01-04 16:14:21
 * @Description: 摄像机
 */
export class Camera extends Object3D {
    public readonly isCamera: boolean = true;
    public matrixWorldInverse: Matrix4;
    public projectionMatrix: Matrix4;
    public projectionMatrixInverse: Matrix4;
    public constructor() {
        super();
        this.type = 'Camera';
        this.matrixWorldInverse = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.projectionMatrixInverse = new Matrix4();
    }
    public copy(source: Camera, recursive?: boolean): this {
        super.copy(source, recursive);
        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);
        this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
        return this;
    }
    public getWorldDirection(target: Vector3): Vector3 {
        if (target === undefined) {
            console.warn('THREE.Camera: .getWorldDirection() target is now required');
            target = new Vector3();
        }
        this.updateMatrixWorld(true);
        let e: Float32Array = this.matrixWorld.elements;
        return target.set(- e[8], - e[9], - e[10]).normalize();
    }
    public updateMatrixWorld(force: boolean): void {
        super.updateMatrixWorld(force);
        this.matrixWorldInverse.getInverse(this.matrixWorld);
    }
    public clone(): this {
        return new Camera().copy(this) as this;
    }
}