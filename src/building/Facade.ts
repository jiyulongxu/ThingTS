import { BaseObject } from '../base-object/BaseObject';
import { Building } from './Building';

/*
 * @Author: kekeqy
 * @Date: 2018-12-10 15:11:26
 * @LastEditors: kekeqy
 * @LastEditTime: 2018-12-10 15:16:05
 * @Description: 外立面
 */
export class Facade extends BaseObject {
    public constructor() {
        super();
        throw new Error('未实现！');
    }

    /**
     * 获取建筑
     * @type {THING.Building}
     */
    public get building(): Building {
        throw new Error('未实现！');
    }

}