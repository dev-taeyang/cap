package com.app.captain.domain.dao;


import com.app.captain.domain.vo.MemberVO;
import com.app.captain.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberDAO {
    private final MemberMapper memberMapper;

    public MemberVO findById(Long memberId){
        return memberMapper.select(memberId);
    }
}
