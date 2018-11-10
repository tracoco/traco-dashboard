import React from "react";

import { Hawkeyes } from 'react-hawkeye';

import data from './demo';

class Monitor extends React.PureComponent {

    render() {        
        return (
            <Hawkeyes config={data}/>
        );
    }
}

export default (Monitor);