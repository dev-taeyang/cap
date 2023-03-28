package com.app.captain.service;

import com.app.captain.domain.dao.GroupReplyDAO;
import com.app.captain.domain.dao.MemberDAO;
import com.app.captain.domain.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MypageService {
    private final MemberDAO memberDAO;

    /* 회원 찾기 */
    public MemberVO getMemberById(Long memberId) {return memberDAO.findMemberById(memberId); }

    /* 회원탈퇴 */
    public void remove(Long memberId) { memberDAO.delete(memberId); }

    /* 정보 수정 */
    public void modify(MemberVO memberVO) { memberDAO.setMemberVO(memberVO);}

}
