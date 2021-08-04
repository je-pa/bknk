package com.koreait.bknk.user;

import com.koreait.bknk.user.model.UserDTO;
import com.koreait.bknk.user.model.UserDomain;
import com.koreait.bknk.user.model.UserEntity;
import com.koreait.bknk.user.model.UserSubEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int join(UserEntity param);
    UserEntity selUser(UserEntity param);
    UserDomain selFeedUser(UserDTO param);
    UserEntity selLocalUser(UserEntity param);
    UserEntity chkNick(UserEntity param);
    int auth(UserEntity param);
    int updUser(UserEntity param);

    int insSubscription(UserSubEntity param);
    UserDomain[] selSubscriptionList(UserDTO param);
    int delSubscription(UserSubEntity param);
}
