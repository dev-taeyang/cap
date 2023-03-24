package com.app.captain.domain.dao;

import com.app.captain.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MypageDAO {
    private final MypageMapper mypageMapper;

}
