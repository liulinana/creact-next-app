import React from 'react';
import Header from '../components/Header'

export default class About extends React.Component{

    state = {};

    componentWillMount () {
        console.log("sss",this.props.url.query)
    }

    render () {
        return (
            <div>
                <Header />
                <p>Welcome to About!</p>
            </div>
        )
    }

}

