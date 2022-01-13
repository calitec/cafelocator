import * as React from 'react'
import FontAwesomeIcons from '../../../../components/common/FontAwesomeIcons'
import { css } from '@emotion/react'
import { after, noto } from '../../../../lib/styles/common'
import Input from '../../../common/Input'

interface IReviewsPresenterProps {
  currentUser: any
  drop: boolean
  textCount: number
  reviews: {
    createdAt: string
    name: string
    content: string
    uid: string
  }[]
  reviewsCount: number
  content: string
  setDrop: () => void
  onChange: (e) => void
  onSubmit: (e) => void
  onRemove: (e) => void
  hasMore: () => void
  onLogin: (e) => void
}

const ReviewPresenter: React.FunctionComponent<IReviewsPresenterProps> = ({
  currentUser,
  drop,
  textCount,
  reviews,
  reviewsCount,
  content,
  setDrop,
  onChange,
  onSubmit,
  onRemove,
  hasMore,
  onLogin,
}) => {
  return (
    <div css={reviewsWrapper(drop)} className="list__review head">
      {/* 리뷰 */}
      <span className="icon">
        {<FontAwesomeIcons icon={'comment'} color={'black'} />}
      </span>
      <div onClick={() => setDrop()} className="arrow">
        <span className="indent">한줄 리뷰</span>
      </div>
      <form
        action=""
        onSubmit={onSubmit}
        onClick={currentUser == null ? onLogin : null}
      >
        <Input
          placeholder={
            currentUser != null
              ? '입력 후 엔터를 눌러주세요.'
              : '로그인이 필요합니다.'
          }
          disabled={currentUser ? false : true}
          name="content"
          value={content}
          onChange={onChange}
          autoComplete="off"
          maxLength={19}
          style={inputStyle}
        />
        <span>{20 - textCount} / 20</span>
      </form>
      <ul className="comment">
        {reviews.length > 1 ? (
          reviews.map((v, i) => {
            return (
              <li key={v.createdAt}>
                <span className="userName">{v.name}</span>
                <span className="content">{v.content}</span>
                {currentUser?.uid == reviews[i].uid ? (
                  <button className="delete" onClick={() => onRemove(i)}>
                    <FontAwesomeIcons icon={'close'} color={'red'} />
                  </button>
                ) : (
                  ''
                )}
              </li>
            )
          })
        ) : reviews.length == 0 ? (
          <li className="nodata">정보 없음</li>
        ) : (
          <li>
            <span className="userName">{reviews[0]?.name}</span>
            <span className="content">{reviews[0]?.content}</span>
            {reviews.length >= 1 && currentUser?.uid == reviews[0]?.uid ? (
              <button className="delete" onClick={() => onRemove(0)}>
                <FontAwesomeIcons icon={'close'} color={'red'} />
              </button>
            ) : (
              ''
            )}
          </li>
        )}
        {reviewsCount != reviews.length ? (
          <div className="plus">
            <button onClick={hasMore}>더 보기</button>
          </div>
        ) : (
          ''
        )}
      </ul>
    </div>
  )
}

const reviewsWrapper = (dropReviews) => css`
  position: relative;
  height: ${dropReviews ? 'auto' : '25px'};
  overflow: hidden;
  em,
  span {
    display: inline-block;
  }
  form {
    text-align: right;
    span {
      position: relative;
      top: -10px;
    }
  }
  ${after()}
  li {
    position: relative;
    color: #000;
    .userName {
      width: 20%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .content {
      width: 75%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    &.nodata {
      display: block;
      text-align: center;
    }
  }
  ul.comment {
    li {
      padding: 0 6px;
      .delete {
        float: right;
        cursor: pointer;
        background: none;
        border: 0;
        padding: 0;
      }
    }
  }
  .arrow {
    cursor: pointer;
    span {
      width: auto;
    }
    &::before {
      display: block;
      content: '';
      clear: both;
      position: absolute;
      top: 10px;
      right: 5px;
      width: 8px;
      height: 2px;
      background: #000;
      transform: ${dropReviews ? 'rotate(-45deg)' : 'rotate(45deg)'};
    }
    &::after {
      display: block;
      content: '';
      clear: both;
      position: absolute;
      top: 10px;
      right: 0;
      width: 8px;
      height: 2px;
      background: #000;
      transform: ${dropReviews ? 'rotate(45deg)' : 'rotate(-45deg)'};
    }
  }
  .plus {
    text-align: center;
    button {
      cursor: pointer;
      font: ${noto(14, 500)};
      background: none;
      border: 0;
      padding: 10px 15px;
      svg {
        font-size: 15px;
      }
    }
  }
`

const inputStyle = css`
  background: #000024;
  color: #fff;
  font: ${noto()};
  font-weight: 500;
  border-radius: 100px;
  margin: 15px 0;
  text-indent: 5px;
  z-index: 2;
`

export default React.memo(ReviewPresenter)
