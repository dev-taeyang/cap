package com.app.captain.service;

import com.app.captain.domain.dao.NoticeDAO;
import com.app.captain.domain.vo.NoticeVO;
import com.app.captain.mapper.NoticeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeDAO noticeDAO;

    /* 공지사항 조회 */
    public NoticeVO getNotice(Long noticeId){ return noticeDAO.findById(noticeId); }

    /* 공지사항 목록 불러오기 */
    public List<NoticeVO> getList(){ return noticeDAO.findAll(); }

    /* 공지사항 개수 */
    public Integer getNoticeCount(){return noticeDAO.findNoticeCount(); }
}
