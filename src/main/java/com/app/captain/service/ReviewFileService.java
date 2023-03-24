package com.app.captain.service;

import com.app.captain.mapper.ReviewFileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewFileService {

    private final ReviewFileMapper reviewFileMapper;
}
