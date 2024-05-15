import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 30px;
  display: flex;
  justify-content: left;
`;

const StyledLink = styled(Link)`
    font-size: 30px;
`
const Privacy = () => {
  return (
    <Container>
      <StyledLink to="/license">Read the license agreement</StyledLink>
    </Container>
  );
};

export default Privacy;
