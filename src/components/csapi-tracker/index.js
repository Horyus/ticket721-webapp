import React from 'react';
import { Card, Icon, Button } from 'antd';
import {connect} from 'vort_x-components'

import './index.css';
import {CsApiCallConnect, CsApiCallRegister} from "../../redux/csapi/csapi.actions";


export class _CsApiTracker extends React.Component {

    constructor(props) {
        super(props);

        this.run_register = this.run_register.bind(this);
        this.run_connect = this.run_connect.bind(this);
    }

    run_register() {
        this.props.register();
    }

    run_connect() {
        this.props.connect();
    }

    render() {
        let color;
        switch (this.props.csapi.status) {
            case 'DISCONNECTED':
                color = "red";
                break;
            case 'CONNECTED':
                color = "green";
                break;
            case 'NOT_REGISTERED':
                color = 'orange';
        }

        let title;
        switch (this.props.csapi.status) {
            case 'DISCONNECTED':
                title = 'disconnected';
                break;
            case 'CONNECTED':
                title = 'connected';
                break;
            case 'NOT_REGISTERED':
                title = 'not registered';
        }

        if (title === 'not registered')
            return (
                <Card className="csapi-tracker">
                    <div style={{textAlign: 'center'}}>
                        <p>You are not registered</p>
                        <Button type="primary" onClick={this.run_register}>Register</Button>
                    </div>
                </Card>
            );
        else if (title === 'disconnected')
            return (
                <Card className="csapi-tracker">
                    <div style={{textAlign: 'center'}}>
                        <p>You are not connected</p>
                        <Button type="primary" onClick={this.run_connect}>Connect</Button>
                    </div>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        csapi: state.csapi
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: () => (dispatch(CsApiCallRegister())),
        connect: () => (dispatch(CsApiCallConnect()))
    }
};

export const CsApiTracker = connect(_CsApiTracker, mapStateToProps, mapDispatchToProps);

