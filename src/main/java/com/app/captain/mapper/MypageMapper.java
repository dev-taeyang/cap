package com.app.captain.mapper;

import com.app.captain.domain.dto.MypageDTO;
import com.app.captain.domain.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageMapper {
//    내 정보들 가져오기
    public MypageDTO select(Long memberId);

//    내 정보 수정하기
    public void update(MemberVO memberVO);

//    회원탈퇴하기
    public void delete(Long memberId);

}
