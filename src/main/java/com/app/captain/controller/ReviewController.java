package com.app.captain.controller;

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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
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
    private final MemberService memberService;


    //  리뷰작성 폼
    @GetMapping("write")
    public String getWrite(Model model) {
        /* 리뷰 작성을위한 form을 전달해줌*/
        ReviewVO reviewVO = new ReviewVO();
        List<ReviewFileVO> files = new ArrayList<>();
        model.addAttribute("review", reviewVO);
        model.addAttribute("files", files);
        return "reviews/reviewMake";
    }

    //    리뷰 작성
    @PostMapping("write")
    public RedirectView save(ReviewFileDTO reviewFileDTO, HttpSession session ,RedirectAttributes redirectAttributes) {
        /* session에 딤긴 memberId 받아옴*/
        Long memberId = (Long)session.getAttribute("memberId");
        ReviewVO reviewVO = reviewFileDTO.toVO();
        /* 작성할때 로그인한 사람이 작성하게끔 memberId를 set해줌*/
        reviewVO.setMemberId(memberId);
        /* 리뷰작성*/
        reviewService.write(reviewVO);
        List<ReviewFileVO> files = reviewFileDTO.getFiles();
        /* 저장된 파일들의 reviewId가 null이기때문에  파일들에 각각 review를 넣어준다*/
        files.forEach(file -> file.setReviewId(reviewVO.getReviewId()));
        /* 파일 저장*/
        reviewFileService.write(files);
        redirectAttributes.addFlashAttribute("작성완료");
        return new RedirectView("/reviews/list");
    }

//    리뷰 수정 페이지
    @GetMapping("{reviewId}/modify")
    public String getModify(@PathVariable("reviewId")Long reviewId, Model model){
        /* 기존 작성했던 정보를 가져와서 수정페이지에 보내줌 -> 기존값을 뿌려놓기 위해 */
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
        reviewVO.setReviewId(reviewId);
        /* 리뷰 수정*/
        reviewService.modify(reviewVO);
        /* 기존 파일들을 지우고*/
        reviewFileService.remove(reviewId);
        List<ReviewFileVO> files = reviewFileDTO.getFiles();
        files.forEach(file -> file.setReviewId(reviewVO.getReviewId()));
        /* 새롭게 덮어씌운다.*/
        reviewFileService.write(files);
        redirectAttributes.addFlashAttribute("review", "수정완료");
        return new RedirectView("/reviews/list");
    }

    //    리뷰 상세보기
    @GetMapping("detail/{reviewId}")
    public String getReview(@PathVariable("reviewId") Long reviewId, Model model, HttpSession session) {
        /* 세션에 담겨있는 memberId를 가져와서 변수에 담아줌 */
        Long sessionId = (Long)session.getAttribute("memberId");
        /* reviewId로 조회해온 review 정보를 reviewFIleDTO로 DTO타입으로 바꿔줌 */
        ReviewFileDTO reviewFileDTO = reviewService.getReview(reviewId).toDTO();
        /* detail페이지에 담길 memberId와 session의 memberId와 비교하기 위해 추가로 addAttribute해줌 */
        Long memberId = reviewFileDTO.getMemberId();
        /* 파일도 뿌려주기 위해 */
        reviewFileDTO.setFiles(reviewFileService.getList(reviewId));
        /* 작성자의 정보를 뿌리기위해 memberVO정보를 가져옴 */
        MemberVO memberVO = mypageService.getMemberById(memberId);
        model.addAttribute("memberVO",memberVO);
        model.addAttribute("review", reviewFileDTO);
        model.addAttribute("reviewId", reviewId);
        model.addAttribute("sessionId",sessionId);
        return "reviews/reviewDetail";
    }

    //    리뷰 리스트
    @GetMapping("list")
    public String getList(Model model, HttpSession session) {
        /*세션아이디 가져와서 보내주기*/
        Long memberId = (Long)session.getAttribute("memberId");
        /*Review와reviewFile 조인한 DTO 타입의 ArrayList를 선언*/
        List<ReviewFileDTO> reviewFileDTOS = new ArrayList<>();
        /* 유저 정보들을 담기위해 MemberVO타입의 ArrayList 선언*/
        List<MemberVO> memberVOS = new ArrayList<>();
        /*리뷰 전체 리스트들을 담음*/
        List<ReviewVO> reviewVOS = reviewService.getList();
        /*forEach를 사용하여 ArrayList에 있는 reviewVO를 toDTO메소드를 사용하여 DTO로 변환 해준다음 DTO에 담아줌*/
        reviewVOS.forEach(reviewVO -> {
            Long member = reviewVO.getMemberId();
            reviewFileDTOS.add(reviewVO.toDTO());
            memberVOS.add(mypageService.getMemberById(member));
        });
        /*reviewFileDTO 들에 각각 reviewId로 조회해온 file들을 담아줌 */
        reviewFileDTOS.forEach(reviewFileDTO -> {
            log.info(reviewFileService.getList(reviewFileDTO.getReviewId()).toString());
            Long reviewId = reviewFileDTO.getReviewId();
            reviewFileDTO.setFiles(reviewFileService.getList(reviewId));
        });
        /*model 객체를 통해 reviewFileDTOS를 reviews라는 키 name으로 view에 전달해줌*/
        model.addAttribute("reviews", reviewFileDTOS);
        model.addAttribute("memberId",memberId);
        return "reviews/reviewList";
    }

//    리뷰 삭제
    @GetMapping("{reviewId}/remove")
    public RedirectView remove(@PathVariable("reviewId")Long reviewId, RedirectAttributes redirectAttributes){
        /* reviewId로 delete Cascade*/
        reviewService.remove(reviewId);
        redirectAttributes.addFlashAttribute("reviewId","삭제완료");
        return new RedirectView("/reviews/list");
    }

    //    파일 업로드
    @PostMapping("upload")
    @ResponseBody
    public List<String> upload(@RequestParam("file") List<MultipartFile> multipartFiles) throws IOException {
        /* String 타입의 ArrayList를 만듬*/
        List<String> uuids = new ArrayList<>();
        /* c -> upload 폴더안에 저장해놓은 path를 담음*/
        String path = "C:/upload/" + reviewFileService.getPath();
        File file = new File(path);
        if (!file.exists()) {
            /*make Directory 메소드를 사용하여 경로대로 폴더를 생성함*/
            file.mkdirs();
        }
        /*랜덤한 숫자의 Uuid를 만들어서 uuids list에 담아줌*/
        for (int i = 0; i < multipartFiles.size(); i++) {
            uuids.add(UUID.randomUUID().toString());
            /* 각각 파일들에 경로 + uuid + _파일의 실제 이름을 붙여줌*/
            multipartFiles.get(i).transferTo(new File(path, uuids.get(i) + "_" + multipartFiles.get(i).getOriginalFilename()));
            /*파일의 타입이 image라면 썸네일을 파일을 생성해줌*/
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
        /* 실제 파일 경로에있는 파일을 byte 배열로 불러와줌*/
        return FileCopyUtils.copyToByteArray(new File("C:/upload",fileName));
    }

}
