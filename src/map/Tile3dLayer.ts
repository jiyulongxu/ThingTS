import { BaseObject } from '../base-object/BaseObject';

/*
 * @Author: kekeqy
 * @Date: 2018-12-11 15:09:42
 * @LastEditors: kekeqy
 * @LastEditTime: 2018-12-11 15:12:36
 * @Description: 倾斜摄影图层类
 */
export class Tile3dLayer extends BaseObject {
    public constructor(param: {
        /**
         * 倾斜摄影图层名称
         */
        name: string,
        /**
         * 倾斜摄影服务url
         */
        url: string,
        /**
         * 倾斜摄影离地高度
         */
        height: Number
    }) {
        super();
        throw new Error('未实现！');
    }
}