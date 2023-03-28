package com.app.captain.mapper;

import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GroupReplyMapper {
    /* 댓글 개수 찾기 */
    public Long selectMemberReply(Long memberId);
}
