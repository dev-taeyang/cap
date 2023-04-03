package com.app.captain.mapper;

import com.app.captain.domain.vo.NoticeVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {
    /* 공지사항 조회 */
    public NoticeVO select(Long noticeId);

    /* 공지사항 목록 불러오기 */
    public List<NoticeVO> selectAll();

    /* 공지사항 개수 */
    public Integer selectNoticeCount();
}
