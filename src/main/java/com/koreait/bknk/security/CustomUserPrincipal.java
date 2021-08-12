package com.koreait.bknk.security;

import com.koreait.bknk.user.model.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class CustomUserPrincipal implements UserDetails , OAuth2User {
    @Getter
    private UserEntity user;
    private Map<String, Object> attributes;

    public CustomUserPrincipal(UserEntity user) { //로컬로 로그인할때
        this.user = user;
    }
    public CustomUserPrincipal(UserEntity user, Map<String, Object> attributes){ //oauth2로 로그인 할 때
        this.user=user;
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {return null; }

    @Override
    public String getPassword() {  return user.getPw();    }

    @Override
    public String getUsername() {
        if(this.attributes == null){
            return user.getEmail();
        }
        return user.getServerID();
    }

    @Override
    public boolean isAccountNonExpired() {  return true;    }

    @Override
    public boolean isAccountNonLocked() {   return true;    }

    @Override
    public boolean isCredentialsNonExpired() {return true;  }

    @Override
    public boolean isEnabled() { return true;   }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() { return String.valueOf(user.getIuser()); }
}
