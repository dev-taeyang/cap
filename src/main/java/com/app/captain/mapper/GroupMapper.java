package com.app.captain.mapper;

import com.app.captain.domain.dto.GroupDTO;
import com.app.captain.domain.vo.GroupVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GroupMapper {

    /* 멤버가 개설한 탐험대 가져오기 */
    public List<GroupDTO> selectMyRecruit(Long memberId);

    /* 멤버가 가입한 탐험대 가져오기 */
    public List<GroupDTO> selectParticipateRecruit(Long memberId);



}
