package com.app.captain.mapper;

import com.app.captain.domain.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class MemberMapperTests {
    @Autowired
    MemberMapper memberMapper;

    @Test
    public void loginTest(){
        MemberVO memberVO = new MemberVO();

//        memberVO.setMemberIdentification("test");
//        memberVO.setMemberPassword("test123!!!");

        memberVO.setMemberIdentification("jjw123");
        memberVO.setMemberPassword("asd12341234!");

        memberMapper.select(memberVO);
        log.info(memberMapper.select(memberVO).toString());
    }

    @Test
    public void joinTest(){
        MemberVO memberVO = new MemberVO();
        memberVO.setMemberIdentification("test");
        memberVO.setMemberPassword("test123132!");
        memberVO.setMemberName("테스트");
        memberVO.setMemberPhone("01012347896");
        memberVO.setMemberEmail("test123@test.com");
        memberVO.setMemberNickname("테스트");
        memberVO.setMemberBirth("2000.01.01");
        memberVO.setMemberGender("m");

        memberMapper.insert(memberVO);
    }

}
