import React from 'react';
import {CsApiGetSoldTickets} from "../../redux/csapi/csapi.actions";
import {connect} from 'vort_x-components';
import {Button, Table} from "antd";
import * as Web3Utils from 'web3-utils';

import './index.css';

class _Marketplace extends React.Component {
    constructor(props) {
        super(props);

        this.props.fetch();
    }

    render() {

        const dataSource = [];

        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Event Name',
            dataIndex: 'ename',
            key: 'ename',
        }, {
            title: 'Event Address',
            dataIndex: 'eaddress',
            key: 'eaddress',
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (id) => {
                return (
                    <a href={"/ticket/verified/" + id}><Button>Buy !</Button></a>
                )
            }
        }];

        for (let idx = 0; idx < this.props.tickets.length; ++idx) {
            let table_element = {
                id: this.props.tickets[idx].id,
                eaddress: 'loading ...',
                ename: 'loading ...',
                price: 'loading ...',
                link: this.props.tickets[idx].id
            };
            switch (this.props.tickets[idx].status) {
                case 'NONE':
                    break;
                case 'FETCHING':
                    break;
                case 'FETCHED':
                    if (this.props.ipfs[this.props.tickets[idx].infos.ipfs] && this.props.ipfs[this.props.tickets[idx].infos.ipfs].content) {
                        try {
                            const data = JSON.parse(this.props.ipfs[this.props.tickets[idx].infos.ipfs].content.toString());
                            table_element.ename = data.name;
                            table_element.eaddress = this.props.tickets[idx].infos.eaddress;
                            table_element.price = Web3Utils.fromWei(this.props.tickets[idx].infos.price, 'ether') + ' Ξ';
                        } catch (e) {
                            table_element = undefined;
                        }
                    }
                    break;
            }
            if (table_element) {
                dataSource.push(table_element);
            }
        }

        return (<div className="table_container">
            <Table dataSource={dataSource} columns={columns} />
        </div>)
    }
}

const mapStateToProps = (state) => {
    return ({
        status: state.csapi.sold_ticket_status,
        tickets: state.csapi.sold_tickets,
        ipfs: state.ipfs
    })
};

const mapDispatchToProps = (dispatch) => {
    return ({
        fetch: () => (dispatch(CsApiGetSoldTickets(true)))
    })
};

export const Marketplace = connect(_Marketplace, mapStateToProps, mapDispatchToProps);
