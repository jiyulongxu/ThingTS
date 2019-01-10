import { LightBase } from './LightBase';

/*
 * @Author: kekeqy
 * @Date: 2018-12-10 16:25:36
 * @LastEditors: kekeqy
 * @LastEditTime: 2018-12-10 16:27:46
 * @Description: 聚光灯
 */
export class SpotLight extends LightBase {
    public constructor() {
        super();
        throw new Error('未实现！');
    }

    /**
     * 设置灯光角度
     * @type {Number} value 角度
     */
    public set lightAngle(value: number) {
        throw new Error('未实现！');
    }

    /**
     * 设置灯光位置偏移量
     * @type {Array<Number>}
     */
    public set lightOffset(value: number[]) {
        throw new Error('未实现！');
    }

    /**
     * 设置灯光目标位置
     * @type {Array<Number>} value 目标位置
     */
    public set lightTarget(value: number[]) {
        throw new Error('未实现！');
    }

    /**
     * 设置光源节点名字
     * @type {String}
     */
    public set centerNodeName(value: string) {
        throw new Error('未实现！');
    }

}