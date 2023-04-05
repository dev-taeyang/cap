package com.app.captain.mapper;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.GroupReplyDTO;
import com.app.captain.domain.vo.GroupReplyVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GroupReplyMapper {
    /* 댓글 개수 찾기 */
    public Integer selectMemberReplyCount(Long memberId);
    public Integer selectReplyCountAll();

    /* 멤버가 쓴 댓글 찾기 */
    public List<GroupReplyDTO> selectMemberReply(Long memberId,@Param("cri") Criteria criteria);
    public GroupReplyDTO selectGroupReplyDTO();

    /* 그룹 id로 탐험대에 작성된 댓글의 갯수 가져오기 */
    public Long selectReplyCount(Long groupId);

    /* 댓글 전체 리스트 가져오기 */
    public List<GroupReplyDTO> selectGroupReplyAll(@Param("cri") Criteria criteria);

    /* 그룹 id로 탐험대에 작성된 댓글들의 정보 가져오기 */
    public List<GroupReplyDTO> selectGroupReply(Long groupId);
    public GroupReplyDTO selectGroupReplyOne(Long groupReplyId);

    /* 댓글 입력하기 */
    public void insertReply(GroupReplyVO groupReplyVO);

    /* 댓글 삭제하기 */
    public void deleteReply(Long groupReplyId);

    /* 댓글 수정하기 */
    public void updateReply(GroupReplyVO groupReplyVO);
}
