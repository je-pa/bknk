package com.koreait.bknk.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardDTO extends BoardEntity{
    private String writer; //게시글 작성자 닉네임
    private String img_addr;
    private String mainProfile;
    private int isFav;
}
