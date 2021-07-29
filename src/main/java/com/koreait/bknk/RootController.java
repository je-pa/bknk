package com.koreait.bknk;

import com.koreait.bknk.common.MyConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RootController {
    @Autowired MyConst myConst;
    @Autowired RootService service;
    @GetMapping("/")
    public String home(){ return "root/home";}

    @GetMapping("/{nick}")
    public String userFeed(@PathVariable String nick, Model model){
        System.out.println(nick);
        model.addAttribute(myConst.NICK_USER, service.userFeed(nick));
        return "/root/userFeed";
    }

    @GetMapping("/{nick}/subscriptions")
    public String subscriptions(@PathVariable String nick){
        System.out.println(nick);
        return "/root/subscriptions";
    }
}
