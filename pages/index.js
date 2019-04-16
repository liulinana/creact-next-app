import React from 'react'
import { withRouter } from 'next/router'
import { Button, Form } from 'antd'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../store'
import '../static/styles.less';
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

    state={
        theme: 'dark',
        current: null,
        collapsed: false,
    };

    //更换主题
    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    handleClick = (e,special) => {
        this.setState({
            current: e.key || special,
        });
    };

    //sider自定义触发器
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    toLogin = () => {
        this.props.router.push('/mock/about')
    };

    aa = () => {
        this.props.router.push('/home')
    }
    render () {
        return (
        <div>
            {/*/!*<Link prefetch  href={{ pathname: '/home', query: { name: 'Zeit' } }} >*!/*/}
                {/*/!*<a*!/*/}
                    {/*/!*onMouseEnter={() => { Router.prefetch('/home'); console.log('prefetching /home!') }}*!/*/}
                {/*/!*><img src="/static/8c8c31b7be237a8057dc7174ee7ab102.jpg" alt="image" width="100"/></a>*!/*/}
            {/*/!*</Link>*!/*/}
            <Button onClick={()=>this.props.router.push('/Frame')}>首页</Button>
        </div>
    )
  }
}
export default connect()(withRouter(Home))


