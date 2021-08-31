package com.koreait.bknk.connect;

import com.koreait.bknk.connect.model.SubscribeDAO;
import com.koreait.bknk.connect.model.SubscribeDTO;
import com.koreait.bknk.connect.model.SubscribeEntity;
import com.koreait.bknk.security.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ConnectService {

    @Autowired
    ConnectMapper connectMapper;
    @Autowired
    IAuthenticationFacade auth;

    public List<SubscribeDTO> selSubscribeList(SubscribeDAO param){
        param.setSubscriberIuser(auth.getLoginUserPk());
        return connectMapper.selSubscribeList(param);
    }

    public int updLastLogin(SubscribeDAO param){
        param.setSubscriberIuser(auth.getLoginUserPk());
        return connectMapper.updLastLogin(param);
    }

    public int updLastLogin2(SubscribeDAO param){
        param.setSubscriberIuser(auth.getLoginUserPk());
        return connectMapper.updLastLogin2(param);
    }
}
