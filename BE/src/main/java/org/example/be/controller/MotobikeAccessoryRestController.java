package org.example.be.controller;

import org.example.be.model.MotobikeAccessory;
import org.example.be.service.IMotobikeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private ResponseEntity<List<MotobikeAccessory>> getList(@PathVariable String name) {
        return new ResponseEntity<>(motobikeAccessoryService.getListNewAll(name), HttpStatus.OK);
    }

    @GetMapping("getAll")
    private ResponseEntity<Page<MotobikeAccessory>> getAll(@RequestParam(defaultValue = "") String name,
                                                           @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(0, page);
        Page<MotobikeAccessory> getList = motobikeAccessoryService.getAllAndSearch(name, pageable);
        return new ResponseEntity<>(getList, HttpStatus.OK);
    }
    @GetMapping("getAllAdmin")
    private ResponseEntity<Page<MotobikeAccessory>> getAllAdmin(@RequestParam(defaultValue = "") String name,
                                                           @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<MotobikeAccessory> getList = motobikeAccessoryService.getAllAndSearch(name, pageable);
        return new ResponseEntity<>(getList, HttpStatus.OK);
    }

    @GetMapping("findAllNew")
    private ResponseEntity<List<MotobikeAccessory>> getListNew() {
        return new ResponseEntity<>(motobikeAccessoryService.getListNew(), HttpStatus.OK);
    }

    @GetMapping("getListHot")
    private ResponseEntity<List<MotobikeAccessory>> getListHot() {
        return new ResponseEntity<>(motobikeAccessoryService.getListHot(), HttpStatus.OK);
    }

    @GetMapping("find/{id}")
    private ResponseEntity<MotobikeAccessory> findId(@PathVariable Long id) {
        return new ResponseEntity<>(motobikeAccessoryService.findById(id), HttpStatus.OK);
    }
}
