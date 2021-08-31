package com.koreait.bknk.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CmtDAO extends CmtEntity{
    private int iboard;
    private String writer;
    private String mainProfile;
}
