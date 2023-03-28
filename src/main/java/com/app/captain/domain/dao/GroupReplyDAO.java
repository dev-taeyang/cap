package com.app.captain.domain.dao;

import com.app.captain.mapper.GroupReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GroupReplyDAO {
    private final GroupReplyMapper groupReplyMapper;

    /* 댓글 개수 찾기 */
    public Long findReplyCount(Long memberId) { return groupReplyMapper.selectMemberReply(memberId); }

}