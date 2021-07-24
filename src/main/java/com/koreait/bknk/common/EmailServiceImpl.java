package com.koreait.bknk.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class EmailServiceImpl implements EmailService{


    @Autowired private JavaMailSender emailSender;

    @Override
    public void sendMimeMessage(String to, String subject, String text) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setFrom("jieun0502@gmail.com");//보내는사람
            helper.setTo(to);//받는 사람 이메일 주소
            helper.setSubject(subject);//제목
            helper.setText(text, true);//내용 true : html 사용

            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    public String makeTxt(String nm, String nick, String email, String authCd){
        String txt = String.format("안녕하세요! %s[%s]님.\n\n '인증하기'버튼을 클릭하여 이메일 인증을 완료해주세요.\n" +
                        "<a href=\"http://localhost:8090/user/auth?email=%s&authCd=%s\">인증하기</a>"
                ,nm,nick, email,authCd);
        return txt;
    }
}
