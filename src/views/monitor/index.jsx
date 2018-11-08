import React from "react";

import Diagram from '../../components/diagram';

import data from './demo';

class Monitor extends React.PureComponent {

    render() {        
        return (
            <Diagram data={data}/>
        );
    }
}

export default (Monitor);