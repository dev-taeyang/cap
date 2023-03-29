package com.app.captain.controller;

import com.app.captain.domain.vo.MemberVO;
import com.app.captain.service.GroupReplyService;
import com.app.captain.service.MemberService;
import com.app.captain.service.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.logging.Logger;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/mypage/*")
public class MypageController {
    private final MypageService mypageService;
    private final GroupReplyService groupReplyService;

//    테스트로 컨트롤러 태워보기
//    내 정보들 가져오기

/*    @GetMapping("me/{memberId}")
    public String getMember(Model model, @PathVariable("memberId") Long memberId) {
        Long replyCount = mypageService.getReplyCount(memberId);
        MypageDTO mypageDTO = mypageService.getMember(memberId);
        model.addAttribute("mypageDTO", mypageDTO);
        model.addAttribute("replyCount", replyCount);

        return "/mypage/mypage";
    }*/

//    @GetMapping("mypage")
//    public void getMember(Model model, HttpSession session) {
//        Long replyCount = mypageService.getReplyCount((Long)session.getAttribute("memberId"));
//        model.addAttribute("mypageDTO", mypageService.getMember((Long)session.getAttribute("memberId")));
//        model.addAttribute("replyCount", replyCount);
////        log.info(sessionId);
//        log.info("들어옴");
//    }

    @GetMapping("me")
    public String getMember(Model model, HttpSession session) {
        MemberVO memberVO = (MemberVO) session.getAttribute("member");
        /* 세션에 값이 담겨 있다면 마이페이지로 이동*/
        if(memberVO != null) {
            model.addAttribute("members", mypageService.getMemberById(memberVO.getMemberId()));
            model.addAttribute("replyCount", groupReplyService.getReplyCount(memberVO.getMemberId()));

            return "mypage/mypage";
        }

        /* 없다면 로그인 페이지 */
        return "member/login";
    }

//      내 정보들 가져오기
//      post맨으로 잘 가져와짐
/*    @GetMapping("mypage/{memberId}")
    public MypageDTO getMemberPost(@PathVariable("memberId") Long memberId) {
        log.info(mypageService.getMember(memberId).toString());
        return mypageService.getMember(memberId);
    }*/


//    수정 폼으로 가기
    @GetMapping("Update")
    public String moveToUpdate(HttpSession session, Model model){
        MemberVO memberVO = (MemberVO) session.getAttribute("member");
        model.addAttribute("members", mypageService.getMemberById(memberVO.getMemberId()));
        return "/mypage/mypageUpdate";
    }

    //    내 정보 수정하기
    @PostMapping("Update")
    @ResponseBody
    public void modify(@RequestBody MemberVO memberVO) {
        mypageService.modify(memberVO);
    }

    //    파일 업로드
    @PostMapping("upload")
    @ResponseBody
    public String upload(@RequestParam("memberFile") MultipartFile multipartFile) throws IOException {
        String uuids = UUID.randomUUID().toString();
        String path = "C:/upload/" + getPath();
        File file = new File(path);
        log.info(path + "/" + "t_" + uuids + "_" + multipartFile.getOriginalFilename());
        if(!file.exists()) {file.mkdirs();}
        multipartFile.transferTo(new File(path, uuids + "_" + multipartFile.getOriginalFilename()));

        if(multipartFile.getContentType().startsWith("image")){
            FileOutputStream out = new FileOutputStream(new File(path, "t_" + uuids + "_" + multipartFile.getOriginalFilename()));
                Thumbnailator.createThumbnail(multipartFile.getInputStream(), out, 100, 100);
            out.close();
        }
        return uuids;
    }

    //    파일 불러오기
    @GetMapping("display")
    @ResponseBody
    public byte[] display(String fileName) throws IOException {
        log.info(fileName.toString());
        return FileCopyUtils.copyToByteArray(new File("C:/upload", fileName));
    }

    //    현재 날짜 경로 구하기
    private String getPath(){
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    /* 회원탈퇴 폼으로 이동 */
    @GetMapping("remove")
    public String getRemove() {
        return "mypage/mypageUserLeave";
    }

    /* 회원탈퇴 */
    @PostMapping("remove")
    public String memberRemove(HttpSession session) {
        MemberVO memberVO = (MemberVO) session.getAttribute("member");
        mypageService.remove(memberVO.getMemberId());
        session.invalidate();

        return "redirect:/main";
    }

//    @GetMapping("remove")
//    public String remove(HttpSession session) {
//        MemberVO memberVO = (MemberVO) session.getAttribute("member");
//        /* 세션에 담긴 값 없애기 */
//        session.invalidate();
//        mypageService.remove(memberVO.getMemberId());
//
//        return "redirect:/main";
//    }

//    내가 작성한 보고서
    @GetMapping("myReview")
    public String myReview() {

        return "mypage/mypageReview";
    }

//    내가 작성한 댓글
    @GetMapping("myReply")
    public String myReply() {

        return "mypage/mypageReply";
    }


//    내가 개설한 탐험대 정보
    @GetMapping("myRecruit")
    public String myRecruit() {

        return "mypage/mypageMyRecruitList";
    }


//    내가 참가한 탐험대 정보
    @GetMapping("partInRecruit")
    public String myPartInRecruit() {

        return "mypage/mypageParticipateRecruitList";
    }
}
