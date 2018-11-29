import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

export class BuySaleForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            value: 0
        }
    }

    handleSubmit() {
        this.props.submit_handle();
    }

    render() {
        return (
            <div>
                <Button
                    type="primary"
                    onClick={this.handleSubmit}
                >
                    Buy Ticket
                </Button>
            </div>
        )
    }
}
