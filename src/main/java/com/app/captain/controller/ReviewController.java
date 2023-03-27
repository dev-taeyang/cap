package com.app.captain.controller;

import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.vo.ReviewFileVO;
import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.service.ReviewFileService;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

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

    //    리뷰 상세보기
    @GetMapping("reviewdetail/{reviewId}")
    public String getReview(@PathVariable("reviewId") Long reviewId, Model model) {
        log.info(reviewService.getDTO(reviewId).toString());
        model.addAttribute("review", reviewService.getDTO(reviewId));
        model.addAttribute("files", reviewFileService.getList(reviewId));
        return "reviews/reviewDetail";
    }

    //    리뷰 리스트

    @GetMapping("reviewlist")
    public void getList(Model model) {
        List<ReviewVO> reviewList = reviewService.getList();
        model.addAttribute("reviews", reviewList);
    }

    //  리뷰작성 폼
    @GetMapping("write")
    public String getWrite(Model model) {
        model.addAttribute("review", new ReviewVO());
        model.addAttribute("files", new ReviewFileVO());
        return "reviews/reviewMake";
    }

    //    리뷰 작성
    @PostMapping("write")
    public RedirectView save(@ModelAttribute ReviewVO reviewVO, List<ReviewFileVO> files) {
        reviewVO.setGroupId(1L);
        log.info(reviewVO.toString());
        reviewService.write(reviewVO);
        reviewFileService.write(files);
        return new RedirectView("/reviews/reviewlist");
    }

  /*  //    파일 저장
    @PostMapping("save")
    @ResponseBody
    public void save(@RequestBody List<ReviewFileVO> files) {
        reviewFileService.write(files);
    }*/

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

    //    파일 다운로드
    @GetMapping("download")
    public ResponseEntity<Resource> download(String fileName) throws UnsupportedEncodingException {
        Resource resource = new FileSystemResource("C:/upload/" + fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment;filename=" + new String(fileName.substring(fileName.indexOf("_") + 1).getBytes("UTF-8"), "ISO-8859-1"));
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

}
