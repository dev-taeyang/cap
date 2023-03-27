package com.app.captain.domain.vo;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class MailTO {
    private String address;
    private String title;
    private String message;
}
