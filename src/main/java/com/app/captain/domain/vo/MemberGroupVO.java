package com.app.captain.domain.vo;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class MemberGroupVO {
    private Long memberGroupId;
    private Long memberId;
    private Long groupId;
}
