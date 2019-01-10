import { Thing } from './Thing';
import { Floor } from '../building/Floor';
export declare class Door extends Thing {
    constructor();
    /**
     * 开门
     */
    open(): void;
    /**
     * 关门
     */
    close(): void;
    /**
     * 获取所在楼层
     * @type {THING.Floor}
     */
    readonly floor: Floor;
}
