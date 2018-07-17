import React from 'react';
import {Vortex} from 'vort_x';
import {connect} from 'vort_x-components';

export class _ManifestLoader extends React.Component {

    loaded = {};

    shouldComponentUpdate(newProps) {
        for (let idx = 0; idx < newProps.events.length; ++idx) {
            if (!this.loaded[newProps.events[idx].address.toLowerCase()]) {
                Vortex.get().loadContract("Ticket721Event", newProps.events[idx].address);
                this.loaded[newProps.events[idx].address.toLowerCase()] = true;
            }
        }
        return true;
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        events: state.csapi.events
    }
};

export const ManifestLoader = connect(_ManifestLoader, mapStateToProps);
