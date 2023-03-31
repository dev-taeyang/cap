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
    public Long findMemberReplyCount(Long memberId) { return groupReplyMapper.selectMemberReplyCount(memberId); }

    /* 멤버가 쓴 댓글 찾기 */
    public List<GroupReplyDTO> findMemberReply(Long memberId) { return groupReplyMapper.selectMemberReply(memberId); }

    /* 그룹 id로 탐험대에 작성된 댓글의 갯수 가져오기 */
    public Long findReplyCount(Long groupId) { return groupReplyMapper.selectReplyCount(groupId); }

}