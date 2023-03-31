package com.app.captain.domain.dao;


import com.app.captain.domain.dto.GroupDTO;
import com.app.captain.domain.vo.GroupVO;
import com.app.captain.mapper.GroupMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GroupDAO {
    private final GroupMapper groupMapper;

    /* 멤버가 개설한 탐험대 가져오기 */
    public List<GroupDTO> findMyRecruit(Long memberId) {
        return groupMapper.selectMyRecruit(memberId);
    }

    /* 멤버가 가입한 탐험대 가져오기 */
    public List<GroupDTO> findMyParticipateRecruit(Long memberId) {
        return groupMapper.selectParticipateRecruit(memberId);
    }
}
