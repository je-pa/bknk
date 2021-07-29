package com.koreait.bknk;

import com.koreait.bknk.common.MyConst;
import com.koreait.bknk.security.IAuthenticationFacade;
import com.koreait.bknk.user.UserMapper;
import com.koreait.bknk.user.model.UserDTO;
import com.koreait.bknk.user.model.UserDomain;
import com.koreait.bknk.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RootService {
    @Autowired UserMapper userMapper;
    @Autowired IAuthenticationFacade auth;
    @Autowired MyConst myConst;

    public UserDomain userFeed(String nick) {
        UserEntity feedUser = new UserEntity();
        feedUser.setNick(nick);
        feedUser = userMapper.chkNick(feedUser);
        UserDTO param = new UserDTO();


        param.setFeedIuser(feedUser.getIuser());
        System.out.println("feed"+feedUser);
        param.setLoginIuser(auth.getLoginUserPk());
        return userMapper.selFeedUser(param);
    }
}
