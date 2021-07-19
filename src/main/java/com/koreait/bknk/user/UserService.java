package com.koreait.bknk.user;

import com.koreait.bknk.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired private UserMapper mapper;
    public void join(UserEntity userEntity) {

    }
}
