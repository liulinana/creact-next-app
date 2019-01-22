import React from 'react'
import { withRouter } from 'next/router'



export const prefectWithRouter=((Component)=>{
    return withRouter(Component)
})