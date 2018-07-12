import React from 'react';
import {Vortex} from 'vort_x';

export class ManifestLoader extends React.Component {
    constructor(props) {
        super(props);
        for (let sale = 0; sale < this.props.manifest.length; ++sale) {
            Vortex.get().loadContract("Ticket721Event", this.props.manifest[sale].address);
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
