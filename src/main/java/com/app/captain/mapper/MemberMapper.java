package com.app.captain.mapper;

import com.app.captain.domain.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    public MemberVO select(Long memberId);
}
