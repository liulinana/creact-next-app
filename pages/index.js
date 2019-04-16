import React from 'react'
import { Menu, Icon, Switch, Layout, Row, Col} from 'antd';
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import { Button, Form } from 'antd'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../store'
import Examples from '../components/examples'
import '../static/styles.less';
import Router from "next/router"

const SubMenu = Menu.SubMenu;
const { Header, Content, Sider: Frame } = Layout;

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
        current: 'home',
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
        // this.props.history.push(`/`)
    };


    render () {
    return (
        <div>
            {/*<Head title="Home" />*/}
            {/*<Nav />*/}
            {/*<Examples />*/}
            {/*<Link prefetch  href={{ pathname: '/home', query: { name: 'Zeit' } }} >*/}
                {/*<a*/}
                    {/*onMouseEnter={() => { Router.prefetch('/home'); console.log('prefetching /home!') }}*/}
                {/*><img src="/static/8c8c31b7be237a8057dc7174ee7ab102.jpg" alt="image" width="100"/></a>*/}
            {/*</Link>*/}
            {/*<Button type="primary" ghost>antd</Button>*/}
            <Layout>
                <Header stylename="header">
                    <div>
                        <Row>
                            <Col span={1}>
                                <p style={{color:"white"}}>主题:</p>
                            </Col>
                            <Col span={1}>
                                <Switch
                                    checked={this.state.theme === 'dark'}
                                    onChange={this.changeTheme}
                                    checkedChildren="Dark"
                                    unCheckedChildren="Light"
                                />
                            </Col>
                            <Col span={4}>
                                <Icon
                                    stylename="trigger"
                                    style={{color:"white",marginLeft:"10%"}}
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Col>
                            <div
                                 onClick={this.toLogin}
                                 style={{color:"white", marginLeft: '94%'}}
                            >
                                <span>退出登录</span>
                                <Icon type="logout"/>
                            </div>
                        </Row>
                    </div>
                </Header>
                <Layout>
                    <Frame
                       width={200}
                       style={{ background: '#fff' }}
                       trigger={null}
                       collapsible
                       collapsed={this.state.collapsed}
                    >
                        <Menu
                            mode="inline"
                            style={{ height: 670, borderRight: 0, overflow: 'scroll', }}
                            theme={this.state.theme}
                            defaultOpenKeys={['']}
                            selectedKeys={[this.state.current]}
                            onClick={this.handleClick}
                        >
                            {/*{*/}
                                {/*allMenu.map((subMenu,k) => {*/}
                                    {/*if (subMenu.children && subMenu.children.length) {*/}
                                        {/*return (*/}
                                            {/*<SubMenu key={subMenu.url}*/}
                                                     {/*title={*/}
                                                         {/*<span>*/}
                                                                 {/*<Icon type={subMenu.icon} key={k}/>*/}
                                                                 {/*<span>*/}
                                                                     {/*{subMenu.name}*/}
                                                                 {/*</span>*/}
                                                             {/*</span>*/}
                                                     {/*}*/}
                                            {/*>*/}
                                                {/*{*/}
                                                    {/*subMenu.children.map((menu,k) => {*/}
                                                        {/*if ("url" in menu) {*/}
                                                            {/*return <Menu.Item key={menu.url}>*/}
                                                                {/*<Link to={`/frame${menu.url}`}>{menu.name}</Link>*/}
                                                            {/*</Menu.Item>*/}
                                                        {/*}else {*/}
                                                            {/*return <Menu.Item key={k}>*/}
                                                                {/*<Link to={`/frame/error`}>{menu.name}</Link>*/}
                                                            {/*</Menu.Item>*/}
                                                        {/*}*/}
                                                    {/*})*/}
                                                {/*}*/}
                                            {/*</SubMenu>*/}
                                        {/*)*/}
                                    {/*}*/}
                                    {/*return (*/}
                                        {/*<Menu.Item key={subMenu.url}>*/}
                                            {/*<Link to={`/frame${subMenu.url}`}>*/}
                                                {/*<Icon type={subMenu.icon} key={subMenu.icon} />*/}
                                                {/*<span stylename="nav-text">{subMenu.name}</span>*/}
                                            {/*</Link>*/}
                                        {/*</Menu.Item>*/}
                                    {/*)*/}
                                {/*})*/}
                            {/*}*/}
                        </Menu>
                    </Frame>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <div style={{margin: '15px 0'}}>
                            {/*<Breadcrumbs/>*/}
                        </div>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                overflow: 'scroll',
                                position: 'relative'
                            }}
                        >
                            <div>
                                {/*{allMenu.map((route, i) =>*/}
                                    {/*<RouteWithSubRoutes key={i} {...route} />*/}
                                {/*)}*/}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
  }
}
export default connect()(Home)


