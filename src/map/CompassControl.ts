import { CornerType } from '../other/CornerType';
import { BaseObject } from '../base-object/BaseObject';

/*
 * @Author: kekeqy
 * @Date: 2018-12-11 14:13:40
 * @LastEditors: kekeqy
 * @LastEditTime: 2018-12-11 14:13:43
 * @Description: 指南针控件
 */
export class CompassControl extends BaseObject {
    public constructor(option: {
        offset?: number[],
        position?: CornerType
    }) {
        super();
        throw new Error('未实现！');
    }
}