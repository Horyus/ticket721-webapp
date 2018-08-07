import React from 'react';
import {ConnectionTracker} from "../components/connection_tracker";
import {TicketShowcase} from "../components/ticket_showcase";

export class VerifiedTicket extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                width: "98%",
                minHeight: "110%",
                backgroundColor: '#ffffff'
            }}>
                <div>
                    <TicketShowcase contract="Ticket721" id={this.props.match.params.id}/>
                </div>
            </div>
        )
    }
}
