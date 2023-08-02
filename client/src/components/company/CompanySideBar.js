import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import Loading from "../Loading";

const Container = styled.div`
  margin-top: 1em;
`;

const LoadingBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const Name = styled.p`
  margin: 0 0em 0.5em 2em;
`;

const CompLink = styled(NavLink)`
  all: unset;
  cursor: pointer;
  color: grey;
  &:hover {
    color: black;
  }
`;

const CompanySideBar = () => {
  const [companyList, setCompanyList] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetch(`/api/get-companies`)
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 400 || parse.status === 500) {
          throw new Error(parse.message);
        } else {
          if (mounted) {
            setCompanyList(parse.companies);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      <Name>OUR COMPANIES</Name>
      {companyList !== null ? (
        companyList.map((company) => (
          <CompLink to={`/company/${company._id}`} key={company._id}>
            <Name>{company.name}</Name>
          </CompLink>
        ))
      ) : (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      )}
    </Container>
  );
};

export default CompanySideBar;
