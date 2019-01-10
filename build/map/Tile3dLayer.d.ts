import { BaseObject } from '../base-object/BaseObject';
export declare class Tile3dLayer extends BaseObject {
    constructor(param: {
        /**
         * 倾斜摄影图层名称
         */
        name: string;
        /**
         * 倾斜摄影服务url
         */
        url: string;
        /**
         * 倾斜摄影离地高度
         */
        height: Number;
    });
}
