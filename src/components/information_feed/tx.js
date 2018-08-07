import './tx.css';

import React from 'react';
import {connect} from 'vort_x-components';

class _TxBar extends React.Component {
    render() {

        if (!this.props.tx)
            return null;
        console.log(this.props.tx);
        let name = this.props.receiver;
        if (this.props.receiver && this.props.receiver.length >= 30) {
            name = this.props.receiver.split(0, 27) + '...';
        }
        let color;
        let bg_color;
        let icon;
        switch (this.props.tx.status.type) {
            case 'CONFIRMED':
            case 'RECEIPT':
                color = 'green';
                bg_color = '#f0fff0';
                icon = '✓';
                break ;
            case 'BROADCASTED':
                color = '188ae2';
                bg_color = '#f0f0ff';
                icon = '⚙️';
                break ;
            case 'ERROR':
                color = 'red';
                bg_color = '#fff0f0';
                icon = '✘';
                break ;
        }

        return (<div
            style={{
                backgroundColor: bg_color,
                height: '50px',
                display: 'table',
                width: '100%',
                paddingLeft: '20px',
                paddingRight: '20px',
                borderBottom: '1px solid #dddddd',
                borderTop: '1px solid #dddddd'
            }}
        >
            <div style={{
                display: 'table-cell',
                verticalAlign: 'middle'
            }}>
            <h2
                className="information_feed_tx_icon"
                style={{
                    color: color
                }}>{icon}</h2>
            {this.props.receiver
                ?
                <h2
                    className="information_feed_tx_info"
                    style={{
                        color: color,
                        textAlign: 'center'
                    }}>Transaction to {name}</h2>
                :
                null
            }
            </div>
        </div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    let to = state.tx[ownProps.txHash] && state.tx[ownProps.txHash].transaction_arguments && state.tx[ownProps.txHash].transaction_arguments.to ? state.tx[ownProps.txHash].transaction_arguments.to : undefined;
    end:
        if (to && state.csapi && state.csapi.events) {
            for (let event of state.csapi.events) {
                if (event.address.toLowerCase() === to.toLowerCase()) {
                    to = event.name;
                    break end;
                }
            }
        }
    return {
        ...ownProps,
        tx: state.tx[ownProps.txHash],
        receiver: to
    }
};

export const TxBar = connect(_TxBar, mapStateToProps);
