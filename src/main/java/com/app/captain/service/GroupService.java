package com.app.captain.service;

import com.app.captain.domain.dao.GroupDAO;
import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.GroupDTO;
import com.app.captain.domain.vo.GroupVO;
import com.app.captain.mapper.GroupMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupDAO groupDAO;

    /* 그룹 개설*/
    public void write(GroupVO groupVO){
        groupDAO.register(groupVO);
    };

    /* 그룹아이디로 조회 */
    public GroupVO getGroupByGroupId(Long groupId) {
        return groupDAO.findByGroupId(groupId);
    };

    /* 그룹 수정 */
    public void modify(GroupVO groupVO){
        groupDAO.update(groupVO);
    };

    public void modifyByAdmin(GroupVO groupVO){
        groupDAO.updateByAdmin(groupVO);
    };

    /* 그룹 삭제 */
    public void delete(Long groupId){
        groupDAO.delete(groupId);
    };

    /* 그룹 전체 조회 */
    public List<GroupVO> getList(Criteria criteria){
        criteria.create(groupDAO.findCountAll());
        return groupDAO.findAll(criteria);
    };

    /* groupCaptain으로  그롭조회 */
    public GroupVO getGroupByGroupCaptain(Long groupCaptain){
        return groupDAO.findByGroupCaptain(groupCaptain);
    };

    /* memberId로 groupId조회 */
    public Long getIdByMemberId(Long memberId){
        return groupDAO.findIdByGroupId(memberId);
    };

    /* groupCaptain으로 groupId조회 */
    public Long getIdByGroupCaptain(Long groupCaptain){
        return groupDAO.findIdByGroupCaptain(groupCaptain);
    };

    /* 그룹 수 세는 거 */
    public int getCountByGroupId(Long groupId){
        return groupDAO.findCountByGroupId(groupId);
    };

    //    path 구하는 메소드
    public String getPath(){
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    /* 모든 탐험대 조회 */
    public List<GroupDTO> getAllGroup(Criteria criteria,String keyword,String category) {
        criteria.create(getcountAllGroup(keyword,category));
        return groupDAO.findAllGroup(criteria,keyword,category);
    }
    /* 모든 탐험대 수 조회 */
    public Integer getcountAllGroup(String keyword,String category) {
        return groupDAO.findcountAllGroup(keyword,category);
    }

    /* 메인에 띄울 탐험대 조회 */
    public List<GroupDTO> getMainGroup(String category) {
        return groupDAO.findMainGroup(category);
    }

    /* 관리자 페이지 탐험대 상세보기 */
    public GroupDTO getGroupDTO(Long groupId){ return groupDAO.findGroupDTO(groupId); };

    public int getCountAll(){ return groupDAO.findCountAll(); };
}
