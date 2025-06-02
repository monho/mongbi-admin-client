import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';


const CsWarp = styled.div`
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
  border-top: 1px solid #ddd; /* 아래쪽 border만 적용 */
  
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

const InputContainer = styled.div`
  flex: 1; /* 남은 영역을 모두 차지 */
  padding: 12px; /* 입력폼 좌우 여백 */
  box-sizing: border-box;
    display:flex;
    gap:12px;
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
const RadioArea = styled.div`
    display:flex;
    gap:8px;
  `

const InputBox = styled.select`
  width: 429px;
  height: 38px;
  padding: 8px 12px;
  border: 1px solid #DDD;
  color: #222;
  box-sizing: border-box;
  border-radius: 4px;
`;
const DateInputContainer = styled.div`
    display: flex;
    gap: 12px;
    flex-direction: column;
`;

const DateInput = styled.input`
  width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;
const DurationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const DurationButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? '#111' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#222')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;
const CsWrite = ({ onBack }) => {
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 ISO 형식(YYYY-MM-DD)으로 변환
    const [PRODUCT_DETAILS, setContent] = useState("");
    const [PRODUCT_EN, setProductTitle] = useState(""); // 상품 제목
    const [PRODUCT_INSTALL, setProductInstall] = useState(""); // 설치 방법
    const [PRODUCT_KR, setProductName] = useState(""); // 상품 이름
    const [PRODUCT_SHOW_STATE, setShowState] = useState("Y"); // 노출 여부
    const [POST_PERIOD, setPostPeriod] = useState("비활성화");
    const [startDate, setStartDate] = useState(today); // 시작 날짜
    const [endDate, setEndDate] = useState(today); // 종료 날짜

    const [selectedDuration, setSelectedDuration] = useState(null);
    const handlePostPeriodChange = (e) => {
        setPostPeriod(e.target.value);
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

    const handleShowStatusChange = (e) => {
        setShowState(e.target.value); // 선택된 라디오 버튼의 value를 상태로 설정
    };
    const handleDurationClick = (days) => {
        setSelectedDuration(days);
        if (startDate) {
            const newEndDate = new Date(startDate);
            newEndDate.setDate(newEndDate.getDate() + days);
            setEndDate(newEndDate.toISOString().split('T')[0]);
        }
    };

    return (
        <CsWarp>
            <PageHeader>
                <HeaderText className='text-lg'>1:1문의 답변</HeaderText>
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
                            <Label className="text-sm">게시구분</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                readOnly
                                value={PRODUCT_EN}
                                type="text"
                                onChange={(e) => setProductTitle(e.target.value)}
                                placeholder="전체"
                            />
                        </InputContainer>
                    </FormRow>

                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">문의 유형</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                readOnly
                                value={PRODUCT_EN}
                                type="text"
                                onChange={(e) => setProductTitle(e.target.value)}
                                placeholder="A/S문의"
                            />

                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">작성자</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                readOnly
                                value={PRODUCT_EN}
                                type="text"
                                onChange={(e) => setProductTitle(e.target.value)}
                                placeholder="홍길동"
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">연락처</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                readOnly
                                value={PRODUCT_EN}
                                type="text"
                                onChange={(e) => setProductTitle(e.target.value)}
                                placeholder="010-1234-5678"
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">이메일 주소</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                readOnly
                                value={PRODUCT_EN}
                                type="text"
                                onChange={(e) => setProductTitle(e.target.value)}
                                placeholder="abcde1264@gmail.com"
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">문의 제목</Label>
                        </LabelArea>
                        <InputContainer>
                            <Input
                                readOnly
                                value={PRODUCT_EN}
                                type="text"
                                onChange={(e) => setProductTitle(e.target.value)}
                                placeholder="프로그램 오류문의"
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">문의 내용</Label>
                        </LabelArea>
                        <InputContainer style={{ height: '450px' }}>
                            <ReactQuill
                                readOnly
                                value="프로그램이 잘 돌아가다가 중간에 멈췄다가 다시 시작하고를 반복해요"
                                onChange={handleEditorChange}
                                modules={customToolbar}
                                style={{ height: '380px' }}
                            />
                        </InputContainer>
                    </FormRow>
                    <FormRow>
                        <LabelArea>
                            <Label className="text-sm">문의 답변</Label>
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
        </CsWarp>
    );
};

export default CsWrite;
