package com.app.captain.domain.dao;


import com.app.captain.domain.vo.MemberVO;
import com.app.captain.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberDAO {
    private final MemberMapper memberMapper;

    /* 로그인 */
    public MemberVO findById(MemberVO memberVO) {
        return memberMapper.select(memberVO);
    }

    /* 회원 가입 */
    public void save(MemberVO memberVO) {
        memberMapper.insert(memberVO);
    }
    /* 아이디 중복 검사 */
    public int checkId(String memberIdentification) {
        return memberMapper.checkId(memberIdentification);
    }

    /* 휴대폰 중복 검사 */
    public int checkPhone(String memberPhone) {
        return memberMapper.checkPhone(memberPhone);
    }

    /* 닉네임 중복 검사 */
    public int checkNickname(String memberNickname) {
        return memberMapper.checkNickname(memberNickname);
    }

    /* 이메일 중복 검사 */
    public int checkEmail(String memberEmail) {
        return memberMapper.checkEmail(memberEmail);
    }

    /* 아이디 찾기 */
    public String findId(String memberPhone) {
        return memberMapper.findId(memberPhone);
    }
}
