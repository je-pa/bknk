package com.koreait.bknk.board;

import com.koreait.bknk.board.model.*;
import com.koreait.bknk.common.MyFileUtils;
import com.koreait.bknk.search.model.SearchDAO;
import com.koreait.bknk.security.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    BoardMapper boardMapper;
    @Autowired
    MyFileUtils myFileUtils;

    @Autowired
    IAuthenticationFacade auth;

    public int insBoard(BoardDAO param){
        return boardMapper.insBoard(param);
    }

    public int insBoardImg(BoardImgDAO param){
        if(param.getFiles()==null && param.getIboard()==0){
            return 0;
        }
        BoardImgDAO postImg=new BoardImgDAO();
        postImg.setIboard(param.getIboard());
        for(MultipartFile img: param.getFiles()){
            String saveFileNm= myFileUtils.transferTo(img,"board/"+param.getIboard());
            postImg.setImg_addr(saveFileNm);
            if(saveFileNm!=null){
                boardMapper.insBoardImg(postImg);
            }
        }
        return 1;
    }

    public int delBoard(BoardDAO param){
        boardMapper.delBoard(param);
        boardMapper.delBoard2(param);
        boardMapper.delBoard3(param);
        myFileUtils.delFile("/board/"+param.getIboard());
        return boardMapper.delBoard4(param);}

    public int updFav(BoardFavEntity param){ return boardMapper.updFav(param);}

    public int chFav(BoardDAO param){ return boardMapper.chFav(param); }

    public List<BoardDTO> selDetail(BoardDAO iboard){
        return boardMapper.selDetail(iboard);
    }

    public List<CmtDAO> selCmtList(int iboard){
        if(iboard==0){
            return null;
        }
        List<CmtDAO> cmtDAOList=boardMapper.selCmtList(iboard);
        return cmtDAOList;
    }

    public int insCmt(CmtDAO param){
        return boardMapper.insCmt(param);
    }

    public int delCmt(CmtDAO param){
        return boardMapper.delCmt(param);
    }
    public int updCmt(CmtDAO param) { return boardMapper.updCmt(param); }

    public int insFav(BoardFavEntity param){
        return boardMapper.insFav(param);
    }
    public int delFav(BoardFavEntity param){ return boardMapper.delFav(param);}


    //Feed 부분
    public List<BoardDTO> selHotList(SearchDAO param) {
        param.setIuser(auth.getLoginUserPk());
        return boardMapper.selHotList(param);
    }
    public List<BoardDTO> selFavFeedList(BoardDAO param) { return boardMapper.selFavList(param);}
    public List<BoardDTO> selUserFeedList(BoardDAO param){
        return boardMapper.selUserFeedList(param);
    }

    public int selFeedPage1(BoardDAO param){
        param.setIuser(auth.getLoginUserPk());
        return boardMapper.selFeedPage1(param);
    }
    public int selFeedPage2(BoardDAO param){
        param.setIuser(auth.getLoginUserPk());
        return boardMapper.selFeedPage2(param);
    }
    public int selFeedPage4(BoardDAO param) {
        param.setIuser(auth.getLoginUserPk());
        return boardMapper.selFeedPage4(param);
    }

    //검색부분
    public int selFeedPage3(SearchDAO param) { return boardMapper.selFeedPage3(param); }
    public List<BoardDTO> selSearchResult(SearchDAO param){
        param.setIuser(auth.getLoginUserPk());
        return boardMapper.selSearchResult(param);
    }
}
