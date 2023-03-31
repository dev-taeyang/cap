package com.app.captain.service;

import com.app.captain.domain.dao.GroupReplyDAO;
import com.app.captain.mapper.GroupReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupReplyService {
    private final GroupReplyDAO groupReplyDAO;

    /* 그룹 id로 탐험대에 작성된 댓글의 갯수 가져오기 */
    public Long getReplyCount(Long groupId) { return groupReplyDAO.findReplyCount(groupId); }

}
