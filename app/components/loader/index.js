import React from 'react';
import Lottie from 'react-lottie';
import * as Options from './animation.json';

export class Loader extends React.Component {
    render() {
        const lottieOptions = {
            loop: true,
            autoplay: true,
            animationData: Options
        };
        return (
            <div style={{
                marginTop: window.innerHeight / 4
            }}>

                <Lottie
                    options={lottieOptions}
                    height={window.innerHeight / 2}
                    width={window.innerWidth / 2}
                />

            </div>);
    }
}
