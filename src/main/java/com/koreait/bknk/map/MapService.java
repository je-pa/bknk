package com.koreait.bknk.map;

import com.koreait.bknk.board.BoardMapper;
import com.koreait.bknk.board.model.BoardDTO;
import com.koreait.bknk.search.model.SearchDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MapService {
    @Autowired
    BoardMapper boardMapper;

    public List<BoardDTO> selRegionBoardList(SearchDAO param){
        return boardMapper.selHotList(param);
    }
}
