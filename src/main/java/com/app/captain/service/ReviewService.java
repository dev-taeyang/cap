package com.app.captain.service;

import com.app.captain.domain.dao.ReviewDAO;
import com.app.captain.domain.dao.ReviewFileDAO;
import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.dto.ReviewFileDTO;
import com.app.captain.domain.dto.Search;
import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewDAO reviewDAO;
    private final ReviewFileDAO reviewFileDAO;

//    게시물 작성
    public void write(ReviewVO reviewVO){
        reviewDAO.save(reviewVO);
    }

//    게시물 수정
    public void modify(ReviewVO reviewVO){
        reviewDAO.setReviewVO(reviewVO);
    }

//    게시물 삭제
    public void remove(Long reviewId){
        reviewDAO.deleteById(reviewId);
    }

//    게시물 조회
    public ReviewVO getReview(Long reviewId){
        ReviewVO reviewVO = reviewDAO.findById(reviewId);
        return reviewVO;
    }

//    게시물 전체 조회
    public List<ReviewVO> getList(Criteria criteria){
        criteria.create(getTotalCount());
        return reviewDAO.findAll(criteria);
    }

    //    리뷰랑 멤버 조인한거 조회
    public ReviewDTO getDTO(Long reviewId){
        return reviewDAO.findDTO(reviewId);
    };

//    리뷰랑 멤버 조인한거 memberId로 조회
    public ReviewDTO getDTObyMemberId(Long memberId){
        return reviewDAO.findByMemberId(memberId);
    }

//    memberId로 review 개수 조회
    public Long reviewCount(Long memberId){
        return reviewDAO.getCountByMemberId(memberId);
    }

    //    review 총 개수 조회
    public int getTotalCount(){
        return reviewDAO.findTotal();
    };

    //    review 메인 조회
    public List<ReviewDTO> getTotalMain() { return reviewDAO.findTotalMain(); };

}
