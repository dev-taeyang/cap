package com.app.captain.controller;

import com.app.captain.domain.vo.GroupReplyVO;
import com.app.captain.service.GroupReplyService;
import com.app.captain.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@RequestMapping("/replies/*")
public class GroupReplyController {
    private final GroupReplyService groupReplyService;
    private final MypageService mypageService;

    /* 댓글 전체 조회 */
    @GetMapping("list/{groupId}")
    public String GroupReplyList(@PathVariable("groupId") Long groupId, Model model, HttpSession session) {
        Long sessionId = (Long) session.getAttribute("memberId");

        model.addAttribute("groupId", groupId);
        model.addAttribute("member", mypageService.getMemberById(sessionId));
        model.addAttribute("replies", groupReplyService.getGroupReply(groupId));
        return "/replyPage/reply";
    }

    /* 댓글 입력하기 */
    @PostMapping("insert")
    @ResponseBody
    public void insertReply(@RequestBody GroupReplyVO groupReplyVO) {
        groupReplyService.setReply(groupReplyVO);
    }

    /* 댓글 삭제하기 */
    @PostMapping("delete")
    @ResponseBody
    public void deleteReply(Long groupReplyId) {
        groupReplyService.removeReply(groupReplyId);
    }

    /* 댓글 수정하기 */
    @PostMapping("update")
    @ResponseBody
    public void updateReply(@RequestBody GroupReplyVO groupReplyVO) {
        groupReplyService.modifyReply(groupReplyVO);
    }

}
