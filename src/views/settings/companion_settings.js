import React from 'react';
import {getContract, callContract} from 'vort_x';
import {connect} from 'vort_x-components';
import {ComponentLoader} from "../../components/component_loader";
import {Form, Input, Button} from 'antd';
const FormItem = Form.Item;

import './companion_settings.css';
import {CsApiGetAddressFromCode} from "../../redux/csapi/csapi.actions";

class _CompanionSettings extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.link = this.link.bind(this);
        this.bc_link = this.bc_link.bind(this);
        this.state = {
            value: "",
            submitted: null,
            first_value: null
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value.toUpperCase()
        });
    }

    link() {
        this.props.getAddress(this.state.value);
        this.setState({
            submitted: this.state.value
        });
    }

    bc_link()  {
        this.props.link(this.props.codes[this.state.submitted]);
    }

    shouldComponentUpdate(newProps) {
        if (this.state.first_value === null && newProps.companion_address) {
            this.setState({
                first_value: newProps.companion_address
            })
        }
        if (this.state.first_value !== newProps.companion_address) {
            this.setState({
                submitted: null,
                value: "",
                first_value: newProps.companion_address
            })
        }
        return true;
    }

    render() {
        if (!this.props.companion_address) {
            return <ComponentLoader/>
        } else {

            let link_code_status;
            switch (this.props.codes[this.state.submitted]) {
                case 'Invalid Code':
                case 'Fetching ...':
                    link_code_status = <p className="status">{this.props.codes[this.state.submitted]}</p>;
                    break ;
                case undefined:
                    link_code_status = null;
                    break ;
                default:
                    link_code_status = <div>
                        <p className="status">Is this the correct companion address ?</p>
                        <code className="status_address">{this.props.codes[this.state.submitted]}</code>
                        <br/>
                        <Button
                            type="primary"
                            onClick={this.bc_link}
                            style={{
                                marginTop: 20
                            }}
                        >
                            Yes !
                        </Button>
                    </div>;
                    break ;
            }

            return (
                <div className="text_container">
                    {
                        this.props.companion_address === '0x0000000000000000000000000000000000000000'
                            ?
                            <div>
                                <p className="text">Your account is not linked.</p>
                                <p className="text">Download the Ticket721 Companion application and follow the
                                    instructions.</p>
                            </div>
                            :
                            <div>
                                <p className="text">Your account is linked to {this.props.companion_address}.</p>
                            </div>
                    }
                    <div>
                        <input className="code_input" value={this.state.value} type="text" placeholder="Enter Link Code" onChange={this.handleChange}/>
                        <Button
                            type="primary"
                            onClick={this.link}
                        >
                            Link !
                        </Button>
                        {
                            this.state.submitted
                                ?
                                link_code_status
                                :
                                null
                        }
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        companion_address: callContract(getContract(state, 'Ticket721Hub'), 'accounts', state.web3.coinbase),
        link: (address) => {getContract(state, 'Ticket721Hub').vortexMethods.setCompanion.send(address)},
        codes: state.csapi.codes
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        getAddress: (code) => {dispatch(CsApiGetAddressFromCode(code))}
    }
};

export const CompanionSettings = connect(_CompanionSettings, mapStateToProps, mapDispatchToProps);
