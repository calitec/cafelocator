import * as React from 'react';
import { useRef, useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useMapState } from '../../context/MapProvider';
import FontAwesomeIcons from '../common/FontAwesomeIcons';
import Input from '../common/Input';
import Button from '../../components/common/Button';
import axios from 'axios';
import { css } from '@emotion/react';

const SearchForm: React.FunctionComponent = () => {
    const { mapInfo, setMapInfo, onReset } = useMapState();
    const { mapPosition } = mapInfo;
    const setMapDatas = value => setMapInfo(prev => ({...prev, mapDatas: value }));
    const setLoading = value => setMapInfo(prev => ({...prev, loading: value }));

    const [keyword, setKeyword] = useState('');
    const onChange = e => setKeyword(e.target.value);
    const enterRef: any = useRef(null);

    // console.log('SEARCH FORM 렌더링')
    // useEffect(() => {
    //     console.log('SEARCH FORM 리렌더링')
    // }, [])

    // 키워드 없을 시 초기화
    useEffect(() => {
        if (keyword == '') onReset()
    }, [keyword])

    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        return event.key == "Enter" ? enterRef.current.click() : '';
    }

    // 전체 카페 api 요청
    const onSearch = useCallback(async e => {
        e.preventDefault();
        const { lat, lng } = mapPosition;
        onReset();
        setLoading(true);
        await axios.get(
            process.env.NODE_ENV !== 'production'
                ? `http://localhost:3070/google/nearby?lat=${lat}&lng=${lng}&keyword=${encodeURIComponent(keyword.split(' ').join(''))}`
                : `https://cafelocator-server.herokuapp.com/google/nearby?lat=${lat}&lng=${lng}&keyword=${encodeURIComponent(keyword.split(' ').join(''))}`
        )
            .then(res => setMapDatas(res.data))
            .catch(error => console.error(error));
        setLoading(false);
    }, [mapInfo, keyword])

    return (
        <div css={searchFormWrapper}>
            <Input
                placeholder='주변 카페를 검색 해보세요'
                name='keyword'
                value={keyword}
                onChange={onChange}
                autoComplete="off"
                style={input}
                onKeyPress={onEnter}
            />
            <Button ref={enterRef} onClick={onSearch}>
                <FontAwesomeIcons icon={'search'} color={'white'} />
            </Button>
        </div>
    );
};

const searchFormWrapper = css`
    display: inline-block;
    position: relative;
    top: 2px;
    width: 85%;
    button{
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        border: 0;
        background-color: transparent;
        cursor: pointer;
        z-index: 2;
    }
`
const input = css`
    background: #000024;
    color: #fff;
    line-height: 32px;
    font-weight: 500;
    border-radius: 100px;
    text-indent: 5px;
`

export default SearchForm;