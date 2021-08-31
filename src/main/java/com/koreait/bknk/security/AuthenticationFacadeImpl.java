package com.koreait.bknk.security;

import com.koreait.bknk.user.model.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements IAuthenticationFacade{
    @Override
    public UserEntity getLoginUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Object result = auth.getPrincipal();
        if(result instanceof String) {
            return null;
        }
        CustomUserPrincipal userDetails = (CustomUserPrincipal)result; //인증받기 위한 정보 //Principal(ID) Credential(pw)
        return userDetails.getUser();
    }

    @Override
    public int getLoginUserPk() {
        UserEntity loginUser = getLoginUser();
        if(loginUser == null) {
            return 0;
        }
        return loginUser.getIuser();
    }
}
