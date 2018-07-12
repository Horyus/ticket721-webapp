import React from 'react';

export class Sale extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.address);
    }

    render() {
        return (
            <div>
                <h2>
                    SALE
                </h2>
            </div>
        )
    }
}
