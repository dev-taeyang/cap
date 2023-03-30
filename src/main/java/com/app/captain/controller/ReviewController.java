package com.app.captain.controller;

import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.dto.ReviewFileDTO;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.domain.vo.ReviewFileVO;
import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.service.MemberService;
import com.app.captain.service.MypageService;
import com.app.captain.service.ReviewFileService;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/reviews/*")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewFileService reviewFileService;
    private final MypageService mypageService;


    //  리뷰작성 폼
    @GetMapping("write")
    public String getWrite(Model model) {
        ReviewVO reviewVO = new ReviewVO();
        List<ReviewFileVO> files = new ArrayList<>();
        model.addAttribute("review", reviewVO);
        model.addAttribute("files", files);
        return "reviews/reviewMake";
    }

    //    리뷰 작성
    @PostMapping("write")
    public RedirectView save(ReviewFileDTO reviewFileDTO, RedirectAttributes redirectAttributes) {
        ReviewVO reviewVO = reviewFileDTO.toVO();
        reviewVO.setGroupId(1L);
        reviewService.write(reviewVO);
        List<ReviewFileVO> files = reviewFileDTO.getFiles();
        files.forEach(file -> file.setReviewId(reviewVO.getReviewId()));
        log.info(files.toString());
        log.info(reviewVO.toString());
        reviewFileService.write(files);
        redirectAttributes.addFlashAttribute("작성완료");
        return new RedirectView("/reviews/list");
    }

//    리뷰 수정 페이지
    @GetMapping("{reviewId}/modify")
    public String getModify(@PathVariable("reviewId")Long reviewId, Model model){
        ReviewVO reviewVO = reviewService.getReview(reviewId);
        List<ReviewFileVO> files = new ArrayList<>();
        String category = reviewVO.getReviewCategory();
        Double grade = reviewVO.getReviewGrade();
        model.addAttribute("review", reviewVO);
        model.addAttribute("category", category);
        model.addAttribute("grade", grade);
        model.addAttribute("files", files);
        return "reviews/reviewModify";
    }

//    리뷰 수정 완료 페이지
    @PostMapping("{reviewId}/modify")
    public RedirectView modify(ReviewFileDTO reviewFileDTO, @PathVariable("reviewId") Long reviewId, RedirectAttributes redirectAttributes){
        ReviewVO reviewVO = reviewFileDTO.toVO();
        reviewVO.setGroupId(1L);
        reviewVO.setReviewId(reviewId);
        reviewService.modify(reviewVO);
        reviewFileService.remove(reviewId);
        List<ReviewFileVO> files = reviewFileDTO.getFiles();
        files.forEach(file -> file.setReviewId(reviewVO.getReviewId()));
        reviewFileService.write(files);
        redirectAttributes.addFlashAttribute("review", "수정완료");
        return new RedirectView("/reviews/list");
    }

    //    리뷰 상세보기
    @GetMapping("detail/{reviewId}")
    public String getReview(@PathVariable("reviewId") Long reviewId, Model model) {
        Long memberId = reviewService.getDTO(reviewId).getGroupCaptain();
        String groupName = reviewService.getDTO(reviewId).getGroupName();
        MemberVO memberVO = mypageService.getMemberById(memberId);
        ReviewFileDTO reviewFileDTO = reviewService.getReview(reviewId).toDTO();
        reviewFileDTO.setFiles(reviewFileService.getList(reviewId));
        model.addAttribute("groupName", groupName);
        model.addAttribute("memberVO",memberVO);
        model.addAttribute("review", reviewFileDTO);
        model.addAttribute("reviewId", reviewId);
        return "reviews/reviewDetail";
    }

    //    리뷰 리스트

    @GetMapping("list")
    public String getList(Model model) {
        List<ReviewFileDTO> reviewFileDTOS = new ArrayList<>();
        List<ReviewVO> reviewVOS = reviewService.getList();
        reviewVOS.forEach(reviewVO -> {
            reviewFileDTOS.add(reviewVO.toDTO());
            Long reviewId = reviewVO.getReviewId();
        });
        reviewFileDTOS.forEach(reviewFileDTO -> {
            log.info(reviewFileService.getList(reviewFileDTO.getReviewId()).toString());
            reviewFileDTO.setFiles(reviewFileService.getList(reviewFileDTO.getReviewId()));
        });
        model.addAttribute("reviews", reviewFileDTOS);
        return "reviews/reviewList";
    }

//    리뷰 삭제
    @GetMapping("{reviewId}/remove")
    public RedirectView remove(@PathVariable("reviewId")Long reviewId, RedirectAttributes redirectAttributes){
        reviewService.remove(reviewId);
        redirectAttributes.addFlashAttribute("reviewId","삭제완료");
        return new RedirectView("/reviews/list");
    }

    //    파일 업로드
    @PostMapping("upload")
    @ResponseBody
    public List<String> upload(@RequestParam("file") List<MultipartFile> multipartFiles) throws IOException {
        List<String> uuids = new ArrayList<>();
        String path = "C:/upload/" + reviewFileService.getPath();
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
        for (int i = 0; i < multipartFiles.size(); i++) {
            uuids.add(UUID.randomUUID().toString());
            multipartFiles.get(i).transferTo(new File(path, uuids.get(i) + "_" + multipartFiles.get(i).getOriginalFilename()));

            if (multipartFiles.get(i).getContentType().startsWith("image")) {
                FileOutputStream out = new FileOutputStream(new File(path, "t_" + uuids.get(i) + "_" + multipartFiles.get(i).getOriginalFilename()));
                Thumbnailator.createThumbnail(multipartFiles.get(i).getInputStream(), out, 100, 100);
                out.close();
            }
        }
        return uuids;
    }

//    파일 불러오기
    @GetMapping("display")
    @ResponseBody
    public byte[] display(String fileName) throws IOException{
        return FileCopyUtils.copyToByteArray(new File("C:/upload",fileName));
    }

}
