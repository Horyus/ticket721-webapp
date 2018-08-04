import React from 'react';
import {ConnectionTracker} from "../components/connection_tracker";

export class VerifiedTicket extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.id);
    }

    render() {
        return (
            <div style={{
                width: "98%",
                minHeight: "110%",
                backgroundColor: '#ffffff'
            }}>
                <div>
                    <h2>
                        SALE
                    </h2>
                </div>
            </div>
        )
    }
}
