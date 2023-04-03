package com.app.captain.controller;

import com.app.captain.domain.dao.GroupDAO;
import com.app.captain.domain.vo.GroupVO;
import com.app.captain.service.GroupService;
import java.io.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/groups/*")
public class GroupController {
    private final GroupService groupService;

    /* 그룹 개설 폼 */
    @GetMapping("write")
    public String write(Model model){
        GroupVO groupVO = new GroupVO();
        model.addAttribute("group",groupVO);
        return "recruitPage/recruitMake";
    }

    /* 그룹 작성 완료 */
    @PostMapping("write")
    public RedirectView write(GroupVO groupVO, HttpSession session, RedirectAttributes redirectAttributes){
        Long memberId = (Long)session.getAttribute("memberId");
        groupVO.setGroupCaptain(memberId);
        groupService.write(groupVO);
        log.info(groupVO.toString());
        redirectAttributes.addFlashAttribute("작성완료");
        return new RedirectView("/groups/list");
    }

    @PostMapping("upload")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        /* c -> upload 폴더안에 저장해놓은 path를 담음*/
        String path = "C:/upload/" + groupService.getPath();
        File file = new File(path);
        if (!file.exists()) {
            /*make Directory 메소드를 사용하여 경로대로 폴더를 생성함*/
            file.mkdirs();
        }
        /* 랜덤한 숫자의 Uuid를 만듦 */
        String uuid = UUID.randomUUID().toString();
        /* 파일에 경로 + uuid + _파일의 실제 이름을 붙여줌 */
        multipartFile.transferTo(new File(path, uuid + "_" + multipartFile.getOriginalFilename()));
        /* 파일의 타입이 image라면 썸네일을 파일을 생성해줌 */
        if (multipartFile.getContentType().startsWith("image")) {
            FileOutputStream out = new FileOutputStream(new File(path, "t_" + uuid + "_" + multipartFile.getOriginalFilename()));
            Thumbnailator.createThumbnail(multipartFile.getInputStream(), out, 100, 100);
            out.close();
        }
        return uuid;
    }
}
