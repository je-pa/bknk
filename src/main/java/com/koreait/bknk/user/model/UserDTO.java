package com.koreait.bknk.user.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
    private int feedIuser; //피드유저
    private int loginIuser; //로그인유저

    private int page;
    private int limit;

    public int getStartIdx(){
        return limit*(page - 1);
    }
}
