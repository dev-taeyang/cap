package com.app.captain.domain.dao;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.GroupReplyDTO;
import com.app.captain.domain.vo.GroupReplyVO;
import com.app.captain.mapper.GroupReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GroupReplyDAO {
    private final GroupReplyMapper groupReplyMapper;

    /* 댓글 개수 찾기 */
    public Integer findMemberReplyCount(Long memberId) { return groupReplyMapper.selectMemberReplyCount(memberId); }
    public Integer findReplyCountAll() { return groupReplyMapper.selectReplyCountAll(); }

    /* 멤버가 쓴 댓글 찾기 */
    public List<GroupReplyDTO> findMemberReply(Long memberId, Criteria criteria) { return groupReplyMapper.selectMemberReply(memberId, criteria); }

    /* 댓글 상세보기 */
    public GroupReplyDTO findMemberReplyById(Long groupReplyId) { return groupReplyMapper.selectGroupReplyDTOOne(groupReplyId);}

    /* 전체 댓글 */
    public GroupReplyDTO findGroupReplyDTO(){ return groupReplyMapper.selectGroupReplyDTO();}

    /* 댓글 전체 리스트 가져오기 */
    public List<GroupReplyDTO> findGroupReplyList(Criteria criteria) { return groupReplyMapper.selectGroupReplyAll(criteria);}

    /* 그룹 id로 탐험대에 작성된 댓글의 갯수 가져오기 */
    public Long findReplyCount(Long groupId) { return groupReplyMapper.selectReplyCount(groupId); }


    /* 그룹 id로 탐험대에 작성된 댓글들의 정보 가져오기 */
    public List<GroupReplyDTO> findGroupReply(Long groupId) {
        return groupReplyMapper.selectGroupReply(groupId);
    }

    /* 댓글 입력하기 */
    public void saveReply(GroupReplyVO groupReplyVO) {
        groupReplyMapper.insertReply(groupReplyVO);
    }

    /* 댓글 삭제하기 */
    public void deleteReply(Long groupReplyId) {
        groupReplyMapper.deleteReply(groupReplyId);
    }

    /* 댓글 수정하기 */
    public void setReplyVO(GroupReplyVO groupReplyVO) {
        groupReplyMapper.updateReply(groupReplyVO);
    }
}