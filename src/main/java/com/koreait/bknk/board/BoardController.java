package com.koreait.bknk.board;

import com.koreait.bknk.board.model.*;
import com.koreait.bknk.search.model.SearchDAO;
import com.koreait.bknk.security.CustomUserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/b")
public class BoardController {
    @Autowired
    BoardService boardService;

    @RequestMapping("/create")
    public String writePage(){
        return "board/write";
    }

    @PostMapping("/create")
    public String write(@RequestParam("imgArr") MultipartFile[] imgArr , BoardDAO param, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        param.setIuser(userDetails.getUser().getIuser());
        BoardImgDAO boardImgDAO=new BoardImgDAO();
        boardImgDAO.setFiles(imgArr);
        boardService.insBoard(param);
        boardImgDAO.setIboard(param.getIboard());
        System.out.println(boardImgDAO.getIboard());
        boardService.insBoardImg(boardImgDAO);
        return "redirect:/b/reg?iboard="+param.getIboard();
    }

    @RequestMapping("/reg")
    public String detail(@RequestParam("iboard") int iboard, Model model, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        BoardDAO param=new BoardDAO();
        BoardFavEntity postFavEntity=new BoardFavEntity();
        postFavEntity.setIboard(iboard);
        boardService.updFav(postFavEntity);
        param.setIboard(iboard);
        List<BoardDTO> result= boardService.selDetail(param);
        model.addAttribute("result",result);
        param.setUserIuser(userDetails.getUser().getIuser());
        model.addAttribute("chFav",boardService.chFav(param));
        return "board/reg";
    }

    @ResponseBody
    @GetMapping("/delBoard")
    public int delBoard(@RequestParam("iboard") int iboard, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        BoardDAO boardDAO=new BoardDAO();
        boardDAO.setIboard(iboard);
        boardDAO.setIuser(userDetails.getUser().getIuser());
        return boardService.delBoard(boardDAO);
    }

    @ResponseBody
    @GetMapping("/cmtLoad")
    public List<CmtDAO> cmtList(@RequestParam("iboard") int iboard){
        List<CmtDAO> cmtList=boardService.selCmtList(iboard);
        return cmtList;
    }

    @ResponseBody
    @PostMapping("/cmtUpload")
    public int cmtUpload(@RequestBody CmtDAO param, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        param.setIuser(userDetails.getUser().getIuser());
        int result=boardService.insCmt(param);
        return result;
    }

    @ResponseBody
    @PostMapping("/modCmt")
    public int mod(@RequestBody CmtDAO param, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        param.setIuser(userDetails.getUser().getIuser());
        System.out.println(param);
        int result=boardService.updCmt(param);
        System.out.println(result);
        return result;
    }

    @ResponseBody
    @PostMapping("/delCmt")
    public int cmtDel(@RequestBody CmtDAO param, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        param.setIuser(userDetails.getUser().getIuser());
        return boardService.delCmt(param);
    }

    @ResponseBody
    @PostMapping("/insFav")
    public int insFav(@RequestBody BoardFavEntity param, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        param.setIuser(userDetails.getUser().getIuser());
        int result=boardService.insFav(param);
        boardService.updFav(param);
        return result;
    }

    @ResponseBody
    @PostMapping("/delFav")
    public int delFav(@RequestBody BoardFavEntity param, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        param.setIuser(userDetails.getUser().getIuser());
        int result=boardService.delFav(param);
        boardService.updFav(param);
        return result;
    }

//feed 부분--------------------------------------------------------------------------------------------

    @RequestMapping("/hot")
    public String hot(){
        return "board/hot";
    }

    @ResponseBody
    @RequestMapping("/hotList")
    public List<BoardDTO> hotFeedList(@RequestParam("limit") int limit, @RequestParam("page") int page){
        BoardDTO boardDTO=new BoardDTO();
        SearchDAO searchDAO=new SearchDAO();
        searchDAO.setLimit(limit);
        searchDAO.setStartPage((page-1)*limit);
        List<BoardDTO> list=boardService.selHotList(searchDAO);
        System.out.println(list);
        return list;
    }

    @RequestMapping("/fav")
    public String fav(){
        return "board/fav";
    }

    @ResponseBody
    @RequestMapping("/favList")
    public List<BoardDTO> favFeedList(@RequestParam("limit") int limit,@RequestParam("page") int page,@AuthenticationPrincipal CustomUserPrincipal userDetails){
        BoardDAO boardDAO=new BoardDAO();
        boardDAO.setIuser(userDetails.getUser().getIuser());
        boardDAO.setStartPage((page-1)*limit);
        List<BoardDTO> list=boardService.selFavFeedList(boardDAO);
        System.out.println(list.get(0).getMainProfile());
        return list;
    }

    @ResponseBody
    @RequestMapping("/userFeedList")
    public List<BoardDTO> feedList(@RequestParam("limit") int limit,@RequestParam("page") int page, @RequestParam("iuser") int iuser){
        BoardDAO boardDAO=new BoardDAO();
        boardDAO.setIuser(iuser);
        boardDAO.setStartPage((page-1)*limit);
        List<BoardDTO> list=boardService.selUserFeedList(boardDAO);
        return list;
    }

    @ResponseBody
    @RequestMapping("/myfeedpage")
    public int myFeedPage(@RequestParam("limit") int limit, @RequestParam("type") int type, @RequestParam("region") int region){
        BoardDAO boardDAO=new BoardDAO();
//        boardDAO.setIuser(userDetails.getUser().getIuser());
        boardDAO.setLimit(limit);
        boardDAO.setRegion(region);
        if(type==0){
            return boardService.selFeedPage1(boardDAO);
        }else if(type==1){
            return boardService.selFeedPage2(boardDAO);
        }
        return boardService.selFeedPage4(boardDAO);
    }

    //---------------------검색창 부분----------------------------
    @RequestMapping("/search")
    public String result(SearchDAO param, Model model){
        param.setLimit(9);
        model.addAttribute("search",param);
//        model.addAttribute("pageNum",boardService.selFeedPage3(param));
//        System.out.println("페이지 수"+boardService.selFeedPage3(param));
        return "board/search";
    }

    @ResponseBody
    @RequestMapping("/feedlist")
    public List<BoardDTO> feedList(@RequestParam("searchWord") String searchWord, @RequestParam("searchType") int searchType,
                                   @RequestParam("limit") int limit, @RequestParam("page") int page, @AuthenticationPrincipal CustomUserPrincipal userDetails){
        SearchDAO searchDAO=new SearchDAO();
        searchDAO.setSearchWord(searchWord);
        searchDAO.setSearchType(searchType);
        searchDAO.setStartPage((page-1)*limit);
//        if(userDetails != null){
//            searchDAO.setIuser(userDetails.getUser().getIuser());
//        }
        return boardService.selSearchResult(searchDAO);
    }

    @ResponseBody
    @RequestMapping("/searchPage")
    public int searchPage(@RequestParam("searchWord") String searchWord, @RequestParam("searchType") int searchType,
                          @RequestParam("limit") int limit){
        SearchDAO searchDAO=new SearchDAO();
        searchDAO.setSearchWord(searchWord);
        searchDAO.setSearchType(searchType);
        searchDAO.setLimit(limit);
        return boardService.selFeedPage3(searchDAO);
    }

    @ResponseBody
    @RequestMapping("/chFav")
    public int chFav(@RequestParam("iboard") int iboard, @AuthenticationPrincipal CustomUserPrincipal details){
        BoardDAO param=new BoardDAO();
        param.setIboard(iboard);
        param.setUserIuser(details.getUser().getIuser());
        return boardService.chFav(param);
    }

}
