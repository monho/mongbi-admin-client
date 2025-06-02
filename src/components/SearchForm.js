import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SearchFormWarp = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

const SearchCombobox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const SearchDateArea = styled.div`
    display: flex;
`;

const DateText = styled.span`
    color: #222;
    font-weight: 700;
    margin-right: 8px;
`;

const InputBox = styled.input`
    width: 148px;
    height: 38px;
    padding: 8px 12px;
    border: 1px solid #DDD;
    color: #222;
    box-sizing: border-box;
    border-radius: 4px;
`;

const SearchBtn = styled.button`
    width:38px;
    height:38px;
    background-color:#F8F8F8;
    color:#222;
    border: 1px solid #DDD;
    cursor:pointer;
    border-radius : 4px;
`

const SearchForm = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // 오늘 날짜 구하기
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줘야 함
        const day = String(currentDate.getDate()).padStart(2, '0');

        // YYYY-MM-DD 형식으로 날짜 포맷
        const formattedDate = `${year}-${month}-${day}`;

        // 오늘 날짜를 기본값으로 설정
        setStartDate(formattedDate);
        setEndDate(formattedDate);
    }, []);

    return (
        <SearchFormWarp>
            <SearchCombobox>
                <DateText className='text-sm'>날짜를 선택해주세요</DateText>
                <InputBox
                    value={startDate}
                    max="2030-12-31"
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                />
                ~
                <InputBox
                    value={endDate}
                    type="date"
                    max="2030-12-31"
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <SearchBtn>
                    <img src={process.env.PUBLIC_URL + '/assets/icon/search.svg'}
                        alt="Upload or Selected"
                    />
                </SearchBtn>
            </SearchCombobox>
        </SearchFormWarp>
    );
};

export default SearchForm;
