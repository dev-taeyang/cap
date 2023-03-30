package com.app.captain.domain.dao;

import com.app.captain.domain.dto.GroupReplyDTO;
import com.app.captain.mapper.GroupReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GroupReplyDAO {
    private final GroupReplyMapper groupReplyMapper;

    /* 댓글 개수 찾기 */
    public Long findReplyCount(Long memberId) { return groupReplyMapper.selectMemberReplyCount(memberId); }

    /* 멤버가 쓴 댓글 찾기 */
    public List<GroupReplyDTO> findMemberReply(Long memberId) { return groupReplyMapper.selectMemberReply(memberId); }

}