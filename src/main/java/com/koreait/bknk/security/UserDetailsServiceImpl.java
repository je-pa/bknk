package com.koreait.bknk.security;

import com.koreait.bknk.user.UserMapper;
import com.koreait.bknk.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired private UserMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return new CustomUserPrincipal(loadUserByUsernameAndProvider(email, null,"local"));
    }

    public UserEntity loadUserByUsernameAndProvider(String email,String id, String provider) throws UsernameNotFoundException {
        UserEntity param = new UserEntity();
        param.setProvider(provider);
        param.setEmail(email);
        param.setServerID(id);
        System.out.println("U::"+param);
        return  mapper.selUser(param);
    }

    public int join(UserEntity param) {
        if(param == null) {
            return 0;
        }
        return mapper.join(param);
    }
}
