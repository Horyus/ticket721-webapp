import React from 'react';
import { Card, Icon, Button } from 'antd';
import {connect} from 'vort_x-components'

import './index.css';
import {CsApiCallConnect, CsApiCallRegister} from "../../redux/csapi/csapi.actions";
import { Nav, NavIcon, NavText , withRR4} from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import { chevronsRight, logOut, edit} from 'react-icons-kit/feather';


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
                <div onClick={this.run_register}>
                    <Nav id="connect" >
                        <NavIcon>
                            <SvgIcon size={20} icon={edit}/>
                        </NavIcon>
                        <NavText><p className="navbar_action">register</p></NavText>
                    </Nav>
                </div>
            );
        else if (title === 'disconnected')
            return (
                <div onClick={this.run_connect}>
                    <Nav id="connect" >
                        <NavIcon>
                            <SvgIcon size={20} icon={chevronsRight}/>
                        </NavIcon>
                        <NavText><p className="navbar_action">log in</p></NavText>
                    </Nav>
                </div>
            );
        else
            return (
                <div onClick={this.run_connect}>
                    <Nav id="connect" >
                        <NavIcon>
                            <SvgIcon size={20} icon={logOut}/>
                        </NavIcon>
                        <NavText><p className="navbar_action">log out</p></NavText>
                    </Nav>
                </div>
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

