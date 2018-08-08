import React from 'react';
import {Row} from 'antd';

import './title.css';

export class Title extends React.Component {

    render() {
        return (
            <Row className="sale_title_row">
                <h1 className="sale_title_h1">
                    {this.props.name}
                </h1>
            </Row>
        )
    }

}
