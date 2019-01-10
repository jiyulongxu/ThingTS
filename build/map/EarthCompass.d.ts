import { CompassControl } from './CompassControl';
import { CornerType } from '../other/CornerType';
export declare class EarthCompass extends CompassControl {
    constructor(option: {
        image: string;
        offset?: number[];
        position?: CornerType;
    });
}
