import * as React from "react";
import NotificationSystem from "react-notification-system";
import {connect} from 'vort_x-components';
import { notification } from 'antd'

class _FeedNotifications extends React.Component {

    constructor(props) {
        super(props);
        this.initialRender = false;
        this.notified = 0;
        this._notificationSystem = null;
    }

    shouldComponentUpdate(nextProps) {
        if (this.notified < nextProps.feed.length) {
            for (let start_idx = this.notified; start_idx < nextProps.feed.length; ++start_idx) {
                switch (nextProps.feed[start_idx].action) {
                    case 'NEW_ERROR':
                        notification.open({message: nextProps.feed[start_idx].error.when, description: nextProps.feed[start_idx].error.message});
                        break ;
                    case 'NEW_CONTRACT':
                        notification.open({message: nextProps.feed[start_idx].contract_name, description: "Loaded instance at " + nextProps.feed[start_idx].contract_address})
                        break ;
                    case 'NEW_TRANSACTION':
                        notification.open({message: 'New Transaction Broadcasted', description: nextProps.feed[start_idx].transaction_hash});
                        break ;
                    default:
                        break ;
                }
            }
            this.notified = nextProps.feed.length;
        }
        return !this.initialRender;
    }

    render() {
        this.initialRender = true;
        return (<div>
            <div>
                {this.props.children}
            </div>
        </div>)
    }

}

const mapStateToProps = (state) => {
    return {
        feed: state.feed
    }
};

export const FeedNotifications = connect(_FeedNotifications, mapStateToProps);
