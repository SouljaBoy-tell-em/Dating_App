import {useContext, useEffect} from 'react'
import styled from "styled-components";
import AuthForm from '../widgets/AuthForm';
import { Navigate, useLocation } from 'react-router-dom';
import Context from '..';
import { observer } from 'mobx-react-lite';

const Container = styled.div`
  height: 100vh;
  font-size: xx-large;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const AuthPage = () => {

  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const { store } = useContext(Context);
  
  useEffect(()=>{
    store.checkAuth();
  });

  if (store.isAuth){
    return <Navigate to={fromPage}/>;
  }

  return (
    <Container>
      <AuthForm/>
    </Container>
  )
}

export default observer(AuthPage);