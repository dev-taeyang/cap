package com.app.captain.mapper;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberMapper {
    /* 로그인 */
    public MemberVO select(String memberIdentification, String memberPassword);
    public Long selectMemberId(String memberIdentification, String memberPassword);
    /* 회원 목록 조회 */
    public List<MemberVO> selectAll(@Param("cri") Criteria criteria);
    /* 회원 수 조회*/
    public Integer selectMemberCount();
    /* 회원 찾기*/
    public MemberVO selectMember(Long memberId);
    /* 카카오 회원 찾기 */
    public MemberVO selectMemberByEmail(String memberEmail);
    /* 회원 가입 */
    public void insert(MemberVO memberVO);
    /* 아이디 중복 검사 */
    public Integer checkId(String memberIdentification);
    /* 휴대폰 중복 검사 */
    public Integer checkPhone(String memberPhone);
    /* 닉네임 중복 검사 */
    public Integer checkNickname(String memberNickname);
    /* 아이디 중복 검사 */
    public Integer checkEmail(String memberEmail);
    /* 카카오 계정 검사 */
    public Integer checkStatus(String memberEmail);
    /* 아이디 찾기 */
    public String findId(String memberPhone);
    /* 비밀번호 변경 */
    public void changePassword(String memberEmail, String memberPassword);
    /* 랜덤키 가져오기 */
    public String selectKey(String memberEmail);
    /* 랜덤키 업데이트 */
    public void updateKey(String memberEmail, String memberRandomKey);
    /* 회원정보 업데이트 */
    public void memberUpdate(MemberVO memberVO);
    /* 회원 프로필 사진 업데이트 */
    public void memberFileUpdate(MemberVO memberVO);
    /* 관리자용 회원 수정 */
    public void memberUpdateAll(MemberVO memberVO);
    /* 회원탈퇴 */
    public void delete(Long memberId);
    /* 비밀번호 업데이트 */
    public void updatePassword(MemberVO memberVO);
    /* 비밀번호 중복체크 */
    public Integer checkPassword(String memberPassword);
}
