import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// 기존 styled-components 재사용
// 아래는 필요한 것만 재정의한 것입니다. 전체 재사용도 가능해요.

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

const PageMain = styled.div`
  padding: 24px;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #222;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SendButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #111;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top:35px;
`;

const FcmSendPage = () => {
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [content, setContent] = useState('');

  const sendFcmMessage = async () => {
    if (!token || !title || !content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/send-fcm', {
        token,
        title,
        body: content,
      });

      alert('FCM 알림 전송 완료');
      setToken('');
      setTitle('');
      setBody('');
      setContent('');
    } catch (error) {
      console.error(error);
      alert('알림 전송 실패');
    }
  };

  return (
    <>
      <PageHeader>
        <h2>FCM 알림 발송</h2>
      </PageHeader>
      <PageMain>
        <InputGroup>
          <Label>수신자 토큰</Label>
          <Input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Firebase Device Token"
          />
        </InputGroup>
        <InputGroup>
          <Label>제목</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="알림 제목"
          />
        </InputGroup>
        <InputGroup>
          <Label>본문 내용</Label>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ height: '200px' }}
          />
        </InputGroup>
        <SendButton onClick={sendFcmMessage}>알림 보내기</SendButton>
      </PageMain>
    </>
  );
};

export default FcmSendPage;
