package com.app.captain.domain.dao;


import com.app.captain.domain.dto.Criteria;
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
    public List<GroupDTO> findMyRecruit(Long memberId, Criteria criteria) {
        return groupMapper.selectMyRecruit(memberId, criteria);
    }

    /* 멤버가 개설한 탐험대의 갯수 가져오기 */
    public Integer findCountMyRecruit(Long memberId) { return groupMapper.selectCountMyRecruit(memberId); }

    /* 멤버가 가입한 탐험대 가져오기 */
    public List<GroupDTO> findMyParticipateRecruit(Long memberId, Criteria criteria) {
        return groupMapper.selectParticipateRecruit(memberId, criteria);
    }

    /* 멤버가 가입한 탐험대의 갯수 가져오기 */
    public Integer findCountMyParticipate(Long memberId) {
        return groupMapper.selectCountMyParticipate(memberId);
    }
}
