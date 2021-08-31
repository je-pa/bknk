package com.koreait.bknk.board;

import com.koreait.bknk.board.model.*;
import com.koreait.bknk.search.model.SearchDAO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    List<BoardDTO> selDetail(BoardDAO param);
    int insBoard(BoardDAO param);
    int insBoardImg(BoardImgDAO param);
    int updFav(BoardFavEntity param);
    int chFav(BoardDAO param);
    int delBoard(BoardDAO param);
    int delBoard2(BoardDAO param);
    int delBoard3(BoardDAO param);
    int delBoard4(BoardDAO param);

    //  댓글
    List<CmtDAO> selCmtList(int iboard);
    int insCmt(CmtDAO param);
    int delCmt(CmtDAO param);
    int updCmt(CmtDAO param);

    //좋아요
    int insFav(BoardFavEntity param);
    int delFav(BoardFavEntity param);

    //Feed부분
    List<BoardDTO> selHotList(SearchDAO param);
    List<BoardDTO> selFavList(BoardDAO param);
    List<BoardDTO> selUserFeedList(BoardDAO param);

    int selFeedPage1(BoardDAO param);
    int selFeedPage2(BoardDAO param);
    int selFeedPage4(BoardDAO param);

    //검색부분
    int selFeedPage3(SearchDAO param);
    List<BoardDTO> selSearchResult(SearchDAO param);
}
