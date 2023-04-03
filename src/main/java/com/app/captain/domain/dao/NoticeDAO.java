package com.app.captain.domain.dao;

import com.app.captain.domain.vo.NoticeVO;
import com.app.captain.mapper.NoticeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class NoticeDAO {
    private final NoticeMapper noticeMapper;

    /* 공지사항 조회 */
    public NoticeVO findById(Long noticeId){ return noticeMapper.select(noticeId);}


    /* 공지사항 목록 불러오기 */
    public List<NoticeVO> findAll(){ return noticeMapper.selectAll(); }

    /* 공지사항 개수 */
    public Integer findNoticeCount(){ return noticeMapper.selectNoticeCount(); }

    /* 공지사항 수정 */
    public void setNotice(NoticeVO noticeVO) {
        noticeMapper.updateNotice(noticeVO);
    }
}
