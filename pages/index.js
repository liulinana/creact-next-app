import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import { Button, Form } from 'antd'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../store'
import Examples from '../components/examples'
import '../static/styles.less'
import Router from "next/router"

@Form.create()
class Home extends React.Component{

    static getInitialProps ({ reduxStore, req }) {
        const isServer = !!req;
        reduxStore.dispatch(serverRenderClock(isServer));
        return {}
    }

    componentDidMount () {
        const {dispatch} = this.props;
        this.timer = startClock(dispatch)
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    render () {
    return (
        <div>
            <Head title="Home" />
            <Nav />
            <Examples />
            <Link prefetch  href={{ pathname: '/home', query: { name: 'Zeit' } }} >
                <a
                    onMouseEnter={() => { Router.prefetch('/home'); console.log('prefetching /home!') }}
                ><img src="/static/8c8c31b7be237a8057dc7174ee7ab102.jpg" alt="image" width="100"/></a>
            </Link>
            <Button type="primary" ghost>antd</Button>
            <div className="hero">
                <h1 className="title">Welcome to Next!</h1>
                <p className="description">
                    To get started, edit <code>pages/index.js</code> and save to reload.
                </p>

                <div className="row">
                    <Link href="https://github.com/zeit/next.js#getting-started">
                        <a className="card">
                            <h3>Getting Started &rarr;</h3>
                            <p>Learn more about Next on Github and in their examples</p>
                        </a>
                    </Link>
                    <Link href="https://open.segment.com/create-next-app">
                        <a className="card">
                            <h3>Examples &rarr;</h3>
                            <p>
                                Find other example boilerplates on the{' '}
                                <code>create-next-app</code> site
                            </p>
                        </a>
                    </Link>
                    <Link href="https://github.com/segmentio/create-next-app">
                        <a className="card">
                            <h3>Create Next App &rarr;</h3>
                            <p>Was this tool helpful? Let us know how we can improve it</p>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
  }
}
export default connect()(Home)


