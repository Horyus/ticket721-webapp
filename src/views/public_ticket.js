import React from 'react';
import {TicketShowcase} from "../components/ticket_showcase";

export class PublicTicket extends React.Component {
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
                    <TicketShowcase contract="Ticket721Public" id={this.props.match.params.id}/>
                </div>
            </div>
        )
    }
}
