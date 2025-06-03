import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import checked from '../../assets/images/checked.svg'
import UserCounter from '../../components/UserCounter';
import SearchForm from '../../components/SearchForm';

const UsertWarp = styled.div`
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
const SubHead = styled.div`
  height: 132px;
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 0px 24px;
  flex-direction: row;
`;

const BtnArea = styled.div`
    width: 308px;
    height: 38px;
    margin-top: auto;
    display: flex;
    gap: 8px;
    flex-direction: row;
    justify-content: flex-end;
`;

const HeaderText = styled.p`
  color: #222;
  font-weight: 700;
`;

const TableContainer = styled.div`
  padding : 16px 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
    font-size: 14px;
  line-height: 22px;
  color:#222;
  `;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  font-weight:400 !important;
  padding: 12px 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-top:1px solid #222;
`;

const TableCell = styled.td`
  padding: 12px 10px;
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
  font-weight:400 !important;
`;

const TableRow = styled.tr`
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 8px;
`;

const Select = styled.select`
  padding: 4px 8px;
  margin-top: 4px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
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
    width: 148px;
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

const SearchArea = styled.div`
    display : flex;
    gap:8px;
`

const CheckBoxArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap:12px;
`

const CheckboxWrapper = styled.label`
    display: flex
;
    cursor: pointer;
    color: #222;
    align-items: center;
    justify-content: center;

    input[type="checkbox"] {
    width: 20px;
    height: 20px;
    appearance: none;
    
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 8px;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: #111; /* 체크되었을 때 배경색 검정 */
      border-color: #111; /* 테두리 색 검정 */
      position: relative;
          border: none; /* 체크된 상태에서는 테두리 제거 */
    background: url(${checked}) no-repeat center center;
    }

  }
`;

const RoleCombobox = styled.select`
    width:278px;
    height:30px;
    border:1px solid #DDD;
    border-radius: 4px;
    background-color:#F5F5F5;
`

const UserList = () => {
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태
    const [checkedItems, setCheckedItems] = useState([]); // 선택된 아이템
    const [users, setUsers] = useState([]); // 유저 목록 상태
    // 전체 체크박스 클릭 핸들러
    const handleSelectAllChange = (e) => {
        setSelectAll(e.target.checked);
        if (e.target.checked) {
            // 모든 항목을 선택
            setCheckedItems(users.map((user) => user.USER_ID)); // 모든 유저 ID를 체크
        } else {
            // 모든 항목을 해제
            setCheckedItems([]);
        }
    };

    // 각 항목 체크박스 클릭 핸들러
    const handleCheckboxChange = (id) => {
        setCheckedItems((prevCheckedItems) =>
            prevCheckedItems.includes(id)
                ? prevCheckedItems.filter((item) => item !== id) // 체크 해제
                : [...prevCheckedItems, id] // 체크
        );
    };

    // 마케팅 수신 동의 체크박스 상태 변경 핸들러
    const handleMarketingChange = (userId, type) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.USER_ID === userId
                    ? { ...user, [type]: user[type] === "Y" ? "N" : "Y" }
                    : user
            )
        );
    };

    // API 호출하여 유저 목록을 가져오는 함수
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('api/users/getAllList');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // USER_ROLE 치환
    const getRoleName = (role) => {
        switch (role) {
            case 'new':
                return '신규 가입자';
            case 'normal':
                return '일반 가입자';
            case 'seller':
                return '구매자';
            default:
                return role;
        }
    };

    // USER_STATUS 치환
    const getStatusName = (status) => {
        switch (status) {
            case 'BLOCK':
                return '차단계정';
            case 'SAFETY':
                return '정상계정';
            case 'SECESSION':
                return '탈퇴계정';
            default:
                return status;
        }
    };

    // 역할 변경 핸들러
    const handleRoleChange = (userId, value) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.USER_ID === userId
                    ? { ...user, USER_ROLE: value }
                    : user
            )
        );
    };

    const handleSave = async () => {
        try {
            const updatedUsers = users.filter((user) =>
                checkedItems.includes(user.USER_ID)
            );

            // 유저별로 PUT 요청 보내기
            for (const user of updatedUsers) {
                // USER_ID 제외하고 수정할 데이터를 전송
                const { USER_ID, USER_USERNAME, USER_PW, USER_REGDATE, USER_LASTLOGINDATE, ...userData } = user; // 불필요한 필드 제외
                await axios.put(`api/users/update/${user.USER_ID}`, userData); // 수정된 URL
            }
            alert("회원정보 수정을 성공적으로 완료하였습니다.");

            const response = await axios.get('api/users/getAllList');
            setUsers(response.data); // 상태 업데이트로 화면 리렌더링
        } catch (error) {
            alert("회원정보 수정에 실패하였습니다. 시스템관리자에게 문의하세요.");
            //   console.error('수정 저장 오류:', error);
        }
    };

    return (
        <UsertWarp>
            <PageHeader>
                <HeaderText>회원 목록</HeaderText>
            </PageHeader>
            <SubHead>
                <LeftSubArea>
                    <SearchForm />
                    <SearchArea>
                        <InputBox>
                            <option>회원아이디</option>
                            <option>권한</option>
                            <option>이름</option>
                        </InputBox>
                        <InputBox2 type="text" placeholder="검색어를 입력해주세요." />
                        <SearchBtn>
                            <img src={process.env.PUBLIC_URL + '/assets/icon/search.svg'} alt="Upload or Selected" />
                        </SearchBtn>
                    </SearchArea>
                </LeftSubArea>
                <BtnArea>
                    <WriteBtn onClick={handleSave}>
                        선택저장
                        <img src={process.env.PUBLIC_URL + '/assets/icon/save.svg'} alt="Upload or Selected" />
                    </WriteBtn>
                    <WriteBtn>
                        선택삭제
                        <img src={process.env.PUBLIC_URL + '/assets/icon/del.svg'} alt="Upload or Selected" />
                    </WriteBtn>
                </BtnArea>
            </SubHead>
            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader rowSpan="2">
                                <CheckboxWrapper>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAllChange}
                                    />
                                </CheckboxWrapper>
                            </TableHeader>
                            <TableHeader rowSpan="2">번호</TableHeader>
                            <TableHeader rowSpan="2">회원유형</TableHeader>
                            <TableHeader colSpan="1">아이디</TableHeader>
                            <TableHeader rowSpan="2">휴대폰</TableHeader>
                            <TableHeader rowSpan="2">이메일</TableHeader>
                            <TableHeader rowSpan="2">마케팅 수신동의</TableHeader>
                            <TableHeader colSpan="1">회원상태</TableHeader>
                            <TableHeader rowSpan="2">가입일</TableHeader>
                        </tr>
                        <tr>
                            <TableHeader>이름</TableHeader>
                            <TableHeader>권한</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <React.Fragment key={user.USER_ID}>
                                <TableRow>
                                    <TableCell rowSpan="2">
                                        <CheckboxWrapper>
                                            <input
                                                type="checkbox"
                                                checked={checkedItems.includes(user.USER_ID)}
                                                onChange={() => handleCheckboxChange(user.USER_ID)}
                                            />
                                        </CheckboxWrapper>
                                    </TableCell>
                                    <TableCell rowSpan="2">{user.USER_ID}</TableCell>
                                    <TableCell rowSpan="2">{getRoleName(user.USER_OTHER)}</TableCell>
                                    <TableCell>{user.USER_USERNAME}</TableCell>
                                    <TableCell rowSpan="2">{user.USER_PHONE}</TableCell>
                                    <TableCell rowSpan="2">{user.USER_EMAIL}</TableCell>
                                    <TableCell rowSpan="2">
                                        <CheckBoxArea>
                                            <CheckboxWrapper>
                                                <input
                                                    type="checkbox"
                                                    checked={user.USER_SMSSEND === 'Y'}
                                                    onChange={() => handleMarketingChange(user.USER_ID, 'USER_SMSSEND')}
                                                />
                                                SMS
                                            </CheckboxWrapper>
                                            <CheckboxWrapper>
                                                <input
                                                    type="checkbox"
                                                    checked={user.USER_KAKAOTALKSEND === 'Y'}
                                                    onChange={() => handleMarketingChange(user.USER_ID, 'USER_KAKAOTALKSEND')}
                                                />
                                                카카오톡
                                            </CheckboxWrapper>
                                            <CheckboxWrapper>
                                                <input
                                                    type="checkbox"
                                                    checked={user.USER_EMAILSEND === 'Y'}
                                                    onChange={() => handleMarketingChange(user.USER_ID, 'USER_EMAILSEND')}
                                                />
                                                이메일
                                            </CheckboxWrapper>
                                        </CheckBoxArea>
                                    </TableCell>
                                    <TableCell>{getStatusName(user.USER_STATUS)}</TableCell>
                                    <TableCell rowSpan="2">{new Date(user.USER_REGDATE).toLocaleDateString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{user.USER_NAME}</TableCell>
                                    <TableCell>
                                        <RoleCombobox
                                            value={user.USER_ROLE}
                                            onChange={(e) => handleRoleChange(user.USER_ID, e.target.value)}
                                        >
                                            <option value="super">최고관리자</option>
                                            <option value="admin">일반관리자</option>
                                            <option value="pertener">파트너</option>
                                            <option value="customer">회원</option>
                                        </RoleCombobox>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        </UsertWarp>
    );
};

export default UserList;