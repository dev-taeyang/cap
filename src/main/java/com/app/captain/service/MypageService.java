package com.app.captain.service;

import com.app.captain.domain.dao.MypageDAO;
import com.app.captain.domain.dto.MypageDTO;
import com.app.captain.domain.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MypageService {
    private final MypageDAO mypageDAO;

    //    내 정보들 가져오기
    public MypageDTO getMember(Long memberId) { return mypageDAO.findById(memberId); }

    //    내 정보 수정하기
    public void modify(MemberVO memberVO) { mypageDAO.setMemberVO(memberVO); }

    //    회원탈퇴하기
    public void remove(Long memberId) { mypageDAO.deleteById(memberId); }
}
