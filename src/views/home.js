import React from 'react';
import {Filter} from "../components/filter";
import {SaleLister} from '../components/sale_lister';
import * as Manifest from '../../manifest.js';
import {withRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import './home.css';

class _Home extends React.Component {
    render() {
        return (
                <div style={{
                    width: "100%",
                    backgroundColor: '#ffffff'
                }}>
                    <div style={{
                        marginLeft: '30px'
                    }}>
                    <h2 className="main_title">TickΞt721</h2>
                    <Filter/>
                    <SaleLister manifest={Manifest}/>
                    </div>
                </div>
        )
    }
}

export const Home = withRouter(_Home);
