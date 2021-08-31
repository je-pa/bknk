package com.koreait.bknk.map;

import com.koreait.bknk.board.BoardService;
import com.koreait.bknk.board.model.BoardDTO;
import com.koreait.bknk.search.model.SearchDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/map")
public class MapController {
    @Autowired
    BoardService boardService;

    @RequestMapping("/map")
    public void map(){}

    @RequestMapping("/{region}")
    public String searchRegion(@PathVariable("region") int region, Model model){
        model.addAttribute("region",region);
        return "map/region";
    }

    @ResponseBody
    @RequestMapping("/mapFeedList")
    public List<BoardDTO> hotMapList(@RequestParam("limit") int limit, @RequestParam("page") int page, @RequestParam("region") int region){
        SearchDAO searchDAO=new SearchDAO();
        searchDAO.setLimit(limit);
        searchDAO.setRegion(region);
        searchDAO.setStartPage((page-1)*limit);
        List<BoardDTO> list=boardService.selHotList(searchDAO);
        return list;
    }

}
