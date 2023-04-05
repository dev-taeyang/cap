package com.app.captain.mapper;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.dto.Search;
import com.app.captain.domain.vo.ReviewVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {
//    리뷰 추가
    public void insert(ReviewVO reviewVO);

//    리뷰 수정
    public void update(ReviewVO reviewVO);

//    리뷰 조회
    public ReviewVO select(Long reviewId);

//    리뷰 전체 조회
    public List<ReviewVO> selectAll(@Param("cri") Criteria criteria);

//    리뷰 삭제
    public void delete(Long reviewId);

//    리뷰랑 멤버 조인한거 조회
    public ReviewDTO selectDTO(Long reviewId);

//    리뷰 멤버 조인한거 memberId로 조회
    public ReviewDTO selectByMemberId(Long memberId);

//    memberId로 리뷰 수 조회
    public Long getCount(Long memberId);

//    review 총 개수 조회
    public int getTotal();

//    review 메인 조회
    public List<ReviewDTO> selectMain(@Param("category") String category);
}
