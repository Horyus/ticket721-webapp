import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

export class CloseSaleForm extends React.Component {

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
        this.props.submit_handle();
    }

    render() {
        return (
            <div>
                <Button
                    type="danger"
                    onClick={this.handleSubmit}
                >
                    Close Sale
                </Button>
            </div>
        )
    }
}
