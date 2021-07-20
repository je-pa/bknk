package com.koreait.bknk.security;

import com.koreait.bknk.user.model.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserPrincipal implements UserDetails{
    @Getter
    private UserEntity user;

    public CustomUserPrincipal(UserEntity user) { //로컬로 로그인할때
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {return null; }

    @Override
    public String getPassword() {  return user.getPw();    }

    @Override
    public String getUsername() {  return user.getEmail();    }

    @Override
    public boolean isAccountNonExpired() {  return true;    }

    @Override
    public boolean isAccountNonLocked() {   return true;    }

    @Override
    public boolean isCredentialsNonExpired() {return true;  }

    @Override
    public boolean isEnabled() { return true;   }
}
