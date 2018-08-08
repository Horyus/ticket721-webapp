import React from 'react';
import {Filter} from "../components/filter";
import {SaleLister} from '../components/sale_lister';
import {withRouter} from 'react-router-dom';
import {updateSearch} from "../redux/search/search.actions";
import {connect} from 'vort_x-components';
import 'antd/dist/antd.css';
import './home.css';

let listening = false;

class __Home extends React.Component {
    render() {
        if (!listening)
            this.props.history.listen(() => {this.props.resetSearch()});
        return (
            <div style={{
                width: "98%",
                minHeight: "110%",
                backgroundColor: '#ffffff'
            }}>
                <div style={{
                    marginLeft: '30px'
                }}>
                    <h2 className="main_title">TickΞt721</h2>
                    <Filter/>
                    <SaleLister/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetSearch: () => {
            dispatch(updateSearch(""))
        }
    }
};

const _Home = connect(__Home, (_, props) => props, mapDispatchToProps);

export const Home = withRouter(_Home);
