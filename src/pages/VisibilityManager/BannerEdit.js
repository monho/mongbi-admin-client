import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';


const BannerRegisterWarp = styled.div`
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

const Input = styled.input`
  width: 429px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  
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
const DateInput = styled.input`
  width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;
const InputBox = styled.select`
    width: 429px;
    height: 38px;
    padding: 8px 12px;
    border: 1px solid #DDD;
    color: #222;
    box-sizing: border-box;
    border-radius: 4px;
  `;
const BannerEdit = ({ banner, onBack }) => {
    const today = new Date().toISOString().split('T')[0];
    const [BANNER_IMAGE, setBannerImage] = useState(null);
    const [BANNER_NAME, setBannerName] = useState("");
    const [BANNER_DIVISION, setBannerDivision] = useState("전체"); // 기본값 설정
    const [BANNER_TYPE, setBannerType] = useState("전체"); // 기본값 설정
    const [BANNER_ADMIN, setBannerAdmin] = useState("관리자1");
    const [BANNER_SHOW, setShowState] = useState("Y");
    const [BANNER_NEWPAGE, setNewPageState] = useState("Y");
    const [BANNER_LINK, setBannerLink] = useState("");
    const [BANNER_SDATE, setStartDate] = useState(today);
    const [BANNER_EDATE, setEndDate] = useState(today);

    // 초기 데이터를 상태에 설정
    useEffect(() => {
        if (banner) {
            setBannerImage(banner.BANNER_IMAGE || null);
            setBannerName(banner.BANNER_NAME || '');
            setBannerDivision(banner.BANNER_DIVISION || '');
            setBannerType(banner.BANNER_TYPE || '');
            setBannerAdmin(banner.BANNER_ADMIN || '');
            setShowState(banner.BANNER_SHOW || 'Y');
            setNewPageState(banner.BANNER_NEWPAGE || 'Y');
            setBannerLink(banner.BANNER_LINK || '');
            setStartDate(banner.BANNER_SDATE || '');
            setEndDate(banner.BANNER_SDATE || '');
        }
    }, [banner]);

    console.log(banner.BANNER_IMAGE);



    const registerBanner = async () => {
        const formData = new FormData();
        formData.append('BANNER_NAME', BANNER_NAME.trim());
        formData.append('BANNER_DIVISION', BANNER_DIVISION);
        formData.append('BANNER_TYPE', BANNER_TYPE);
        formData.append('BANNER_ADMIN', BANNER_ADMIN);
        formData.append('BANNER_SHOW', BANNER_SHOW);
        formData.append('BANNER_NEWPAGE', BANNER_NEWPAGE);
        formData.append('BANNER_LINK', BANNER_LINK.trim());
        formData.append('BANNER_SDATE', BANNER_SDATE);
        formData.append('BANNER_EDATE', BANNER_EDATE);

        if (BANNER_IMAGE) {
            formData.append('BANNER_IMAGE', BANNER_IMAGE);
        } else {
            alert("배너 이미지를 선택해주세요.");
            return;
        }
        try {
            const response = await axios.post("/api/banners/register", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                alert("배너가 성공적으로 등록되었습니다.");
                onBack(true);
            } else {
                alert("등록 실패");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    const handleBannerImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBannerImage(file);
        }
    };

    const handleShowStatusChange = (e) => {
        setShowState(e.target.value);
    };

    const handleNewPageStatusChange = (e) => {
        setNewPageState(e.target.value);
    };

    // 옵션 변경 핸들러
    const handleDivisionChange = (e) => setBannerDivision(e.target.value);
    const handleTypeChange = (e) => setBannerType(e.target.value);

    return (
        <BannerRegisterWarp>
            <PageHeader>
                <HeaderText className='text-lg'>배너 등록</HeaderText>
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
                        onClick={registerBanner}
                        className='text-sm'>
                        등록하기
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
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">등록자</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                value={BANNER_ADMIN}
                                type="text"
                                onChange={(e) => setBannerAdmin(e.target.value)}
                                placeholder="관리자1"
                                readOnly
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">분류</Label>
                        </LabelArea>
                        <InputContainer>
                            <InputBox value={BANNER_DIVISION} onChange={handleDivisionChange}>
                                <option value="전체">전체</option>
                                <option value="파트너">파트너</option>
                                <option value="고객">고객</option>
                            </InputBox>
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">배너구분</Label>
                        </LabelArea>
                        <InputContainer>
                            <InputBox value={BANNER_TYPE} onChange={handleTypeChange}>
                                <option value="전체">전체</option>
                                <option value="파트너">파트너</option>
                                <option value="고객">고객</option>
                            </InputBox>
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">게시 여부</Label>
                        </LabelArea>
                        <InputContainer>
                            <RadioArea>
                                <Input
                                    type="radio"
                                    checked={BANNER_SHOW === "Y"}
                                    onChange={handleShowStatusChange}
                                    style={{ width: '15px', margin: '0px' }}
                                    name="ShowStatus"
                                    value="Y"
                                />
                                <span className="text-sm">게시</span>
                                <Input
                                    type="radio"
                                    checked={BANNER_SHOW === "N"}
                                    onChange={handleShowStatusChange}
                                    style={{ width: '15px', margin: '0px' }}
                                    name="ShowStatus"
                                    value="N"
                                />
                                <span className="text-sm">미게시</span>
                            </RadioArea>

                        </InputContainer>
                    </FormRow>
                    <FormRow style={{ paddingTop: '0px' }}>
                        <LabelArea>
                            <Label className="text-sm">배너이미지</Label>
                        </LabelArea>
                        <InputContainer>
                            <span className="text-sm">이미지는 800 x 800px / JPG, PNG 권장</span>
                            <FileInputWrapper>
                                <HiddenFileInput
                                    id="bannerImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBannerImageChange}
                                />
                                <ImagePlaceholder htmlFor="product-thumbnail" selectedImage={BANNER_IMAGE}>
                                    <img
                                        src={
                                            BANNER_IMAGE
                                                ? typeof BANNER_IMAGE === 'object'
                                                    ? URL.createObjectURL(BANNER_IMAGE)
                                                    : BANNER_IMAGE
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
                            <Label className="text-sm">배너명</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                onChange={(e) => setBannerName(e.target.value)}
                                value={BANNER_NAME}
                                type="text"
                                placeholder="배너 이름을 입력해주세요."
                            />
                        </InputContainer>
                    </FormRow>

                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">링크</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                onChange={(e) => setBannerLink(e.target.value)}
                                value={BANNER_LINK}
                                type="text"
                                placeholder="배너 링크을 입력해주세요."
                            />
                        </InputContainer>
                    </FormRow>

                    {/* <FormRow>
                        <LabelArea>
                            <Label className="text-sm">접속기기</Label>
                        </LabelArea>
                        <InputContainer>
                        <Input
                                onChange={(e) => setProductName(e.target.value)}
                                value={PRODUCT_KR}
                                type="text"
                                placeholder="배너 설명을 입력해주세요."
                            />
                        </InputContainer>
                    </FormRow> */}
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">출력 위치</Label>
                        </LabelArea>
                        <InputContainer>
                            <InputBox>
                                <option>전체</option>
                                <option>파트너</option>
                                <option>고객</option>
                            </InputBox>
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">새창</Label>
                        </LabelArea>
                        <InputContainer>
                            <RadioArea>
                                <Input
                                    type="radio"
                                    checked={BANNER_NEWPAGE === "Y"}
                                    onChange={handleNewPageStatusChange}
                                    style={{ width: '15px', margin: '0px' }}
                                    name="NewpageStatus"
                                    value="Y"
                                />
                                <span className='text-sm'>새창</span>
                                <Input
                                    type="radio"
                                    name="ShowStatus"
                                    style={{ width: '15px', margin: '0px' }}
                                    checked={BANNER_NEWPAGE === "N"}
                                    onChange={handleNewPageStatusChange}
                                    value="N"
                                />
                                <span className='text-sm'>창유지</span>
                            </RadioArea>

                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">시작 일시</Label>
                        </LabelArea>
                        <InputContainer>
                            <DateInput
                                type="date"
                                value={BANNER_SDATE}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">종료 일시</Label>
                        </LabelArea>
                        <InputContainer>
                            <DateInput
                                type="date"
                                value={BANNER_EDATE}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">출력순서</Label>
                        </LabelArea>
                        <InputContainer>
                            <span className="text-sm">배너를 출력할 순서입니다. 숫자가 적을수록 먼저 노출됩니다.</span>
                            {/* //해당 부분 배너 개수 불러와서 인덱싱 처리 */}
                            <InputBox>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </InputBox>
                        </InputContainer>
                    </FormRow>
                </FormContainer>
            </PageMain>
        </BannerRegisterWarp>
    );
};

export default BannerEdit;
