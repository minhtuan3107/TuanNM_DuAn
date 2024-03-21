package org.example.be.controller;

import org.example.be.model.MotobikeAccessory;
import org.example.be.service.IMotobikeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("findAll")
    private ResponseEntity<List<MotobikeAccessory>> getList() {
        return new ResponseEntity<>(motobikeAccessoryService.getList(), HttpStatus.OK);
    }
    @GetMapping("findAllNew")
    private ResponseEntity<List<MotobikeAccessory>> getListNew() {
        return new ResponseEntity<>(motobikeAccessoryService.getListNew(), HttpStatus.OK);
    }

    @GetMapping("find/{id}")
    private ResponseEntity<MotobikeAccessory> findId(@PathVariable Long id) {
        return new ResponseEntity<>(motobikeAccessoryService.findById(id), HttpStatus.OK);
    }
}
