package com.app.captain.service;

import com.app.captain.mapper.MemberGroupMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberGroupService {

    private final MemberGroupMapper memberGroupMapper;
}
