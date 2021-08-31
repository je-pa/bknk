package com.koreait.bknk.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardFavEntity {
    private int iboard;
    private int iuser;
    private String regdt;
    private int selCntFav;
}
