import React from 'react';
import Lottie from 'react-lottie';
import * as Options from './animation';

export class ComponentLoader extends React.Component {
    render() {
        const lottieOptions = {
            loop: true,
            autoplay: true,
            animationData: Options
        };
        return (
            <div style={{
                width: '100%',
                height: '70%'
            }}>
            <Lottie
                options={lottieOptions}
            />
            </div>
        );
    }
}
