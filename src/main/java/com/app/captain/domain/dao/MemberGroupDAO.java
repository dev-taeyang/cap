package com.app.captain.domain.dao;

import com.app.captain.mapper.MemberGroupMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberGroupDAO {

    private final MemberGroupMapper memberGroupMapper;

    /* 그룹 참여하기 */
    public void joinGroup(Long groupId, Long memberId){
        memberGroupMapper.join(groupId, memberId);
    };

    /* 그룹아이디로 memberGroupId 조회하기 */
    public Long findMemberIdByGroupId(Long groupId){
        return memberGroupMapper.selectByGroupId(groupId);
    };

    /* 그룹아이디로 가입한 member 수 구하기 */
    public int findMemberCountByGroupId(Long groupId){
        return memberGroupMapper.memberCountByGroupId(groupId);
    };

    /* groupId로 삭제하기 */
    public void delete(Long groupId){
        memberGroupMapper.delete(groupId);
    };
}
