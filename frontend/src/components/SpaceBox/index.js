import React from 'react'
import styled from "styled-components"

const Root = styled.div`
    ${({ top, bottom, left, right, fullwidth  }) => `
        margin-top: ${top ? top*6 : 0}px;
        margin-bottom: ${bottom ? bottom*6 : 0}px;
        margin-left: ${left ? left*6 : 0}px;
        margin-right: ${right ? right*6 : 0}px;
        width: ${fullwidth ? '100%' : 'auto'};
    `}
`

const SpaceBox = ({ top = 0, bottom = 0, left = 0, right = 0, fullwidth, children }) => {

    return <Root {...{ top, bottom, left, right, fullwidth}}>
        {children}
    </Root>
}

export default SpaceBox