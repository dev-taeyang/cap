package com.app.captain.service;

import com.app.captain.domain.dao.MemberGroupDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberGroupService {

    private final MemberGroupDAO memberGroupDAO;

    /* 그룹 참여하기 */
    public void register(Long groupId, Long memberId){
        memberGroupDAO.joinGroup(groupId, memberId);
    };

    /* 그룹아이디로 memberGroupId 조회하기 */
    public Long getMemberId(Long groupId){
        return memberGroupDAO.findMemberIdByGroupId(groupId);
    };

    /* 그룹아이디로 가입한 member 수 구하기 */
    public int getCountByGroupId(Long groupId){
        return memberGroupDAO.findMemberCountByGroupId(groupId);
    };

    /* groupId로 삭제하기 */
    public void delete(Long groupId){
        memberGroupDAO.delete(groupId);
    };
}
