import { BaseObject } from '../base-object/BaseObject';

/*
 * @Author: kekeqy
 * @Date: 2018-12-11 14:27:05
 * @LastEditors: kekeqy
 * @LastEditTime: 2018-12-11 14:33:09
 * @Description: 根据底面和高度拔起的体
 */
export class GeoBuilding extends BaseObject {
    public constructor(options: {
        /**
         * 类型'GeoBuilding'
         */
        type: string,
        /**
         * 楼名称
         */
        name: string,
        /**
         * 楼数据例如：[[116.4408957710001, 39.96151952200006],[116.4408957710001, 39.96151952200006]]
         */
        coordinates: number[],
        /**
         * 楼的高度 单位:米
         */
        height: number,
        /**
         * 楼属性数据
         */
        userData: Object,
        /**
         * 设置楼宇样式,目前仅支持在楼宇初始化的时候设置
         */
        renderer: Object,
        /**
         * 是否合并为一个Mesh,默认false
         */
        combine: Object
    }) {
        super();
        throw new Error('未实现！');
    }

    /**
     * 设置楼宇的高度 单位：米
     */
    public set height(value: number) {
        throw new Error('未实现！');
    }
}