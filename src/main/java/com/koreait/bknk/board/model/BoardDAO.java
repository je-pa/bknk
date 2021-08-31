package com.koreait.bknk.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardDAO extends BoardEntity{
    private int userIuser; //로그인 사용자의 iuser값
    private int cntFav; //로그인 사용자의 좋아요 여부
    private int startPage; //시작페이지 지정
    private int limit;
}
