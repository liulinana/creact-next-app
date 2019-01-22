import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Header from '../components/Header'
import MyLink from'../components/MyLink'
import { Button, Form } from 'antd';
import {prefectWithRouter} from '../components/publickCompent'
import Head from 'next/head'
Router.events.on('routeChangeStart', (url)=>{console.log('App is changing to: ', url)})
// @prefectWithRouter()
// @Form.create()
export default class Home extends React.Component{
    static async getInitialProps({ req }) {
        // const res = await fetch('https://api.github.com/repos/zeit/next.js');
        // const json = await res.json();
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        return { userAgent }
    };

    handler = () => {
        Router.push({
            pathname: '/about',
            query: { name: 'Zeit' }
        })
    };


    render () {
        return (
            <div>
                <Head>
                    <title>练习</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Header />
                <MyLink/>
                {/*<MyApp/>*/}
                <div className="size">ddddd Welcome to next.js!</div>
                <img src="/static/8c8c31b7be237a8057dc7174ee7ab102.jpg" width="200" alt="my image" />
                <br/>
                Hello World {this.props.userAgent}
                <br/>
                {/*{this.props.json}*/}
                <Link prefetch  href={{ pathname: '/about', query: { name: 'Zeit' } }} >
                    <a
                        onMouseEnter={() => { Router.prefetch('/about'); console.log('prefetching /about!') }}
                    ><img src="/static/8c8c31b7be237a8057dc7174ee7ab102.jpg" alt="image" width="100"/></a>
                </Link>
                <Link scroll={false} href="/?counter=10"><a>Disables scrolling</a></Link>
                <Link prefetch href="/?counter=10"><a>Changes with scrolling to top</a></Link>
                <br/>
                Click <span onClick={() => Router.push('/about')}>here</span> to read more
                <div>
                    Click <span onClick={this.handler}>here</span> to read more
                </div>
                <Button type="primary" >antd</Button>
            </div>
        )
    }
}