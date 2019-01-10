import { LightBase } from './LightBase';
export declare class SpotLight extends LightBase {
    constructor();
    /**
     * 设置灯光角度
     * @type {Number} value 角度
     */
    lightAngle: number;
    /**
     * 设置灯光位置偏移量
     * @type {Array<Number>}
     */
    lightOffset: number[];
    /**
     * 设置灯光目标位置
     * @type {Array<Number>} value 目标位置
     */
    lightTarget: number[];
    /**
     * 设置光源节点名字
     * @type {String}
     */
    centerNodeName: string;
}
