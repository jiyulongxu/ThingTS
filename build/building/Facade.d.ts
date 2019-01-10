import { BaseObject } from '../base-object/BaseObject';
import { Building } from './Building';
export declare class Facade extends BaseObject {
    constructor();
    /**
     * 获取建筑
     * @type {THING.Building}
     */
    readonly building: Building;
}
