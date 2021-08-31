package com.koreait.bknk.connect.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SubscribeDTO extends SubscribeEntity{
    private int feedIuser;
    private int iboard;
    private String nick;
    private String mainProfile;
}
