import React from 'react';
import {SaleLister} from '../components/sale_lister';
import * as Manifest from '../../manifest.json';
import 'antd/dist/antd.css';
import './home.css';

export class Home extends React.Component {
    render() {
        return (
            <div style={{
                width: "90%",
                marginLeft: "5%",
                marginTop: "5%",
            }}>
                <h2 className="main_title">TickΞt721 Marketplace</h2>
                <SaleLister manifest={Manifest}/>
            </div>
        )
    }
}
