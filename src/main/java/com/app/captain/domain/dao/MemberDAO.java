package com.app.captain.domain.dao;


import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberDAO {
    private final MemberMapper memberMapper;

    /* 로그인 */
    public MemberVO findById(String memberIdentification, String memberPassword) {
        return memberMapper.select(memberIdentification, memberPassword);
    }
    public Long findMemberId(String memberIdentification, String memberPassword){
        return memberMapper.selectMemberId(memberIdentification, memberPassword);
    }
    /* 회원 수 조회*/
    public Integer findMemberCount(){ return memberMapper.selectMemberCount(); }
    /* 회원 목록 조회 */
    public List<MemberVO> findAll(Criteria criteria){ return memberMapper.selectAll(criteria); }
    /* 회원 찾기 */
    public MemberVO findMemberById(Long memberId) { return memberMapper.selectMember(memberId); }
    /* 이메일로 회원 찾기 */
    public MemberVO findMemberByEmail(String memberEmail) { return memberMapper.selectMemberByEmail(memberEmail); };
    /* 회원 가입 */
    public void save(MemberVO memberVO) {
        memberMapper.insert(memberVO);
    }
    /* 아이디 중복 검사 */
    public Integer checkId(String memberIdentification) {
        return memberMapper.checkId(memberIdentification);
    }

    /* 휴대폰 중복 검사 */
    public Integer checkPhone(String memberPhone) {
        return memberMapper.checkPhone(memberPhone);
    }

    /* 닉네임 중복 검사 */
    public Integer checkNickname(String memberNickname) {
        return memberMapper.checkNickname(memberNickname);
    }

    /* 이메일 중복 검사 */
    public Integer checkEmail(String memberEmail) {
        return memberMapper.checkEmail(memberEmail);
    }

    /* 아이디 찾기 */
    public String findId(String memberPhone) {
        return memberMapper.findId(memberPhone);
    }

    /* 계정 검사 */
    public Integer checkStatus(String memberEmail){return memberMapper.checkStatus(memberEmail);}

    /* 비밀번호 변경 */
    public void changePassword(String memberEmail, String memberPassword){
        memberMapper.changePassword(memberEmail, memberPassword);
    }

    /* 랜덤키 가져오기 */
    public String selectKey(String memberEmail) { return memberMapper.selectKey(memberEmail); }

    /* 랜덤키 업데이트 */
    public void updateKey(String memberEmail, String memberRandomKey) { memberMapper.updateKey(memberEmail, memberRandomKey); }

    /* 회원정보 업데이트 */
    public void setMemberVO(MemberVO memberVO) { memberMapper.memberUpdate(memberVO);}

    /* 회원 프로필 사진 업데이트 */
    public void setMemberFileVO(MemberVO memberVO) { memberMapper.memberFileUpdate(memberVO);}

    /* 관리자용 회원 수정 */
    public void setMemberAll(MemberVO memberVO) { memberMapper.memberUpdateAll(memberVO); }

    /* 회원탈퇴 */
    public void delete(Long memberId) { memberMapper.delete(memberId); }

    /* 비밀번호 업데이트 */
    public void setMemberPassword(MemberVO memberVO) { memberMapper.updatePassword(memberVO);}

    /* 비밀번호 중복체크 */
    public Integer checkPassword(String memberPassword) {
        return memberMapper.checkPassword(memberPassword);
    }
}
