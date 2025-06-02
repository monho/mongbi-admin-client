import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';


const ProductWarp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
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

const SubHead = styled.div`
  
  height: 78px;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  box-sizing:border-box;
  padding:24px 24px 16px 0px;
  align-items: center;
`;

const BtnArea = styled.div`
  width: 308px;
  height: 38px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-right:16px;
`;

const PageMain = styled.div`
  flex: 1;
  overflow-y: auto; /* 스크롤 가능 */
  box-sizing: border-box;
  padding:0px 24px 16px 24px;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding-bottom:55px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid #ddd; /* 아래쪽 border만 적용 */
  
`;
const LabelArea = styled.div`
 background-color: #F8F8F8; /* 배경색 적용 */
  width: 200px; /* 너비 고정 */
  padding: 12px; /* 내부 여백 추가 */
  box-sizing: border-box;
  display: flex; /* 높이를 늘이기 위해 flex 사용 */
  align-items: center; /* 내용 수직 가운데 정렬 */
  justify-content: center;
      flex-direction: column;
`;

const Label = styled.label`
  font-weight: 400;
  color: #222;
  display:flex;
  gap:3px;
`;
const FileInputWrapper = styled.div`
  display: inline-block;
  position: relative;
`;
const HiddenFileInput = styled.input`
  display: none; /* 파일 선택 input 숨기기 */
`;

const ImagePlaceholder = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  overflow: hidden;

  img {
    width: ${(props) => (props.selectedImage ? '100%' : '33px')};
    height: ${(props) => (props.selectedImage ? '100%' : '33px')};
    object-fit: ${(props) => (props.selectedImage ? 'contain' : 'initial')};
  }
`;

const InputContainer = styled.div`
  flex: 1; /* 남은 영역을 모두 차지 */
  padding: 12px; /* 입력폼 좌우 여백 */
  box-sizing: border-box;
    display:flex;
    
    gap:8px;
    flex-direction: column;
    span{
    color:#666;
  }
`;

const ImageArea = styled.div`
  display:flex;
    flex-direction: column;
    gap:8px;
  span{
    color:#666;
  }
`

const Input = styled.input`
  width: 429px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Btn = styled.button`
  display: flex;
  width: auto;
  justify-content: center;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #222;
  background-color: #fff;
  cursor: pointer;
  gap: 6px;
  align-items: center;
  padding: 8px 12px;
`;


const FileUpload = styled.div`
  display:flex;

`
const FileUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* 텍스트와 아이콘 사이 간격 */
`;

const FileButton = styled.label`
  display: inline-block;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #222;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
`;


const FileText = styled.div`
  color: #222;
  font-size: 14px;
`;
const DeleteIcon = styled.span`
  cursor: pointer;
  font-size: 16px;
  color: #888;

  &:hover {
    color: #222;
  }
`;


const PriceArea = styled.div`
  display:flex;
  gap:8px;
  align-items: center;

`

const DisCountText = styled.span`
  color : #F44336 !important;
  font-weight:700;
`

const TaxChkArea = styled.div`
  display: flex;
`

const RadioArea = styled.div`
  display:flex;
  gap:8px;
`

const WriteBtn = styled.button`
    width: 99px;
    height: 38px;
    display: flex;
    gap:6px;
    box-sizing: border-box;
    color: #FFF;
    background-color: #111;
    border-radius: 4px;
    align-items: center;
    padding:8px 12px;
    justify-content: center;
    border:none;
    cursor:pointer;
    `



const ProductEdit = ({ product, onBack }) => {
  const [PRODUCT_THUMNAIL_IMG, setProductThumbnail] = useState(null); // 상품 썸네일
  const [PRODUCT_INNER_THUMNAIL_IMG, setPageThumbnail] = useState(null); // 상세페이지 썸네일
  const [PRODUCT_DETAILS, setContent] = useState("<p>여기에 HTML 콘텐츠를 입력하세요</p>");
  const [PRODUCT_EN, setProductTitle] = useState(""); // 상품 제목
  const [PRODUCT_KR, setProductName] = useState(""); // 상품 이름
  const [PRODUCT_DESC, setProductDesc] = useState(""); // 상품 설명
  const [PRODUCT_BADGE, setProductBadge] = useState([]); // 상품 뱃지
  const [PRODUCT_INSTALL, setProductInstall] = useState(""); // 설치 방법
  const [PRODUCT_USE_OS, setProductUseEnv] = useState(""); // 사용 환경
  const [PRODUCT_AS, setProductAS] = useState(""); // A/S 지원
  const [PRODUCT_FILE, setFileName] = useState("파일첨부"); // 프로그램 파일
  const [PRODUCT_VERSION, setProductVersion] = useState(""); // 버전
  const [PRODUCT_TIP, setProductTip] = useState(""); // TIP
  const [PRODUCT_SELL_STATE, setSellState] = useState("Y"); // 판매 상태
  const [PRODUCT_SHOW_STATE, setShowState] = useState("Y"); // 노출 여부
  const [PRODUCT_DATE_STATE, setDateState] = useState("N"); // 판매 기간 정보 사용 여부
  const [PRODUCT_PRICE, setProductPrice] = useState(""); // 상품 금액
  const [PRODUCT_SELL_PRICE, setSalePrice] = useState(""); // 판매 금액
  const [PRODUCT_TAX_STATE, setTaxIncluded] = useState("N"); // 세금 포함 여부
  const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일

  // 초기 데이터를 상태에 설정
  useEffect(() => {
    if (product) {
      setProductThumbnail(product.PRODUCT_THUMNAIL_IMG || null);
      setPageThumbnail(product.PRODUCT_INNER_THUMNAIL_IMG || null);
      setContent(product.PRODUCT_DETAILS || '');
      setProductTitle(product.PRODUCT_EN || '');
      setProductName(product.PRODUCT_KR || '');
      setProductDesc(product.PRODUCT_DESC || '');
      setProductBadge(product.PRODUCT_BADGE || []);
      setProductInstall(product.PRODUCT_INSTALL || '');
      setProductUseEnv(product.PRODUCT_USE_OS || '');
      setProductAS(product.PRODUCT_AS || '');
      setFileName(product.PRODUCT_FILE || '');
      setProductVersion(product.PRODUCT_VERSION || '');
      setProductTip(product.PRODUCT_TIP || '');
      setSellState(product.PRODUCT_SELL_STATE || 'Y');
      setShowState(product.PRODUCT_SHOW_STATE || 'Y');
      setDateState(product.PRODUCT_DATE_STATE || 'N');
      setProductPrice(product.PRODUCT_PRICE || '');
      setSalePrice(product.PRODUCT_SELL_PRICE || '');
    }
  }, [product]);


  console.log(product);

  const registerProductList = async () => {
    const formData = new FormData();
    const productPrice = PRODUCT_PRICE && !isNaN(parseFloat(PRODUCT_PRICE)) && isFinite(parseFloat(PRODUCT_PRICE)) ? parseFloat(PRODUCT_PRICE) : 0;
    const productSellPrice = PRODUCT_SELL_PRICE && !isNaN(parseFloat(PRODUCT_SELL_PRICE)) && isFinite(parseFloat(PRODUCT_SELL_PRICE)) ? parseFloat(PRODUCT_SELL_PRICE) : 0;
    // 필드 추가
    formData.append('PRODUCT_DETAILS', PRODUCT_DETAILS || null);
    formData.append('PRODUCT_EN', PRODUCT_EN.trim());
    formData.append('PRODUCT_KR', PRODUCT_KR.trim());
    formData.append('PRODUCT_DESC', PRODUCT_DESC.trim());
    formData.append('PRODUCT_BADGE', JSON.stringify(PRODUCT_BADGE));
    formData.append('PRODUCT_INSTALL', PRODUCT_INSTALL.trim());
    formData.append('PRODUCT_USE_OS', PRODUCT_USE_OS.trim());
    formData.append('PRODUCT_AS', PRODUCT_AS.trim());

    if (PRODUCT_THUMNAIL_IMG) {
      formData.append('PRODUCT_THUMNAIL_IMG', PRODUCT_THUMNAIL_IMG);
    } else {
      alert("상품 썸네일 이미지를 선택해주세요.");
      return;
    }
    if (PRODUCT_INNER_THUMNAIL_IMG) {
      formData.append('PRODUCT_INNER_THUMNAIL_IMG', PRODUCT_INNER_THUMNAIL_IMG);
    } else {
      alert("상세페이지 썸네일 이미지를 선택해주세요.");
      return;
    }

    // 파일이 선택되었는지 확인하고, 'file'이라는 이름으로 서버에 전송
    if (selectedFile) {
      formData.append('file', selectedFile); // 'file'로 필드 이름을 맞춰서 전송
    } else {
      alert("파일을 선택해주세요.");
      return;
    }

    formData.append('PRODUCT_VERSION', PRODUCT_VERSION.trim());
    formData.append('PRODUCT_TIP', PRODUCT_TIP.trim());
    formData.append('PRODUCT_SELL_STATE', PRODUCT_SELL_STATE);
    formData.append('PRODUCT_SHOW_STATE', PRODUCT_SHOW_STATE);
    formData.append('PRODUCT_DATE_STATE', PRODUCT_DATE_STATE);
    formData.append('PRODUCT_PRICE', productPrice);
    formData.append('PRODUCT_SELL_PRICE', productSellPrice);
    formData.append('PRODUCT_TAX_STATE', PRODUCT_TAX_STATE);

    console.log("데이터", PRODUCT_THUMNAIL_IMG);
    try {
      const response = await axios.post("/api/products/register", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        alert("상품이 성공적으로 등록되었습니다.");
        onBack(true); // 데이터 갱신을 알리며 돌아가기
      } else {
        alert("등록 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };



  const handleProductThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductThumbnail(file);
    }
  };

  const handlePageThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPageThumbnail(file);
    }
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const customToolbar = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // 파일이 존재하고 확장자가 .zip인지 검사
    if (file && file.name.endsWith('.zip')) {
      setSelectedFile(file); // 파일 상태 업데이트
      setFileName(file.name); // 파일 이름 상태 업데이트
    } else {
      alert("ZIP 파일만 업로드 가능합니다.");
      e.target.value = ""; // 파일 선택 초기화
    }
  };
  const handleDelete = () => {
    setFileName("파일첨부");
    setSelectedFile(null); // 파일 상태 초기화
  };



  const handleBadgeChange = (e) => {
    const { checked, value } = e.target;
    setProductBadge((prev) =>
      checked ? [...prev, value] : prev.filter((badge) => badge !== value)
    );
  };


  const handleSellStatusChange = (e) => {
    setSellState(e.target.value); // 선택된 라디오 버튼의 value를 상태로 설정
  };


  const handleShowStatusChange = (e) => {
    setShowState(e.target.value); // 선택된 라디오 버튼의 value를 상태로 설정
  };

  const handleSellDateChange = (e) => {
    setSellState(e.target.checked); // 체크 여부를 상태로 설정
  };


  return (
    <ProductWarp>
      <PageHeader>
        <HeaderText className='text-lg'>상품 수정</HeaderText>
      </PageHeader>
      <SubHead>
        <BtnArea>
          <Btn className='text-sm'>
            미리보기
            <img src={process.env.PUBLIC_URL + '/assets/icon/freeview.svg'}
              alt="Upload or Selected"
            />
          </Btn>
          <WriteBtn
            onClick={registerProductList}
            className='text-sm'>
            저장하기
            <img src={process.env.PUBLIC_URL + '/assets/icon/write_white.svg'}
              alt="Upload or Selected"
            />
          </WriteBtn>
          <Btn onClick={onBack} className='text-sm'>
            나가기
            <img src={process.env.PUBLIC_URL + '/assets/icon/back.svg'}
              alt="Upload or Selected"
            />
          </Btn>

        </BtnArea>
      </SubHead>
      <PageMain>
        <FormContainer>
          <FormRow style={{ paddingTop: '0px', borderTop: '1px solid #DDD' }}>
            <LabelArea>
              <Label className="text-sm">상품 썸네일 이미지</Label>
            </LabelArea>
            <InputContainer>
              <span className="text-sm">이미지는 800 x 800px / JPG, PNG 권장</span>
              <FileInputWrapper>
                <HiddenFileInput
                  id="product-thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleProductThumbnailChange}
                />
                <ImagePlaceholder htmlFor="product-thumbnail" selectedImage={PRODUCT_THUMNAIL_IMG}>
                  <img
                    src={
                      PRODUCT_THUMNAIL_IMG
                        ? typeof PRODUCT_THUMNAIL_IMG === 'object'
                          ? URL.createObjectURL(PRODUCT_THUMNAIL_IMG)
                          : PRODUCT_THUMNAIL_IMG
                        : '/assets/icon/img_upload.svg'
                    }
                    alt="상품 썸네일"
                  />
                </ImagePlaceholder>
              </FileInputWrapper>
            </InputContainer>
          </FormRow>

          <FormRow>
            <LabelArea>
              <Label className="text-sm">상품 제목</Label>
            </LabelArea>
            <InputContainer>
              <Input
                value={PRODUCT_EN}
                type="text"
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="상품 제목을 입력하세요."


              />
            </InputContainer>
          </FormRow>

          <FormRow>
            <LabelArea>
              <Label className="text-sm">상품 이름</Label>
            </LabelArea>
            <InputContainer>
              <Input
                onChange={(e) => setProductName(e.target.value)}
                value={PRODUCT_KR}
                type="text"
                placeholder="상품 이름을 입력하세요."
              />
            </InputContainer>
          </FormRow>

          <FormRow>
            <LabelArea>
              <Label className="text-sm">상품 설명</Label>
            </LabelArea>
            <InputContainer>
              <TextArea
                value={PRODUCT_DESC}
                placeholder="상품 설명을 입력하세요."
                onChange={(e) => setProductDesc(e.target.value)}
              />
            </InputContainer>
          </FormRow>

          <FormRow>
            <LabelArea>
              <Label className="text-sm">상품 뱃지</Label>
            </LabelArea>
            <InputContainer>
              <CheckboxGroup>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    value="BEST"
                    checked={PRODUCT_BADGE.includes("BEST")}
                    onChange={handleBadgeChange}
                  /> BEST
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    value="월 5만원"
                    checked={PRODUCT_BADGE.includes("월 5만원")}
                    onChange={handleBadgeChange}
                  /> 월 5만원
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    value="신규출시"
                    checked={PRODUCT_BADGE.includes("신규출시")}
                    onChange={handleBadgeChange}
                  /> 신규출시
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    value="자동 업그레이드 지원"
                    checked={PRODUCT_BADGE.includes("자동 업그레이드 지원")}
                    onChange={handleBadgeChange}
                  /> 자동 업그레이드 지원
                </CheckboxLabel>
              </CheckboxGroup>

            </InputContainer>
          </FormRow>
          <FormRow style={{ paddingTop: '0px' }}>
            <LabelArea>
              <Label className="text-sm">상세페이지</Label>
              <Label className="text-sm">썸네일 이미지</Label>
            </LabelArea>
            <InputContainer>
              <span className="text-sm">이미지는 800 x 800px / JPG, PNG 권장</span>
              <FileInputWrapper>
                <HiddenFileInput
                  id="page-thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handlePageThumbnailChange}
                />
                <ImagePlaceholder htmlFor="page-thumbnail" selectedImage={PRODUCT_INNER_THUMNAIL_IMG}>
                  <img
                    src={
                      PRODUCT_INNER_THUMNAIL_IMG
                        ? typeof PRODUCT_INNER_THUMNAIL_IMG === 'object'
                          ? URL.createObjectURL(PRODUCT_INNER_THUMNAIL_IMG)
                          : PRODUCT_INNER_THUMNAIL_IMG
                        : '/assets/icon/img_upload.svg'
                    }
                    alt="상품 썸네일"
                  />
                </ImagePlaceholder>
              </FileInputWrapper>
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">설치 방법</Label>
            </LabelArea>
            <InputContainer>
              <Input
                value={PRODUCT_INSTALL}
                onChange={(e) => setProductInstall(e.target.value)}
                type="text"
                placeholder="ex)홈페이지에서 프로그램 다운로드 후 직접설치"


              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">사용 환경</Label>
            </LabelArea>
            <InputContainer>
              <Input
                onChange={(e) => setProductUseEnv(e.target.value)}
                value={PRODUCT_USE_OS}
                type="text"
                placeholder="ex)CPU i3급 / RAM 8G 권장"
              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">A/S 지원</Label>
            </LabelArea>
            <InputContainer>
              <Input
                onChange={(e) => setProductAS(e.target.value)}
                type="text"
                placeholder="프로그램 내 자동업데이트 기능 내장 , 무료 업데이트 제공"
                value={PRODUCT_AS}
              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">프로그램 파일(zip파일)</Label>
            </LabelArea>
            <InputContainer>
              <span className="text-sm">파일첨부는 1파일만 첨부 가능합니다.</span>
              <FileUploadWrapper>
                <FileButton htmlFor="file-upload">파일첨부</FileButton>
                <HiddenFileInput
                  id="file-upload"
                  accept=".zip" // .zip 파일만 허용
                  type="file"
                  onChange={handleFileChange}
                />
                <FileText>{PRODUCT_FILE}</FileText>
                {PRODUCT_FILE !== "파일첨부" && (
                  <DeleteIcon onClick={handleDelete}>
                    <img style={{ marginTop: '2px' }} src={process.env.PUBLIC_URL + '/assets/icon/del.svg'} alt="Upload or Selected" />
                  </DeleteIcon>
                )}
              </FileUploadWrapper>
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">프로그램 버전관리</Label>
            </LabelArea>
            <InputContainer>
              <Input
                onChange={(e) => setProductVersion(e.target.value)}
                type="text"
                placeholder="ex)1.0.0"
                value={PRODUCT_VERSION}
              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">
                <img src={process.env.PUBLIC_URL + '/assets/icon/tip.svg'}
                  alt="Upload or Selected"
                />
                TIP</Label>
            </LabelArea>
            <InputContainer>
              <Input
                type="text"
                onChange={(e) => setProductTip(e.target.value)}
                placeholder="ex)컴퓨터를 바꾸는 등의 이동설치는 가능하나 동시실행은 허용하지 않습니다."
                value={PRODUCT_TIP}
              />
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">판매 상태</Label>
            </LabelArea>
            <InputContainer>
              <RadioArea>
                <Input
                  style={{ width: '15px', margin: '0px' }}
                  type="radio"
                  name="sellStatus"
                  value="Y"
                  checked={PRODUCT_SELL_STATE === "Y"}
                  onChange={handleSellStatusChange}
                />
                <span className="text-sm">판매중</span>
                <Input
                  style={{ width: '15px', margin: '0px' }}
                  type="radio"
                  name="sellStatus"
                  value="N"
                  checked={PRODUCT_SELL_STATE === "N"}
                  onChange={handleSellStatusChange}
                />
                <span className="text-sm">판매중지</span>
              </RadioArea>
            </InputContainer>
          </FormRow>

          <FormRow>
            <LabelArea>
              <Label className="text-sm">노출 여부</Label>
            </LabelArea>
            <InputContainer>
              <RadioArea>
                <Input
                  type="radio"
                  checked={PRODUCT_SHOW_STATE === "Y"}
                  onChange={handleShowStatusChange}
                  style={{ width: '15px', margin: '0px' }}
                  name="ShowStatus"
                  value="Y"
                />
                <span className='text-sm'>노출중</span>
                <Input
                  type="radio"
                  name="ShowStatus"
                  style={{ width: '15px', margin: '0px' }}
                  checked={PRODUCT_SHOW_STATE === "N"}
                  onChange={handleShowStatusChange}
                  value="N"
                />
                <span className='text-sm'>노출중지</span>
              </RadioArea>

            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">판매 기간정보</Label>
            </LabelArea>
            <InputContainer>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={PRODUCT_DATE_STATE}
                  onChange={handleSellDateChange}
                /> 사용
              </CheckboxLabel>
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">가격</Label>
            </LabelArea>
            <InputContainer>
              <PriceArea>
                <Input
                  type="text"
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="상품금액"
                  value={PRODUCT_PRICE}
                />
                <Input
                  type="text"
                  placeholder="판매금액"
                  onChange={(e) => setSalePrice(e.target.value)}
                  value={PRODUCT_SELL_PRICE}
                />
              </PriceArea>
              <TaxChkArea>
                <input type="checkbox" /> 세금 포함
              </TaxChkArea>

            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">추가상품</Label>
            </LabelArea>
            <InputContainer>
              <CheckboxLabel>
                <input type="checkbox" /> 사용
              </CheckboxLabel>
            </InputContainer>
          </FormRow>
          <FormRow>
            <LabelArea>
              <Label className="text-sm">상세설명</Label>
            </LabelArea>
            <InputContainer style={{ height: '450px' }}>
              <ReactQuill
                value={PRODUCT_DETAILS}
                onChange={handleEditorChange}
                modules={customToolbar}
                style={{ height: '380px' }}
              />
            </InputContainer>
          </FormRow>
        </FormContainer>
      </PageMain>
    </ProductWarp>
  );
};

export default ProductEdit;
