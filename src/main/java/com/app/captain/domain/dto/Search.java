package com.app.captain.domain.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
public class Search {
    private List<String> categorys;
    private String order;
    private String keyword;
}
