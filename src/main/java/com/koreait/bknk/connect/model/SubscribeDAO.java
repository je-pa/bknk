package com.koreait.bknk.connect.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SubscribeDAO extends SubscribeEntity{
    private int startPage;
    private int limit;

}
