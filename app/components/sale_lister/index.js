import React from 'react';
import {FeedFilter, FeedType} from 'vort_x';
import {connect} from 'vort_x-components';
import {Ticket721Card} from "../ticket721-card";
import {Row} from 'antd';
import {getEthPriceNow} from 'get-eth-price';
import * as Fuzzy from 'fuzzy';

class _SaleLister extends React.Component {
    constructor(props) {
        super(props);
        this.node_array = {
            hot: [],
            new: [],
            none: [],
            soon: [],
            all: []
        };
        this.feed_size = 0;
        this.prices = {};
        getEthPriceNow().then(result => {
            this.prices.USD = result[Object.keys(result)[0]].ETH.USD;
            this.prices.EUR = result[Object.keys(result)[0]].ETH.EUR;
        });
        this.search = "";
        this.children_infos = {};
        this.filter = this.filter.bind(this);
        this.updateInfos = this.updateInfos.bind(this);
    }

    updateInfos(key, name, symbol) {
        this.children_infos[key] = {
            name,
            symbol
        }
    }

    shouldComponentUpdate(nextProps) {
        let ret = false;
        for (; this.feed_size < nextProps.feed.length; ++this.feed_size) {
            if (nextProps.feed[this.feed_size].contract_name === 'Ticket721Event') {
                for (let manifest_idx = 0; manifest_idx < this.props.manifest.length; ++manifest_idx) {
                    if (this.props.manifest[manifest_idx].address.toLowerCase() === nextProps.feed[this.feed_size].contract_address.toLowerCase()) {
                        const ticket721Card = <Ticket721Card address={nextProps.feed[this.feed_size].contract_address.toLowerCase()} fiat={this.prices} onUpdate={this.updateInfos} _key={this.feed_size} key={this.feed_size}/>;
                        this.node_array[this.props.manifest[manifest_idx].status].push(
                            ticket721Card
                        );
                        this.node_array.all.push(ticket721Card);
                        if (!ret)
                            ret = true;
                    }
                }
            }
        }
        if (this.search !== nextProps.search) {
            this.search = nextProps.search;
            ret = true;
        }
        return (ret);
    }

    filter(elem) {
        return (Fuzzy.test(this.props.search, this.children_infos[elem.key].name));
    }

    render() {
        if (this.props.search === "") {
            return (<div>
                <Row gutter={16}>
                    <h3 className="section_title">hot 🔥</h3>
                    {this.node_array.hot}
                </Row>
                <Row gutter={16}>
                    <h3 className="section_title">new ✨</h3>
                    {this.node_array.new}
                </Row>
                <Row gutter={16}>
                    <h3 className="section_title">soon 🕣</h3>
                    {this.node_array.soon}
                    {this.node_array.none}
                </Row>
            </div>)
        } else {
            return (<Row gutter={16}>
                {this.node_array.all.filter(this.filter)}
            </Row>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    let selector;
    if (!ownProps.selector)
        selector = FeedFilter(FeedType.Contracts);
    return {
        feed: ownProps.selector ? ownProps.selector(state) : selector(state),
        selector: ownProps.selector || selector,
        manifest: ownProps.manifest,
        search: state.search
    }
};

export const SaleLister = connect(_SaleLister, mapStateToProps);



