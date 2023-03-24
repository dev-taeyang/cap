package com.app.captain.service;

import com.app.captain.domain.dao.ReviewDAO;
import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewDAO reviewDAO;

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
    public ReviewVO getReveiw(Long reviewId){
        return reviewDAO.findById(reviewId);
    }

//    게시물 전체 조회
    public List<ReviewVO> getList(){
        return reviewDAO.findAll();
    }


}
