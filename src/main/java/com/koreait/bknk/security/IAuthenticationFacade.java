package com.koreait.bknk.security;

import com.koreait.bknk.user.model.UserEntity;

public interface IAuthenticationFacade {
    UserEntity getLoginUser();
    int getLoginUserPk();
}
