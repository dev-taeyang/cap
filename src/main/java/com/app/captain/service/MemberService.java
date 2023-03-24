package com.app.captain.service;

import com.app.captain.domain.dao.MemberDAO;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberDAO memberDAO;

    public MemberVO getMember(Long memberId) {
        return memberDAO.findById(memberId);
    }
}
