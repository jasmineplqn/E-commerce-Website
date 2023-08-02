import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "../components/Loading";

//component displaying a single company page with its products

const Company = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    let mounted = true;

    //fetching company data
    const fetchCompanyData = async (companyId) => {
      const response = await fetch(`/api/company/${params.companyId}`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          setCompany(data.data);
          await fetchAllItems(data.data._id);
        }
      }
    };

    //fetching all the items that is made by the company
    const fetchAllItems = async (companyId) => {
      const response = await fetch(`/api/get-items`);
      const data = await response.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      } else {
        if (mounted) {
          const companyItems = data.items.filter((item) => {
            return item.companyId === companyId;
          });
          setItems(companyItems);
        }
      }
    };

    fetchCompanyData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {!items || !company ? (
        <LoadingBox>
          <Loading />
        </LoadingBox>
      ) : (
        <Wrapper>
          {company && (
            <CompanyBox>
              <Name>{company.name}</Name>
              from {company.country}
            </CompanyBox>
          )}
          {items && (
            <ProductBox>
              {items.map((item) => {
                return (
                  <ItemBox
                    key={item._id}
                    onClick={() => navigate(`/allproducts/${item._id}`)}
                  >
                    <img src={item.imageSrc} />
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </ItemBox>
                );
              })}
            </ProductBox>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Company;

const Wrapper = styled.div`
  margin: 2rem;
`;

const ItemBox = styled.div`
  padding: 4em;
  flex: 1;
`;

const CompanyBox = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

const ProductBox = styled.div`
  display: flex;
  flex-wrap: wrap;

  cursor: pointer;
  @media screen and (min-width: 750px) {
    grid-template-columns: auto auto;
  }
`;

const Name = styled.p`
  font-size: 4rem;
`;

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;
