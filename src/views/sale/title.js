import React from 'react';
import {Row} from 'antd';

import './title.css';

export class Title extends React.Component {

    render() {

        let name;
        if (this.props.csapi_infos && this.props.csapi_infos.length && this.props.csapi_infos[0].name)
            name = this.props.csapi_infos[0].name;

        return (
            <Row className="sale_title_row">
                <h1 className="sale_title_h1">
                    {name}
                </h1>
            </Row>
        )
    }

}
