package com.app.captain.mapper;

import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.vo.ReviewVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
//    리뷰 추가
    public void insert(ReviewDTO reviewDTO);

//    리뷰 수정
    public void update(ReviewVO reviewVO);

//    리뷰 조회
    public ReviewVO select(Long reviewId);

//    리뷰 전체 조회
    public List<ReviewVO> selectAll();

//    리뷰 삭제
    public void delete(Long reviewId);
}
