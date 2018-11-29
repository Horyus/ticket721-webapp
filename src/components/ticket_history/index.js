import React from 'react';
import {connect} from 'vort_x-components';
import {CsApiGetHistory} from "../../redux/csapi/csapi.actions";
import {Table, Divider, Tag} from 'antd';

class _TicketHistory extends React.Component {

    constructor(props) {
        super(props);
        this.props.fetch();
    }

    shouldComponentUpdate(newProps, newState, newContext) {
        if (newProps.history === undefined) {
            this.props.fetch();
        }
        console.log(newProps.history);
        return true;
    }

    render() {

        const columns = [{
            title: 'action',
            dataIndex: 'action',
            key: 'action',
            render: text => <h4>{text}</h4>,
        }, {
            title: 'owner',
            dataIndex: 'owner',
            key: 'owner',
        }, {
            title: 'block',
            dataIndex: 'block',
            key: 'block',
        }];

        const data = this.props.history ? this.props.history.history.map((e, idx) => {
            return {
                action: e.action,
                owner: e.owner,
                block: e.block,
                key: idx
            }
        }) : [];

        return (
            <div>
                <Table bordered columns={columns} dataSource={data}/>
            </div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        history: state.csapi.ticket_histories[ownProps.id]
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        fetch: () => {dispatch(CsApiGetHistory(ownProps.verified, ownProps.id))}
    };
};

export const TicketHistory = connect(_TicketHistory, mapStateToProps, mapDispatchToProps);
