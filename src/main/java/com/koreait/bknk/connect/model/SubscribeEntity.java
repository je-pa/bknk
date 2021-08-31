package com.koreait.bknk.connect.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SubscribeEntity {
    private int feedIuser;
    private int subscriberIuser;
    private String regdt;
}
