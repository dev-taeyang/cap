package com.app.captain.domain.dao;


import com.app.captain.mapper.GroupMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GroupDAO {

    private final GroupMapper groupMapper;
}
