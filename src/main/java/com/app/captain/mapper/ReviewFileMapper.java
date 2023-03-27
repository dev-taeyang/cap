package com.app.captain.mapper;

import com.app.captain.domain.vo.ReviewFileVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewFileMapper {
//    파일 추가
    public void insert(ReviewFileVO reviewFileVO);

//    파일 전체 조회
    public List<ReviewFileVO> selectAll(Long reviewId);

//    전일 등록된 파일 조회
    public List<ReviewFileVO> selectYesterday();

//    파일 삭제
    public void delete(Long reviewFileId);
}
