package com.app.captain.service;

import com.app.captain.domain.dao.NoticeDAO;
import com.app.captain.domain.dto.Criteria;
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
    public List<NoticeVO> getList(Criteria criteria){
        criteria.create(noticeDAO.findNoticeCount());
        return noticeDAO.findAll(criteria);
    }

    /* 공지사항 개수 */
    public Integer getNoticeCount(){return noticeDAO.findNoticeCount(); }

    /* 공지사항 수정 */
    public void setNotice(NoticeVO noticeVO) {
        noticeDAO.setNotice(noticeVO);
    }

    /* 공지사항 작성 */
    public void registerNotice(NoticeVO noticeVO) {
        noticeDAO.registerNotice(noticeVO);
    }

    /* 공지사항 삭제 */
    public void removeById(Long noticeId) {
        noticeDAO.removeById(noticeId);
    }
}
