package com.koreait.bknk.user.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDomain extends UserEntity{
    private int subscriber; //1:구독상태 0:구독하지않은상태
}
