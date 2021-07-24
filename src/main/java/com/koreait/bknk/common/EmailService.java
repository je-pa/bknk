package com.koreait.bknk.common;

public interface EmailService {
    void sendMimeMessage(String to, String subject, String text);
    String makeTxt(String nm, String nick, String email, String authCd);
}
