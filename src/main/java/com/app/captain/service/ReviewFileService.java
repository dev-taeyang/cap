package com.app.captain.service;

import com.app.captain.domain.dao.ReviewFileDAO;
import com.app.captain.domain.vo.ReviewFileVO;
import com.app.captain.mapper.ReviewFileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewFileService {

    private final ReviewFileDAO reviewFileDAO;

    //    파일 저장
    public void write(List<ReviewFileVO> files){
        files.forEach(file -> reviewFileDAO.save(file));
    }

    //    파일 전체 조회
    public List<ReviewFileVO> getList(Long reviewId){
        return reviewFileDAO.findAll(reviewId);
    };

    //    전일 등록된 파일 조회
    public List<ReviewFileVO> getYesterday(){
        return reviewFileDAO.findYesterday();
    };

    //    파일 삭제
    public void remove(Long reviewFileId){
        reviewFileDAO.deleteById(reviewFileId);
    };

    public String getPath(){
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }
}
