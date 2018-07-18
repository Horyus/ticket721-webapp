import {keccak_256} from 'js-sha3';
import * as GeoPattern from 'geopattern';
import invert from 'invert-color';

export function gradient_generator(id) {
    const pattern = GeoPattern.generate(keccak_256(id));
    console.log(pattern);
    return {bg: pattern.toDataUrl(), fg: invert(pattern.color, { black: '#202020', white: '#f0f0f0' })}
}
