package com.app.captain.domain.vo;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class GroupReplyVO {
    private Long groupReplyId;
    private String groupReplyContent;
    private String groupReplyRegisterDate;
    private String groupReplyUpdateDate;
    private Long memberId;
    private Long groupId;
}
