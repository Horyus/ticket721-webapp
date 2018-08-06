import React from 'react';

import './description.css';

export class Description extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className="sale_description_card" style={{
                height: '100%',
            }}>

                {
                    this.props.description
                        ?
                        <h2>{this.props.description}</h2>
                        :
                        null
                }
                <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                <h2>Address</h2>
                <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                <h2>Dates</h2>
                <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>

            </div>
        )
    }
}
