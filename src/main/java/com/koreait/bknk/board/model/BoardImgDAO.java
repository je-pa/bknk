package com.koreait.bknk.board.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@ToString
public class BoardImgDAO extends BoardImgEntity{
    private MultipartFile[] files;
}
