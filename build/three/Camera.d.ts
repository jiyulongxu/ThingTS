import { Object3D, Matrix4, Vector3 } from 'three';
export declare class Camera extends Object3D {
    readonly isCamera: boolean;
    matrixWorldInverse: Matrix4;
    projectionMatrix: Matrix4;
    projectionMatrixInverse: Matrix4;
    constructor();
    copy(source: Camera, recursive?: boolean): this;
    getWorldDirection(target: Vector3): Vector3;
    updateMatrixWorld(force: boolean): void;
    clone(): this;
}
