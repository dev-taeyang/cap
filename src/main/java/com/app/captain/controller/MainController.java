package com.app.captain.controller;

import com.app.captain.domain.dto.GroupDTO;
import com.app.captain.domain.dto.ReviewFileDTO;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MainController {
    private final GroupService groupService;
    private final GroupReplyService groupReplyService;
    private final ReviewService reviewService;

    @GetMapping("/main")
    public String main(Model model,@RequestParam(value = "category",required = false)String category){
        List<GroupDTO> mainGroups = groupService.getMainGroup(category);
        mainGroups.forEach(mainGroup -> {mainGroup.setGroupReplyCount(groupReplyService.getReplyCount(mainGroup.getGroupId()));});

        model.addAttribute("mainGroups", mainGroups);
        model.addAttribute("mainReviews", reviewService.getTotalMain(category));

        return "/main/main";}

}
