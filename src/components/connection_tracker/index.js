import React from 'react';
import './index.css';

import {CsApiTracker} from "../csapi-tracker";

export class ConnectionTracker extends React.Component {
    render() {
        return (
            <div>
                <div className="left-div">
                    <CsApiTracker/>
                </div>
                <div className="right-div">
                {this.props.children}
                </div>
            </div>
        )
    }
}
