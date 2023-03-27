package com.app.captain.domain.dao;

import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewDAO {
    private final ReviewMapper reviewMapper;

    //    리뷰 추가
    public void save(ReviewVO reviewVO){
        reviewMapper.insert(reviewVO);
    };

    //    리뷰 수정
    public void setReviewVO(ReviewVO reviewVO){
        reviewMapper.update(reviewVO);
    };

    //    리뷰 조회
    public ReviewVO findById(Long reviewId){
        return reviewMapper.select(reviewId);
    };

    //    리뷰 전체 조회
    public List<ReviewVO> findAll(){
        return reviewMapper.selectAll();
    };

    //    리뷰 삭제
    public void deleteById(Long reviewId){
        reviewMapper.delete(reviewId);
    };


}
