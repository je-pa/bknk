package com.koreait.bknk.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CmtEntity {
    private int icmt;
    private int iuser;
    private int iboard;
    private String cmt;
    private String regdt;
}
