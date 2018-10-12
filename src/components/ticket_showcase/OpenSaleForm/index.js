import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

export class OpenSaleForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            value: 0
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value.toUpperCase()
        });
    }

    handleSubmit() {
        this.props.submit_handle(this.state.value);
    }

    render() {
        return (
            <div>
                <input className="code_input" value={this.state.value} type="number" placeholder="Enter desired sale price" onChange={this.handleChange}/>
                <Button
                    type="primary"
                    onClick={this.handleSubmit}
                >
                    Start Sale !
                </Button>
            </div>
        )
    }
}
