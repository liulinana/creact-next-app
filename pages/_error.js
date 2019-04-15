import React from 'react'

export default class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode }
    }

    render() {
        return (
            <p style={{margin: "20% 45%"}}>
                {this.props.statusCode
                    ? `对不起小主(╯﹏╰)未找到页面 ${this.props.statusCode}`
                    : '客户端出错'}
            </p>
        )
    }
}
