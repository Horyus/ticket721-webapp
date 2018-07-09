import React from 'react';
import {Filter} from "../components/filter";
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
                <h2 className="main_title">TickΞt721</h2>
                <Filter/>
                <SaleLister manifest={Manifest}/>
            </div>
        )
    }
}
