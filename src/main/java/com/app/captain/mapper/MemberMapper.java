package com.app.captain.mapper;

import com.app.captain.domain.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    /* 로그인 */
    public MemberVO select(MemberVO memberVO);
    /* 회원 가입 */
    public void insert(MemberVO memberVO);
    /* 아이디 중복 검사 */
    public int checkId(String memberIdentification);
    /* 휴대폰 중복 검사 */
    public int checkPhone(String memberPhone);
    /* 닉네임 중복 검사 */
    public int checkNickname(String memberNickname);
    /* 아이디 중복 검사 */
    public int checkEmail(String memberEmail);
    /* 아이디 찾기 */
    public String findId(String memberPhone);
}
