import { Camera } from './Camera';
export declare class OrthographicCamera extends Camera {
    zoom: number;
    view: any;
    left: number;
    right: number;
    top: number;
    bottom: number;
    near: number;
    far: number;
    readonly isOrthographicCamera: boolean;
    constructor(left: number, right: number, top: number, bottom: number, near: number, far: number);
    copy(source: OrthographicCamera, recursive?: boolean): this;
    setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): void;
    clearViewOffset(): void;
    updateProjectionMatrix(): void;
    toJSON(meta: any): any;
}
