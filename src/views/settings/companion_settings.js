import React from 'react';
import {getContract, callContract} from 'vort_x';
import {connect} from 'vort_x-components';

class _CompanionSettings extends React.Component {
    render() {
        if (this.props.companion_address === '0x0000000000000000000000000000000000000000') {
            return (<p>Not linked</p>);
        }
        return (
            <p>{this.props.companion_address}</p>
        )
    }
}

const mapStateToProps = (state, ownprops) => {
    return {
        ...ownprops,
        companion_address: callContract(getContract(state, 'Ticket721Hub'), 'companions', state.web3.coinbase)
    };
};

export const CompanionSettings = connect(_CompanionSettings, mapStateToProps);
