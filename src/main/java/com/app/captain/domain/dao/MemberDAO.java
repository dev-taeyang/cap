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

    public int checkId(String memberIdentification) {
        return memberMapper.checkId(memberIdentification);
    }

    public int checkPhone(String memberPhone) {
        return memberMapper.checkPhone(memberPhone);
    }

    public int checkNickname(String memberNickname) {
        return memberMapper.checkNickname(memberNickname);
    }
}
