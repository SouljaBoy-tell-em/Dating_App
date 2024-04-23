import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-left-radius: 15px;
    height: 660px;
    width: 302px;
    border-bottom: 10px solid #f1e2ff;
    border-left: 10px solid #f1e2ff;
    z-index: 0;
`;


const SignUpTopRightBlock = () => {
  return (
    <Container></Container>
  )
}

export default SignUpTopRightBlock;