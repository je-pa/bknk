package com.koreait.bknk.user;

import com.koreait.bknk.common.MyConst;
import com.koreait.bknk.security.CustomUserPrincipal;
import com.koreait.bknk.user.model.UserEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired private UserService service;
    @Autowired private MyConst myConst;

    @GetMapping("/login")
    public void login(UserEntity userEntity){}

    @GetMapping("/join")
    public void join(UserEntity userEntity){}

    @PostMapping("/join")
    public String joinProc(UserEntity param){
        int result = service.join(param);
        if(result == 2){
            return "redirect:join?result=2&email="+param.getEmail()+"&nm="+param.getNm()+"&nick="+param.getNick();
        }
        return "redirect:login?result="+result;
    }
    @GetMapping("/auth")
    public String auth(UserEntity param) {
        int result = service.auth(param);
        return "redirect:login?auth=" + result;
    }

    @GetMapping("/edit")
    public void edit(UserEntity param, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        BeanUtils.copyProperties(userDetails.getUser(),param);
        param.setPw(null);
        System.out.println(param);
    }

    @PostMapping("/edit")
    public String edit(UserEntity param){
        int result = service.edit(param);
        return "redirect:edit?result="+result;//1 : 프로필이 저장되었습니다.
    }

    @ResponseBody
    @PostMapping("/updMainProfile")
    public Map<String,Object> updMainProfile(MultipartFile[] profileImg){
        Map<String,Object> res = service.updMainProfile(profileImg[0]);
        return res;
    }
    @ResponseBody
    @GetMapping("/delMainProfile")
    public Map<String, Integer> delMainProfile(){
        Map<String, Integer> res = new HashMap<>();
        res.put(myConst.RESULT,service.delMainProfile());
        return res;
    }

    @ResponseBody
    @GetMapping("/chkUser")
    public Map<String, Integer> chkUser(UserEntity param){
        Map<String, Integer> res = new HashMap<>();
        res.put(myConst.RESULT,service.chkUser(param));
//        System.out.println(param.getNick());
        return res;
    }
}