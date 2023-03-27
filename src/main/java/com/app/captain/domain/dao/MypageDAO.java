package com.app.captain.domain.dao;

import com.app.captain.domain.dto.MypageDTO;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MypageDAO {
    private final MypageMapper mypageMapper;

    //    내 정보들 가져오기
    public MypageDTO findById(Long memberId) { return mypageMapper.select(memberId); }

    //    내 댓글 갯수 가져오기
    public Long findReplyById(Long memberId) { return mypageMapper.replyCount(memberId); }

    //    내 정보 수정하기
    public void setMemberVO(MemberVO memberVO) { mypageMapper.update(memberVO); }

    //    회원탈퇴하기
    public void deleteById(Long memberId) { mypageMapper.delete(memberId); }

}
