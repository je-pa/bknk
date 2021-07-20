package com.koreait.bknk.common;

import org.springframework.stereotype.Component;

@Component
public class MySecurityUtils {
    public int getRandomNumber(int sNumber, int eNumber){
        return (int)(Math.random()*(eNumber-sNumber+1))+sNumber;
    }

    public int getRandomNumber(int eNumber){
        return getRandomNumber(0,eNumber);
    }

    public String getRandomDigit(int len){
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i<len ; i++){
            sb.append(getRandomNumber(9));
        }
        return sb.toString();
    }
}
