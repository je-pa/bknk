package com.koreait.bknk.user;

import com.koreait.bknk.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int join(UserEntity param);
    int auth(UserEntity param);
    UserEntity selUser(UserEntity param);
    int updMainProfile(UserEntity param);
}
