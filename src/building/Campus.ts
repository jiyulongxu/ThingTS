import { BaseObject } from '../base-object/BaseObject';
import { Selector } from '../query/Selector';

/*
 * @Author: kekeqy
 * @Date: 2018-12-10 15:04:07
 * @LastEditors: kekeqy
 * @LastEditTime: 2018-12-10 15:07:03
 * @Description: 园区数据
 */
export class Campus extends BaseObject {
    public constructor() {
        super();
        throw new Error('未实现！');
    }

    /**
     * 获取场景加载数据
     * @type {Object}
     */
    public get sceneJSONData(): any {
        throw new Error('未实现！');
    }

    /**
     * 获取园区建筑集合
     * @type {THING.Selector}
     */
    public get buildings(): Selector {
        throw new Error('未实现！');
    }

    /**
     * 获取园区物体集合
     * @type {THING.Selector}
     */
    public get things(): Selector {
        throw new Error('未实现！');
    }

}