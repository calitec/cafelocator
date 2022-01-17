import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  push,
  update,
  orderByChild,
  equalTo,
  endAt,
  limitToLast,
  query,
  onValue,
} from 'firebase/database'
import { toast } from 'react-toastify'
import { useAuthState } from '../../../../context/AuthProvider'
import { useMapState } from '../../../../context/MapProvider'
import ReviewPresenter from './ReviewPresenter'
import useToggle from '../../../../lib/hooks/useToggle'
import useScrollTo from '../../../../lib/hooks/useScrollTo'
import { getAuth } from 'firebase/auth'
interface IReviewsContainerProps {
  wrapperRef: any
}

const ReviewContainer: React.FunctionComponent<IReviewsContainerProps> = ({
  wrapperRef,
}) => {
  const db = getDatabase()
  const auth = getAuth()
  const reviewsRef = ref(db, 'reviews')
  const currentUser = auth.currentUser
  const { mapInfo } = useMapState()
  const { mapDetail } = mapInfo
  const { user, onLogin } = useAuthState()
  const [reviews, setReviews] = useState([])
  const [reviewsCount, setReviewsCount] = useState(0)
  const [offset, setOffset] = useState('')
  const [content, setContent] = useState('')
  const [textCount, setTextCount] = useState(0)
  const [drop, setDrop] = useToggle(false)
  const onChange = (e) => {
    setContent(e.target.value)
    setTextCount(e.target.value.length)
  }
  useScrollTo(wrapperRef, reviews)

  // 리뷰 읽기
  useEffect(() => {
    initReviews()
    setReviews([])
    if (drop) {
      initReviews()
    }
  }, [mapInfo.mapDetail, drop, reviewsCount])

  // offset 값 저장
  useEffect(() => {
    setOffset(reviews[reviews.length - 1]?.createdAt)
  }, [offset, reviews])

  // 리뷰 쓰기
  const onSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('로그인이 필요합니다.')
      return
    }
    if (content.length < 3) {
      toast.error('3글자 이상 입력 해주세요.')
      return
    }
    const userUid = currentUser.uid
    const userName = currentUser.displayName
    set(push(child(reviewsRef, `${mapDetail.place_id}`)), {
      place_id: mapDetail.place_id,
      name: userName,
      uid: userUid,
      content: content,
      createdAt: +new Date(),
    })
    toast.info('리뷰가 작성되었습니다.')
    setContent('')
  }

  const onRemove = useCallback(
    (i) => {
      if (window.confirm('삭제 하시겠습니까?')) {
        if (currentUser && currentUser.uid == reviews[i].uid) {
          get(
            query(
              child(reviewsRef, `${mapDetail.place_id}`),
              orderByChild('createdAt'),
              equalTo(reviews[i].createdAt)
            )
          ).then((DataSnapshot) => {
            const updates = {}
            DataSnapshot.forEach((child) => (updates[child.key] = null))
            update(child(reviewsRef, `${mapDetail.place_id}`), updates)
          })
        }
        if (reviews.length == 1) setReviews([])
      }
    },
    [reviews]
  )
  useEffect(() => {
    console.log(reviews)
  }, [reviews])
  const hasMore = useCallback(() => {
    if (mapDetail.place_id != undefined && offset != null) {
      get(
        query(
          child(reviewsRef, `${mapDetail.place_id}`),
          orderByChild('createdAt'),
          endAt(offset),
          limitToLast(5 + 1)
        )
      ).then((DataSnapshot) => {
        if (DataSnapshot.size >= 1) {
          setReviews(
            reviews.concat(
              Object.values(DataSnapshot.val()).reverse().slice(1, 6)
            )
          )
        }
      })
    }
  }, [offset, reviews])

  function initReviews() {
    if (mapDetail?.place_id != undefined) {
      if (drop) {
        onValue(child(reviewsRef, `${mapDetail.place_id}`), (snapshot) => {
          if (snapshot.exists()) setReviewsCount(snapshot.size)
        })
      }
      onValue(
        query(child(reviewsRef, `${mapDetail.place_id}`), limitToLast(5)),
        (DataSnapshot) => {
          if (DataSnapshot.val() != null) {
            setReviews(Object.values(DataSnapshot.val()).reverse())
          }
        }
      )
    }
  }

  return (
    <ReviewPresenter
      currentUser={currentUser}
      textCount={textCount}
      drop={drop}
      setDrop={setDrop}
      reviews={reviews}
      reviewsCount={reviewsCount}
      content={content}
      onChange={onChange}
      onSubmit={onSubmit}
      onRemove={onRemove}
      hasMore={hasMore}
      onLogin={onLogin}
    />
  )
}

export default React.memo(ReviewContainer)
