import { BaseObject } from '../base-object/BaseObject';

/*
 * @Author: kekeqy
 * @Date: 2018-12-11 14:34:16
 * @LastEditors: kekeqy
 * @LastEditTime: 2018-12-11 14:37:06
 * @Description: 地理线
 */
export class GeoLine extends BaseObject {
    public constructor(option: {
        /**
         * 类型'GeoLine'
         */
        type: string,
        /**
         * 线名称
         */
        name: string,
        /**
         * 道路数据例如：[[116.4405, 39.9612],[116.4408, 39.9613],[116.4409, 39.9615]]
         */
        coordinates: string,
        /**
         * 创建的道路属性
         */
        userData: string,
        /**
         * GeoLine的渲染样式
         */
        renderer: string
    }) {
        super();
        throw new Error('未实现！');
    }
}