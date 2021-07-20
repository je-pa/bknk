package com.koreait.bknk.common;

public interface EmailService {
    void sendMimeMessage(String to, String subject, String text);
}
