import React from 'react';
import {ConnectionTracker} from "../components/connection_tracker";

export class Account extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.address);
    }

    render() {
        return (
            <div style={{
                width: "100%",
                minHeight: "110%",
                backgroundColor: '#ffffff'
            }}>
                <div style={{
                    marginLeft: '30px'
                }}>
                    <h2>
                        ADDRESS
                    </h2>
                </div>
            </div>
        )
    }
}
