import './tx.css';

import React from 'react';
import {connect} from 'vort_x-components';

export class Mint extends React.Component {
    render() {

        return (<div
            style={{
                backgroundColor: "#fffff0",
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
                >🎫</h2>
                <h2
                    className="information_feed_tx_info"
                    style={{
                        color: "#EBA53D",
                        textAlign: 'center'
                    }}>New {this.props.contract_name}</h2>
            </div>
        </div>)
    }
}
