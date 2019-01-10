import { Camera, OrthographicCamera, PerspectiveCamera, Matrix4 } from 'three';
export declare class CombinedCamera extends Camera {
    fov: number;
    near: number;
    far: number;
    aspect: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    zoom: number;
    projectionMatrix: Matrix4;
    cameraO: OrthographicCamera;
    cameraP: PerspectiveCamera;
    isPerspectiveCamera: boolean;
    isOrthographicCamera: boolean;
    constructor(width: number, height: number, fov: number, near: number, far: number);
    toPerspective(): void;
    /** 切换到正交相机 */
    toOrthographic(): void;
    updateProjectionMatrix(): void;
}
