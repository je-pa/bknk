package com.koreait.bknk.search.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchDAO {
    private int searchType;
    private int startPage;
    private String searchWord;
    private int limit;
    private int region;
    private int iuser;
}
