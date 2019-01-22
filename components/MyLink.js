import React from 'react'
import { withRouter } from 'next/router'

class MyLink extends React.Component {

    componentDidMount() {
        const { router } = this.props;
        router.prefetch('/error')
    }

    render() {
        const { router } = this.props;
        return (
            <div>
                <a onClick={() => setTimeout(() => router.push('/error'), 100)}>
                    A route transition will happen after 100ms
                </a>
            </div>
        )
    }
}

export default withRouter(MyLink)