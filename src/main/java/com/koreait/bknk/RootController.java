package com.koreait.bknk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RootController {
    @GetMapping("/")
    public String home(){ return "root/home";}

    @GetMapping("/{nick}")
    public String userFeed(@PathVariable String nick){
        System.out.println(nick);
        return "/root/userFeed";
    }

    @GetMapping("/{nick}/subscriptions")
    public String subscriptions(@PathVariable String nick){
        System.out.println(nick);
        return "/root/subscriptions";
    }
}
