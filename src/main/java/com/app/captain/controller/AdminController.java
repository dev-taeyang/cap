package com.app.captain.controller;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.Search;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.domain.vo.NoticeVO;
import com.app.captain.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/admin/*")
@Slf4j
@RequiredArgsConstructor
public class AdminController {
    private final MemberService memberService;
    private final MypageService mypageService;
    private final GroupService groupService;
    private final NoticeService noticeService;
    private final ReviewService reviewService;
    private final GroupReplyService groupReplyService;
    private final ReviewFileService reviewFileService;

    /* 공지사항 */
    @GetMapping("/admin-notice")
    public void showNotices(Criteria criteria, Model model, Long noticeId){
        model.addAttribute("notices", noticeService.getList(criteria));
        model.addAttribute("noticeCount", noticeService.getNoticeCount());
    }

    @ResponseBody
    @GetMapping("/admin-detail")
    public NoticeVO showDetail(@RequestParam("noticeId") Long noticeId) {
        return noticeService.getNotice(noticeId);
    }

    @ResponseBody
    @PostMapping("/admin-update")
    public void update(@RequestParam("noticeId") Long noticeId, @RequestParam("noticeTitle") String noticeTitle, @RequestParam("noticeContent") String noticeContent) {
        NoticeVO noticeVO = new NoticeVO();

        noticeVO.setNoticeId(noticeId);
        noticeVO.setNoticeTitle(noticeTitle);
        noticeVO.setNoticeContent(noticeContent);

        noticeService.setNotice(noticeVO);
    }

    @ResponseBody
    @PostMapping("/admin-write")
    public void write(@RequestParam("noticeTitle") String noticeTitle, @RequestParam("noticeContent") String noticeContent) {
        NoticeVO noticeVO = new NoticeVO();

        noticeVO.setNoticeTitle(noticeTitle);
        noticeVO.setNoticeContent(noticeContent);

        noticeService.registerNotice(noticeVO);
    }

    @ResponseBody
    @DeleteMapping("/admin/admin-delete")
    public void removeNotice(@RequestParam("noticeId") Long noticeId) {
        noticeService.removeById(noticeId);
    }

    @ResponseBody
    @GetMapping("/admin/admin-list/{page}")
    public List<NoticeVO> showLists(@PathVariable("page") Integer page, Criteria criteria) {
        return noticeService.getList(criteria);
    }

    /* =================================================================================== */

    @GetMapping("/admin-member")
    public void showMembers(Criteria criteria, Model model, Long memberId){
        model.addAttribute("members", memberService.getMembers(criteria));
        model.addAttribute("memberCount", memberService.getMemberCount());
    }

    @ResponseBody
    @GetMapping("/member-detail")
    public void showMemberDetail(@RequestParam("memberId") Long memberId) {
        mypageService.getMemberById(memberId);
    }

    @ResponseBody
    @PostMapping("/member-update")
    public void updateMember(@RequestBody MemberVO memberVO) {
        memberService.modifyMemberAll(memberVO);
    }

    @ResponseBody
    @DeleteMapping("/admin/member-delete")
    public void removeMember(@RequestParam("memberId") Long memberId) {
        mypageService.remove(memberId);
    }

    @ResponseBody
    @GetMapping("/admin/member-list/{page}")
    public List<MemberVO> showMemberLists(@PathVariable("page") Integer page, Criteria criteria) {
        return memberService.getMembers(criteria);
    }

    /* =================================================================================== */

//    @GetMapping("/admin-review")
//    public void showReviews(Criteria criteria, Model model, Long reviewId){
//        model.addAttribute("reviews", reviewService.getList(criteria));
//        model.addAttribute("reviewCount", reviewService.getTotalCount());
//    }

    /* =================================================================================== */

//    @GetMapping("/admin-recruit")
//    public void showRecruits(Criteria criteria, Model model, Long recruitId){
//        model.addAttribute("recruits", groupService.getAllGroup(criteria));
//        model.addAttribute("recruitCount", groupService.getcountAllGroup());
//    }

    /* =================================================================================== */

    @GetMapping("/admin-reply")
    public void showReplies(Criteria criteria, Model model, Long replyId){
    }
}