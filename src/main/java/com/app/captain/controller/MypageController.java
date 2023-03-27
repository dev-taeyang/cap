package com.app.captain.controller;

import com.app.captain.domain.dto.MypageDTO;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.service.MemberService;
import com.app.captain.service.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.logging.Logger;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/mypage/*")
public class MypageController {
    private final MypageService mypageService;

//    테스트로 컨트롤러 태워보기
//    내 정보들 가져오기
//    @GetMapping("mypage")
//    public void GoControllerMember(){}


    @GetMapping("mypage")
    public String getMember(Model model) {
        MypageDTO mypageDTO = mypageService.getMember(1L);
        model.addAttribute("mypageDTO", mypageDTO);

        return "/mypage/mypage";
    }

//      내 정보들 가져오기
//      post맨으로 잘 가져와짐
/*    @GetMapping("mypage/{memberId}")
    public MypageDTO getMemberPost(@PathVariable("memberId") Long memberId) {
        log.info(mypageService.getMember(memberId).toString());
        return mypageService.getMember(memberId);
    }*/

    //    내 정보 수정하기
    @PatchMapping("modify/{memberId}")
    public void modify(@PathVariable("memberId") Long memberId) {
        MemberVO memberVO = new MemberVO();
        memberVO.setMemberId(memberId);
        memberVO.setMemberIdentification("jjw123");
        memberVO.setMemberPassword("asd1234");
        memberVO.setMemberEmail("jjw123@gmail.com");
        memberVO.setMemberName("정지욱");
        memberVO.setMemberNickname("지욱22");
        memberVO.setMemberPhone("01012341234");
        memberVO.setMemberBirth("20000202");
        memberVO.setMemberGender("여");
        mypageService.modify(memberVO);
        log.info(mypageService.getMember(memberId).toString());
         }

    //    회원탈퇴하기
    @PostMapping("remove/{memberId}")
    public void remove(@PathVariable("memberId") Long memberId) {
        log.info(mypageService.getMember(memberId).toString());
        mypageService.remove(memberId); }
}
