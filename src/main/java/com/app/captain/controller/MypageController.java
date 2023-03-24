package com.app.captain.controller;

import com.app.captain.service.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor

public class MypageController {
    private final MypageService mypageService;
}
