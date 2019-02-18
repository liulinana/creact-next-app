import {connect} from 'react-redux'
import { withRouter } from "next/router";
import Clock from './clock'
import Counter from './counter'

function Examples ({ lastUpdate, light }) {
    return (
        <div>
            <Clock lastUpdate={lastUpdate} light={light} />
            <Counter />
        </div>
    )
}

// export const Containerization = (mapStateToProps) =>(Component)=> {
//     if(mapStateToProps ){
//         return withRouter(connect(mapStateToProps)(Component))
//     } else {
//         return withRouter(Component);
//     }
//
// };

function mapStateToProps (state) {
    const { lastUpdate, light } = state;
    return { lastUpdate, light }
}

export default connect(mapStateToProps)(Examples)