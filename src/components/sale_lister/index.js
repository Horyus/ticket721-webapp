import React from 'react';
import {FeedType, getFeed} from 'vort_x';
import {connect} from 'vort_x-components';
import {Ticket721Card} from "../ticket721-card";
import {Row} from 'antd';
import {getEthPriceNow} from 'get-eth-price';
import * as Fuzzy from 'fuzzy';

class _SaleLister extends React.Component {

    node_array = {
        hot: [],
        new: [],
        none: [],
        soon: [],
        all: []
    };

    constructor(props) {
        super(props);
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
        this.populate(this.props);
        this.shouldComponentUpdate(this.props);
    }

    updateInfos(key, name, symbol) {
        this.children_infos[key] = {
            name,
            symbol
        }
    }

    populate(nextProps) {
        for (; this.feed_size < nextProps.events.length; ++this.feed_size) {

            const ticket721Card = <Ticket721Card address={nextProps.events[this.feed_size].address.toLowerCase()} event={nextProps.events[this.feed_size]} fiat={this.prices} onUpdate={this.updateInfos} _key={this.feed_size} key={this.feed_size}/>;
            this.node_array[nextProps.events[this.feed_size].category].push(
                ticket721Card
            );
            this.node_array.all.push(ticket721Card);
        }
    }

    shouldComponentUpdate(nextProps) {
        let ret = false;
        for (; this.feed_size < nextProps.events.length; ++this.feed_size) {

            const ticket721Card = <Ticket721Card address={nextProps.events[this.feed_size].address.toLowerCase()} event={nextProps.events[this.feed_size]} fiat={this.prices} onUpdate={this.updateInfos} _key={this.feed_size} key={this.feed_size}/>;
            this.node_array[nextProps.events[this.feed_size].category].push(
                ticket721Card
            );
            this.node_array.all.push(ticket721Card);
            if (!ret)
                ret = true;
        }
        if (this.search !== nextProps.search) {
            this.search = nextProps.search;
            ret = true;
        }
        return (ret);
    }

    filter(elem) {
        if (this.children_infos[elem.key])
            return (Fuzzy.test(this.props.search, this.children_infos[elem.key].name));
        return false;
    }

    render() {
        if (this.props.search === "") {
            return (<div>
                {
                    this.node_array.hot.length
                        ?
                        <Row gutter={16}>
                            <h3 className="section_title">hot 🔥</h3>
                            {this.node_array.hot}
                        </Row>
                        :
                        <div></div>
                }
                {
                    this.node_array.new.length
                        ?
                        <Row gutter={16}>
                            <h3 className="section_title">new ✨</h3>
                            {this.node_array.new}
                        </Row>
                        :
                        <div></div>
                }
                {
                    this.node_array.soon.length
                        ?
                        <Row gutter={16}>
                            <h3 className="section_title">soon 🕣</h3>
                            {this.node_array.soon}
                        </Row>
                        :
                        <div></div>
                }
                {
                    this.node_array.none.length
                        ?
                        <Row gutter={16}>
                            {this.node_array.none}
                        </Row>
                        :
                        <div></div>
                }
            </div>)
        } else {
            return (<Row gutter={16}>
                {this.node_array.all.filter(this.filter)}
            </Row>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        feed: getFeed(state, FeedType.Contracts),
        events: state.csapi.events,
        search: state.search
    }
};

export const SaleLister = connect(_SaleLister, mapStateToProps);



