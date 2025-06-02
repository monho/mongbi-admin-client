import React from 'react';
import styled from 'styled-components';




// 공통 버튼 스타일 정의
const BaseButton = styled.button`
  display: inline-block;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "16px"};
  padding: ${(props) => props.padding || "4px 8px"};
  height: ${(props) => props.height || "auto"};
  width: auto;
  white-space: nowrap;
  box-sizing: border-box;
`;

// 버튼 스타일별 정의
const SmallButton = styled(BaseButton)`
  height: 22px;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 0px !important;
`;

const MediumButton = styled(BaseButton)`
  height: 30px;
  padding: 4px 8px;
  font-size: 14px;
`;

const LargeButton = styled(BaseButton)`
  height: 38px;
  padding: 8px 12px;
  font-size: 14px;
`;

// 공통 버튼 컴포넌트
const Buttons = ({ size, children, ...props }) => {
  if (size === "small") return <SmallButton {...props}>{children}</SmallButton>;
  if (size === "large") return <LargeButton {...props}>{children}</LargeButton>;
  return <MediumButton {...props}>{children}</MediumButton>;
};

export default Buttons;
