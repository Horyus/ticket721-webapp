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
                <Card className="csapi-tracker" title="cache status" bodyStyle={{height: '150px'}}>
                    <div style={{height: '50px', lineHeight: '50px'}}>
                        <Icon type="database" style={{marginLeft: '10px', lineHeight: '50px', verticalAlign: 'middle', fontSize: 20, color: color, float: 'left', marginRight: '5px'}}/>
                        <p className="status">{title}</p>
                        <div style={{textAlign: 'center'}}>
                            <Button type="primary" onClick={this.run_register}>Register</Button>
                        </div>
                    </div>
                </Card>
            );
        else if (title === 'disconnected')
            return (
                <Card className="csapi-tracker" title="cache status" bodyStyle={{height: '150px'}}>
                    <div style={{height: '50px', lineHeight: '50px'}}>
                        <Icon type="database" style={{marginLeft: '10px', lineHeight: '50px', verticalAlign: 'middle', fontSize: 20, color: color, float: 'left', marginRight: '5px'}}/>
                        <p className="status">{title}</p>
                        <div style={{textAlign: 'center'}}>
                            <Button type="primary" onClick={this.run_connect}>Connect</Button>
                        </div>
                    </div>
                </Card>
            );
        else
            return (
                <Card className="csapi-tracker" title="cache status">
                    <div style={{height: '50px', lineHeight: '50px'}}>
                        <Icon type="database" style={{marginLeft: '10px', lineHeight: '50px', verticalAlign: 'middle', fontSize: 20, color: color, float: 'left', marginRight: '5px'}}/>
                        <p className="status">{title}</p>
                    </div>
                </Card>
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

