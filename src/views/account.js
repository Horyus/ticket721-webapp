import React from 'react';
import {ConnectionTracker} from "../components/connection_tracker";

export class Account extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.address);
    }

    render() {
        return (
            <div>
                <h2>
                    HELLO {this.props.match.params.address}
                </h2>
            </div>
        )
    }
}
