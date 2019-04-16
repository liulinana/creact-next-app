import React from 'react'
import { Menu, Icon, Switch, Layout, Row, Col} from 'antd';
import { withRouter } from 'next/router'
import { Button, Form } from 'antd'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../store'
import Error from './_error'
import '../static/styles.less';
import ActiveLink from "../components/ActiveLink";
import menu from '../router/menu'

const SubMenu = Menu.SubMenu;
const { Header, Content, Sider: Frame } = Layout;

@Form.create()
class FrameManage extends React.Component{

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
    render () {
        return (
            <div>
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
                                defaultOpenKeys={['sub1']}
                                selectedKeys={[this.state.current]}
                                onClick={this.handleClick}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                                    <Menu.Item key="about">about</Menu.Item>
                                    <Menu.Item key="home">home</Menu.Item>
                                    <Menu.Item key="3">Option 3</Menu.Item>
                                    <Menu.Item key="4">Option 4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
                                    <Menu.Item key="5">Option 5</Menu.Item>
                                    <Menu.Item key="6">Option 6</Menu.Item>
                                    <SubMenu key="sub3" title="Submenu">
                                        <Menu.Item key="7">Option 7</Menu.Item>
                                        <Menu.Item key="8">Option 8</Menu.Item>
                                    </SubMenu>
                                </SubMenu>
                                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                                    <Menu.Item key="9">Option 9</Menu.Item>
                                    <Menu.Item key="10">Option 10</Menu.Item>
                                    <Menu.Item key="11">Option 11</Menu.Item>
                                    <Menu.Item key="12">Option 12</Menu.Item>
                                </SubMenu>
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
                                {
                                    this.state.current ?
                                        menu.map(
                                            (v,k) => {
                                                if (this.state.current === v.key ) {
                                                    return <ActiveLink key={k}>{v.compent}</ActiveLink>
                                                }
                                            }
                                        )
                                    : null
                                }
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default connect()(withRouter(FrameManage))


