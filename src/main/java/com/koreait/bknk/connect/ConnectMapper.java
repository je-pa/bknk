package com.koreait.bknk.connect;

import com.koreait.bknk.connect.model.SubscribeDAO;
import com.koreait.bknk.connect.model.SubscribeDTO;
import com.koreait.bknk.connect.model.SubscribeEntity;
import com.koreait.bknk.user.model.UserDTO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ConnectMapper {
    List<SubscribeDTO> selSubscribeList(SubscribeDAO param);
    int updLastLogin(SubscribeDAO param);
    int updLastLogin2(SubscribeDAO param);
}
