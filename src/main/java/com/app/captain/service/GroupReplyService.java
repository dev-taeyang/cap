package com.app.captain.service;

import com.app.captain.domain.dao.GroupReplyDAO;
import com.app.captain.mapper.GroupReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupReplyService {
    private final GroupReplyDAO groupReplyDAO;


}
