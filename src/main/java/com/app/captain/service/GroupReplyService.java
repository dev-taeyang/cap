package com.app.captain.service;

import com.app.captain.domain.dao.GroupReplyDAO;
import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.GroupReplyDTO;
import com.app.captain.domain.vo.GroupReplyVO;
import com.app.captain.mapper.GroupReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupReplyService {
    private final GroupReplyDAO groupReplyDAO;

    /* 그룹 id로 탐험대에 작성된 댓글의 갯수 가져오기 */
    public Long getReplyCount(Long groupId) { return groupReplyDAO.findReplyCount(groupId); }

    /* 그룹 id로 탐험대에 작성된 댓글들의 정보 가져오기 */
    public List<GroupReplyDTO> getGroupReply(Long groupId) {
        return groupReplyDAO.findGroupReply(groupId);
    }

    public GroupReplyDTO getGroupReplyDTO(Criteria criteria){ return groupReplyDAO.findGroupReplyDTO(criteria);}

    /* 댓글 입력하기 */
    public void setReply(GroupReplyVO groupReplyVO) {
        groupReplyDAO.saveReply(groupReplyVO);
    }

    /* 댓글 삭제하기 */
    public void removeReply(Long groupReplyId) {
        groupReplyDAO.deleteReply(groupReplyId);
    }

    /* 댓글 수정하기 */
    public void modifyReply(GroupReplyVO groupReplyVO) {
        groupReplyDAO.setReplyVO(groupReplyVO);
    }
}
