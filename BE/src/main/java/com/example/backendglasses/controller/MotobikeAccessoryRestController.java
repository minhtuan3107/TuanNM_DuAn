package com.example.backendglasses.controller;

import com.example.backendglasses.model.MotobikeAccessory;
import com.example.backendglasses.service.impl.IMotobikeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class MotobikeAccessoryRestController {
    @Autowired
    private IMotobikeAccessoryService motobikeAccessoryService;

    @GetMapping("findAll/{name}")
    private ResponseEntity<List<MotobikeAccessory>> getList(@PathVariable String name) { // lấy danh sách phụ tùng theo tên
        return new ResponseEntity<>(motobikeAccessoryService.getListNewAll(name), HttpStatus.OK); // trả về danh sách phụ tùng theo tên
    }

    @GetMapping("getAll")
    private ResponseEntity<Page<MotobikeAccessory>> getAll(@RequestParam(defaultValue = "") String name, // lấy danh sách phụ tùng
                                                           @RequestParam(defaultValue = "0") int page) { // phân trang
        Pageable pageable = PageRequest.of(0, page); // phân trang
        Page<MotobikeAccessory> getList = motobikeAccessoryService.getAllAndSearch(name, pageable); // lấy danh sách phụ tùng
        return new ResponseEntity<>(getList, HttpStatus.OK); // trả về danh sách phụ tùng
    }

    @GetMapping("getListByQuantity") // lấy danh sách phụ tùng mới
    private ResponseEntity<List<MotobikeAccessory>> getListByQuantity() { // lấy danh sách phụ tùng mới
        return new ResponseEntity<>(motobikeAccessoryService.getAll(), HttpStatus.OK); // trả về danh sách phụ tùng mới
    }

    @GetMapping("findAllNew") // lấy danh sách phụ tùng mới
    private ResponseEntity<List<MotobikeAccessory>> getListNew() { // lấy danh sách phụ tùng mới
        return new ResponseEntity<>(motobikeAccessoryService.getListNew(), HttpStatus.OK); // trả về danh sách phụ tùng mới
    }

    @GetMapping("getListHot")
    private ResponseEntity<List<MotobikeAccessory>> getListHot() { // lấy danh sách phụ tùng hot
        return new ResponseEntity<>(motobikeAccessoryService.getListHot(), HttpStatus.OK); // trả về danh sách phụ tùng hot
    }

    @GetMapping("find")
    private ResponseEntity<MotobikeAccessory> findId(@RequestParam
                                                     Long id) { // tìm phụ tùng theo id
        return new ResponseEntity<>(motobikeAccessoryService.findById(id), HttpStatus.OK); // trả về phụ tùng theo id
    }

}
