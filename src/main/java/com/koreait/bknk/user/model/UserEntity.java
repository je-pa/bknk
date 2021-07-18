package com.koreait.bknk.user.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder //빌드패턴 객체화할때 필요한 것들만 해서 만들수있다
@NoArgsConstructor //기본생성자
@AllArgsConstructor
public class UserEntity {
    private int iuser;
    private String provider;
    private String servverID;
    private String email;
    private String pw;
    private String nm;
    private String nick;

    private String gender;
    private String mainProfile;
    private int bYear;
    private int bMonth;
    private int bDate;
    private String tel;

    private String authCd;

    private String regdt;

    private int cntFollowing;
    private int cntFollowed;
    private int cntBoard;
}
