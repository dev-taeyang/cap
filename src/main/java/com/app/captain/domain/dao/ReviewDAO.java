package com.app.captain.domain.dao;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.dto.Search;
import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
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
    public List<ReviewVO> findAll(Criteria criteria){
        return reviewMapper.selectAll(criteria);
    };

    //    리뷰 삭제
    public void deleteById(Long reviewId){
        reviewMapper.delete(reviewId);
    };

    //    리뷰랑 멤버 조인한거 조회
    public ReviewDTO findDTO(Long reviewId){
        return reviewMapper.selectDTO(reviewId);
    };

    //    리뷰 멤버 조인한거 memberId로 조회
    public ReviewDTO findByMemberId(Long memberId){
        return reviewMapper.selectByMemberId(memberId);
    };

    //    review 총 개수 조회
    public int findTotal(){
        return reviewMapper.getTotal();
    };

    //    review 메인 조회
    public List<ReviewDTO> findTotalMain(String category){ return reviewMapper.selectMain(category); };

    //    리뷰 수 조회
    public int findCountByMemberId(Long memberId){
        return reviewMapper.getCount(memberId);
    };

    //    memberId로 내가 쓴 리뷰 조회
    public List<ReviewDTO> getMyReview(Criteria criteria, Long memberId) { return reviewMapper.selectMyReview(criteria, memberId); };
}
