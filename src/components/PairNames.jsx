import React from 'react'

const PairNames = ({pair})=> {
    let names = Object.entries(pair.users).map(([id, user]) => `${user.initials}`)
    let working = pair.working ? ' - ' + pair.working : ''
    let pairText = names.length === 1 ? `${names[0]} (solo)` : `${names.join(' & ')}`
    return(
        <li>{pairText} {working}</li>
    )
}

export default PairNames