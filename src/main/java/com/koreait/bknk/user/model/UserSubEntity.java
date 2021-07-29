package com.koreait.bknk.user.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserSubEntity {
    private int feedIuser; //피드유저(구독 받은사람)
    private int subscriberIuser; //구독자(구독 한사람)
    private String regdt;
}
