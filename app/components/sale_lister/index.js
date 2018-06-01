import React from 'react';
import {FeedFilter, FeedType} from 'vort_x';
import {connect} from 'vort_x-components';

class _SaleLister extends React.Component {
    constructor(props) {
        super(props);
        this.node_array = {
            hot: [],
            new: [],
            none: [],
            soon: []
        };
        this.feed_size = 0;
    }

    shouldComponentUpdate(nextProps) {
        let ret = false;
        for (; this.feed_size < nextProps.feed.length; ++this.feed_size) {
            if (nextProps.feed[this.feed_size].contract_name === 'Ticket721') {
                for (let manifest_idx = 0; manifest_idx < this.props.manifest.length; ++manifest_idx) {
                    if (this.props.manifest[manifest_idx].address.toLowerCase() === nextProps.feed[this.feed_size].contract_address.toLowerCase()) {
                        this.node_array[this.props.manifest[manifest_idx].status].push(<h3>{nextProps.feed[this.feed_size].contract_address}</h3>);
                        if (!ret)
                            ret = true;
                    }
                }
            }
        }
        return (ret);
    }

    render() {
        return (<div>
            <h3 className="section_title">hot</h3>
            {this.node_array.hot}
            <h3 className="section_title">new</h3>
            {this.node_array.new}
            <h3 className="section_title">soon</h3>
            {this.node_array.soon}
            {this.node_array.none}
        </div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    let selector;
    if (!ownProps.selector)
        selector = FeedFilter(FeedType.Contracts);
    return {
        feed: ownProps.selector ? ownProps.selector(state) : selector(state),
        selector: ownProps.selector || selector,
        manifest: ownProps.manifest
    }
};

export const SaleLister = connect(_SaleLister, mapStateToProps);



