package com.app.captain.service;

import com.app.captain.domain.dao.MypageDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MypageService {
    private final MypageDAO mypageDAO;
}
