package com.app.captain.service;

import com.app.captain.domain.dao.GroupDAO;
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
    public void modify(Long groupId){
        groupDAO.update(groupId);
    };

    /* 그룹 삭제 */
    public void delete(Long groupId){
        groupDAO.delete(groupId);
    };

    /* 그룹 전체 조회 */
    public List<GroupVO> getList(){
        return groupDAO.findAll();
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
}
