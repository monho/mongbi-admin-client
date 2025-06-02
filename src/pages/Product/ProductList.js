import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductAdd from './ProductAdd';

import ProductEdit from './ProductEdit';
import SearchForm from '../../components/SearchForm';

const ProductWarp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  width: 100%;
  padding-right: 35px;
  box-sizing: border-box;
  height: 56px;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #DDD;
  padding: 14px 35px 14px 22px;
  align-items: center;
  justify-content: space-between;
`;

const HeaderText = styled.p`
  color: #222;
  font-weight: 700;
`;

const WriteBtn = styled.button`
  display: flex;
  width: 99px;
  justify-content: center;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #222;
  background-color: #fff;
  cursor: pointer;
  gap: 6px;
  align-items: center;
`;

const SubHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  flex-direction: row;
`;
const SearchArea = styled.div`
    display : flex;
    gap:8px;
`

const LeftSubArea = styled.div`
    display: flex;
    gap:16px;
    flex-direction: column;
`
const SearchBtn = styled.button`
    width:38px;
    height:38px;
    background-color:#F8F8F8;
    color:#222;
    border: 1px solid #DDD;
    cursor:pointer;
    border-radius : 4px;
`
const InputBox = styled.select`
    width: 117px;
    height: 38px;
    padding: 8px 12px;
    border: 1px solid #DDD;
    color: #222;
    box-sizing: border-box;
    border-radius: 4px;
`;

const InputBox2 = styled.input`
    width: 260px;
    height: 38px;
    padding: 8px 12px;
    border: 1px solid #DDD;
    color: #222;
    box-sizing: border-box;
    border-radius: 4px;
`;

const BtnArea = styled.div`
  height: 38px;
  margin-top: auto;
  display: flex;
  gap: 8px;
`;

const PageMain = styled.div`
  width: 1640px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0px 24px;
  padding-bottom: 50px;
  overflow-y: auto;
  flex: 1;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
  color:#222;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    font-weight:400;
    background-color: #f8f8f8;
  }
`;

const EditBtn = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: #111;
  color: #fff;
  cursor: pointer;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
`;

const ThumbnailImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
`;
const ThumbnailText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #222;
`;

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            // const response = await axios.get('/api/products');
            const response = await axios.get('/api/products');
            const updatedProducts = response.data.map(product => ({
                ...product,
                PRODUCT_THUMNAIL_IMG: product.PRODUCT_THUMNAIL_IMG
                    ? product.PRODUCT_THUMNAIL_IMG.replace('/home/upload', '/files')
                    : null,
                    PRODUCT_INNER_THUMNAIL_IMG: product.PRODUCT_INNER_THUMNAIL_IMG
                    ? product.PRODUCT_INNER_THUMNAIL_IMG.replace('/home/upload', '/files')
                    : null,
            }));
            setProductList(updatedProducts);
        } catch (error) {
            console.error('상품 데이터를 불러오는데 실패했습니다.', error);
        }
    };
    useEffect(() => {
        fetchProducts(); // 초기 데이터 로드
    }, []);


    const handleRegisterClick = () => {
        setIsRegisterMode(true);
        setIsEditMode(false);
        setSelectedProduct(null);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditMode(true);
        setIsRegisterMode(false);
    };

    const handleBack = (shouldReload) => {
        setIsRegisterMode(false);
        setIsEditMode(false);
        setSelectedProduct(null);
        if (shouldReload) {
            fetchProducts();
        }
    };

    return (
        <ProductWarp>
            {isRegisterMode ? (
                <ProductAdd onBack={handleBack} />
            ) : isEditMode ? (
                <ProductEdit product={selectedProduct} onBack={handleBack} />
            ) : (
                <>
                    <PageHeader>
                        <HeaderText className='text-lg'>상품 리스트</HeaderText>
                    </PageHeader>
                    <SubHead>
                        <LeftSubArea>
                            <SearchForm />
                            <SearchArea>
                                <InputBox>
                                    <option>전체분류</option>
                                    <option>상품명</option>
                                </InputBox>
                                <InputBox2 type="text" placeholder="검색어를 입력해주세요." />
                                <SearchBtn>
                                    <img src={process.env.PUBLIC_URL + '/assets/icon/search.svg'} alt="Upload or Selected" />
                                </SearchBtn>
                            </SearchArea>
                        </LeftSubArea>
                        <BtnArea>
                            <WriteBtn onClick={() => setIsRegisterMode(true)}>
                                상품등록
                                <img src={process.env.PUBLIC_URL + '/assets/icon/write.svg'}
                                    alt="Upload or Selected"
                                />
                            </WriteBtn>
                        </BtnArea>
                    </SubHead>

                    <PageMain>
                        <TableContainer>
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>아이디</th>
                                        <th>프로그램</th>
                                        <th>버전</th>
                                        <th>상품금액</th>
                                        <th>판매금액</th>
                                        <th>할인</th>
                                        <th>노출여부</th>
                                        <th>판매상태</th>
                                        <th>등록일</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((product, index) => (
                                        <tr key={product.PRODUCT_ID}>
                                            <td>{index + 1}</td>
                                            <td>{product.PRODUCT_ID || '-'}</td>
                                            <td>
                                                <ThumbnailWrapper>
                                                    {product.PRODUCT_THUMNAIL_IMG ? (
                                                        <ThumbnailImage
                                                            src={`${product.PRODUCT_THUMNAIL_IMG}`}
                                                            alt="썸네일"
                                                        />
                                                    ) : (
                                                        '이미지 없음'
                                                    )}
                                                    <ThumbnailText>{product.PRODUCT_KR}</ThumbnailText>
                                                </ThumbnailWrapper>
                                            </td>
                                            <td>{product.PRODUCT_VERSION}</td>
                                            <td>{product.PRODUCT_PRICE ? Math.floor(product.PRODUCT_PRICE).toLocaleString() : '-'}원</td>
                                            <td>{product.PRODUCT_SELL_PRICE ? Math.floor(product.PRODUCT_SELL_PRICE).toLocaleString() : '-'}원</td>

                                            <td>{
                                                product.PRODUCT_PRICE && product.PRODUCT_SELL_PRICE
                                                    ? `${Math.round(((product.PRODUCT_PRICE - product.PRODUCT_SELL_PRICE) / product.PRODUCT_PRICE) * 100)}%`
                                                    : '-'
                                            }</td>
                                            <td>{product.PRODUCT_SHOW_STATE === 'Y' ? '노출중' : '노출안함'}</td>
                                            <td>{product.PRODUCT_SELL_STATE === 'Y' ? '판매중' : '판매안함'}</td>
                                            <td>{new Date(product.PRODUCT_CREATEDATE).toLocaleDateString()}</td>
                                            <td>
                                                <EditBtn onClick={() => handleEditClick(product)}>수정</EditBtn>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </StyledTable>
                        </TableContainer>
                    </PageMain>
                </>
            )}
        </ProductWarp>
    );
};

export default ProductList;
