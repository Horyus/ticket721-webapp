import React from 'react';
import {updateSearch} from "../../redux/search/search.actions";
import {connect} from 'vort_x-components';

import './index.css';

class _Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = "";
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.updateSearch(event.target.value);
    }

    render() {
        return (<input value={this.props.search} className="main_input" placeholder="🔎" type="text" onChange={this.onChange}/>)
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       updateSearch: (new_value) => dispatch(updateSearch(new_value))
    }
};

export const Filter = connect(_Filter, mapStateToProps, mapDispatchToProps);
