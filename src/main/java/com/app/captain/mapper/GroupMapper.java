package com.app.captain.mapper;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.GroupDTO;
import com.app.captain.domain.vo.GroupVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GroupMapper {

    /* 멤버가 개설한 탐험대 가져오기 */
    public List<GroupDTO> selectMyRecruit(Long memberId,@Param("cri") Criteria criteria);

    /* 멤버가 개설한 탐험대의 갯수 가져오기 */
    public Integer selectCountMyRecruit(Long memberId);

    /* 멤버가 가입한 탐험대 가져오기 */
    public List<GroupDTO> selectParticipateRecruit(Long memberId, @Param("cri") Criteria criteria);

    /* 멤버가 가입한 탐험대의 갯수 가져오기 */
    public Integer selectCountMyParticipate(Long memberId);

    /* 그룹 개설*/
    public void insert(GroupVO groupVO);

    /* 그룹아이디로 조회 */
    public GroupVO selectByGroupId(Long groupId);

    /* 그룹 수정 */
    public void update(GroupVO groupVO);

    /* 그룹 삭제 */
    public void delete(Long groupId);

    /* 그룹 전체 조회 */
    public List<GroupVO> sellectAll();

    /* groupCaptain으로  그롭조회 */
    public GroupVO selectByCaptain(Long groupCaptain);

    /* memberId로 groupId조회 */
    public Long selectIdByMemberId(Long memberId);

    /* groupCaptain으로 groupId조회 */
    public Long selectIdByCaptain(Long groupCaptain);

    /* 그룹 수 세는 거 */
    public int selectCount(Long groupId);

    /* 모든 탐험대 조회 */
    public List<GroupDTO> selectAllGroup(@Param("cri") Criteria criteria,@Param("keyword") String keyword,@Param("category") String category);
    /* 모든 탐험대 수 조회 */
    public Integer countAllGroup(String keyword,String category);

    /* 메인에 띄울 탐험대 조회 */
    public List<GroupDTO> selectMainGroup(@Param("category") String category);
}
