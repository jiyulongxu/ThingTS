import { CompassControl } from './CompassControl';
import { CornerType } from '../other/CornerType';

/*
 * @Author: kekeqy
 * @Date: 2018-12-11 14:10:03
 * @LastEditors: kekeqy
 * @LastEditTime: 2018-12-11 14:10:06
 * @Description: 指北针控件
 */
export class EarthCompass extends CompassControl {
    public constructor(option: {
        image: string,
        offset?: number[],
        position?: CornerType
    }) {
        super(option);
        throw new Error('未实现！');
    }
}