package com.koreait.bknk.user;

import com.koreait.bknk.common.EmailService;
import com.koreait.bknk.common.MyConst;
import com.koreait.bknk.common.MyFileUtils;
import com.koreait.bknk.common.MySecurityUtils;
import com.koreait.bknk.security.IAuthenticationFacade;
import com.koreait.bknk.security.UserDetailsServiceImpl;
import com.koreait.bknk.user.model.UserEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    @Autowired private UserMapper mapper;
    @Autowired private EmailService email; //메일보내기
    @Autowired private MySecurityUtils secUtils; //인증번호 얻기
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private UserDetailsServiceImpl userDetailService;
    @Autowired private MyConst myConst;
    @Autowired private IAuthenticationFacade auth;
    @Autowired private MyFileUtils myFileUtils;

    public int join(UserEntity param) {
        param.setProvider(myConst.LOCAL);
        UserEntity localUser = mapper.selLocalUser(param);
        System.out.println(localUser);

        int result = 0;
        String authCd = "";

        if(localUser==null){
            if(mapper.chkNick(param)!=null){
                return 2;//2 : 사용할 수 없는 닉네임입니다. 다른 닉네임을 사용하세요.
            }
            authCd = secUtils.getRandomDigit(5);
            param.setAuthCd(authCd);

            String hashedPw = passwordEncoder.encode(param.getPw());
            param.setPw(hashedPw);

            result = userDetailService.join(param);
        }else{
            if(localUser.getAuthCd()==null){
                return 0;//0 : 이미 가입한 이메일 입니다
            }else{
                result = 3;//3 : 이메일 인증을 하지 않은 이메일 입니다. 이메일 인증을 해주세요
                BeanUtils.copyProperties(localUser,param);

                System.out.println(param);
            }
        }

        if(result==1 || result ==3){
            String txt = email.makeTxt(param.getNm(),param.getNick(), param.getEmail(),param.getAuthCd());
            email.sendMimeMessage(param.getEmail(), myConst.SUBJECT, txt);
        }
        return result; //1 : 이메일 인증을 해주세요
    }

    //이메일 인증
   public int auth(UserEntity param) {
       return mapper.auth(param);
    }

    public Map<String,Object> updMainProfile(MultipartFile profileImg) {
        Map<String,Object> res = new HashMap<>();
        res.put(myConst.RESULT,0);

        UserEntity loginUser = auth.getLoginUser();

        if(profileImg==null){return res;}
        int result = 0;
        UserEntity param = new UserEntity();
        param.setIuser(loginUser.getIuser());

        if(profileImg!=null){
            String target = "user/"+param.getIuser();
            String saveFileNm = myFileUtils.transferTo(profileImg, target);
            if(saveFileNm != null){
                System.out.println(param);
                param.setMainProfile(saveFileNm);
                result = mapper.updUser(param);
            }
        }
        if(result==1){
            loginUser.setMainProfile(param.getMainProfile());
            res.put(myConst.RESULT,result);
        }
        res.put(myConst.LOGIN_USER,loginUser);
        return res;
    }

    public Integer delMainProfile() {
        UserEntity loginUser = auth.getLoginUser();
        UserEntity param = new UserEntity();
        param.setIuser(loginUser.getIuser());
        param.setMainProfile("");
        int result = mapper.updUser(param);
        if(result==1){
            loginUser.setMainProfile(param.getMainProfile());
        }
        return result;
    }

    public int chkUser(UserEntity param) {
        UserEntity loginUser = auth.getLoginUser();
        param.setIuser(loginUser.getIuser());
        int result =0;
        if(param.getPw()!=null && passwordEncoder.matches(param.getPw(),loginUser.getPw())){
            result =2;
        }else if(param.getNick()!=null && mapper.chkNick(param)==null){
            result = 1;
        }
        System.out.println(result);
        return result;
    }

    public int edit(UserEntity param) {
        int result = 0;
        UserEntity loginUser = auth.getLoginUser();
        param.setIuser(loginUser.getIuser());

        System.out.println("editParam : "+param);

        if(param.getPw()!=null){
            param.setPw(passwordEncoder.encode(param.getPw()));
            if(mapper.updUser(param)==1){
                result = 2;
            }
        }else{
            result = mapper.updUser(param);

            loginUser.setNm(param.getNm());
            loginUser.setNick(param.getNick());
            loginUser.setGender(param.getGender());
            loginUser.setTel(param.getTel());
            loginUser.setBirthY(param.getBirthY());
            loginUser.setBirthM(param.getBirthM());
            loginUser.setBirthD(param.getBirthD());
        }

        return result;
    }
}
