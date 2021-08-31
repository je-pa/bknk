package com.koreait.bknk.connect;

import com.koreait.bknk.connect.model.SubscribeDAO;
import com.koreait.bknk.connect.model.SubscribeDTO;
import com.koreait.bknk.connect.model.SubscribeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/connect")
public class ConnectController {

    @Autowired
    ConnectService connectService;

    @RequestMapping("/notice")
    public String notice(){
        SubscribeDAO param =new SubscribeDAO();
        connectService.updLastLogin2(param);
        return "user/notice";
    }

    @RequestMapping("/getNotice")
    @ResponseBody
    public List<SubscribeDTO> getNotice(@RequestParam(value="page", defaultValue ="0") int page,
                                        @RequestParam(value="limit", defaultValue ="0") int limit){
        SubscribeDAO param=new SubscribeDAO();
        param.setLimit(limit);
        param.setStartPage((page-1)*limit);
        return connectService.selSubscribeList(param);
    }

    @ResponseBody
    @PutMapping("/updLastLogin")
    public int updLastLogin(){
        SubscribeDAO subscribeDAO = new SubscribeDAO();
        return connectService.updLastLogin(subscribeDAO);
    }
}
