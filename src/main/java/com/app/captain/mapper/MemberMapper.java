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
    /* 중복 검사 */
    public int checkId(String memberIdentification);
    public int checkPhone(String memberPhone);
    public int checkNickname(String memberNickname);
    public Long selectPhone(String memberPhone);
}
