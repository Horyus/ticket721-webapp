import React from 'react';
import {connect} from 'vort_x-components';
import {getContract, callContract} from 'vort_x';
import Web3Utils from 'web3-utils';
import {Row, Col, Card} from 'antd';

import './index.css';
import {CompanionSettings} from "./companion_settings";

export class _Settings extends React.Component {
    render() {
        return (<div style={{
            width: "98%",
            minHeight: "110%",
            backgroundColor: '#ffffff'
        }}>
            <div style={{width: '100%'}}>
                {
                    this.props.account
                        ?
                        <p className="account_title">{this.props.account}</p>
                        :
                        <p></p>
                }
            </div>
            <div style={{padding: 30}}>
            <Row gutter={16}>
                <Col span={8}>

                    <style>{`
                        .ant-card-head-title {
                            font-family: 'Roboto', sans-serif;
                            font-weight: 300;
                            font-size: 25px;
                        }
                    `}</style>

                    <Card
                        title="companion settings"
                        headstyle={{
                            fontFamily: 'Roboto, sans-serif'
                        }}
                        className="card"
                        style={{width: '100%'}}>
                        <CompanionSettings/>
                    </Card>
                </Col>
            </Row>
            </div>
        </div>)

    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        account: Web3Utils.toChecksumAddress(state.web3.coinbase)
    }
};

export const Settings = connect(_Settings, mapStateToProps);
