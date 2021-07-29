package com.koreait.bknk.user;

import com.koreait.bknk.user.model.UserDTO;
import com.koreait.bknk.user.model.UserDomain;
import com.koreait.bknk.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int join(UserEntity param);
    int auth(UserEntity param);
    UserEntity selUser(UserEntity param);
    UserEntity selLocalUser(UserEntity param);
    UserEntity chkNick(UserEntity param);
    int updUser(UserEntity param);

    UserDomain selFeedUser(UserDTO param);
}
