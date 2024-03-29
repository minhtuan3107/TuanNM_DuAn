package com.example.backendglasses.controller;

import com.example.backendglasses.model.Booking;
import com.example.backendglasses.model.MotobikeAccessory;
import com.example.backendglasses.model.User;
import com.example.backendglasses.service.impl.IAccountService;
import com.example.backendglasses.service.impl.IBookingService;
import com.example.backendglasses.service.impl.IMotobikeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminRestController {
    @Autowired
    private IBookingService bookingService;
    @Autowired
    private IMotobikeAccessoryService motobikeAccessoryService;
    @Autowired
    private IAccountService accountService;

    @GetMapping("getAllBooking")
    private ResponseEntity<?> getAllBooking(@RequestParam(defaultValue = "") String name,
                                            @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Booking> getList = bookingService.getListAndSearch(name, pageable);
        return new ResponseEntity<>(getList, HttpStatus.OK);
    }

    @GetMapping("getAllAccessary")
    private ResponseEntity<Page<MotobikeAccessory>> getAllAccessary(@RequestParam(defaultValue = "") String name,
                                                                    @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<MotobikeAccessory> getList = motobikeAccessoryService.getAllAndSearch(name, pageable);
        return new ResponseEntity<>(getList, HttpStatus.OK);
    }

    @GetMapping("getAllAccount")
    private ResponseEntity<List<User>> getAllUser(@RequestParam(defaultValue = "") String name,
                                                  @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        List<User> users = accountService.getAll(pageable);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @GetMapping("detailBookingAdmin")
    private ResponseEntity<List<Booking>> detailsBookingAdmin(@RequestParam(defaultValue = "") String date) {
        List<Booking> bookings = bookingService.detailBookingAdmin(date);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
    @GetMapping("deleteAccessary")
    private void deleteAccessary(@RequestParam Long id) {
        MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(id);
        motobikeAccessory.setIsDeleted(true);
        motobikeAccessoryService.save(motobikeAccessory);
    }

    @PostMapping("addAccessary")
    private void addAccessary(@RequestBody MotobikeAccessory motobikeAccessory) {
        motobikeAccessory.setIsDeleted(false);
        motobikeAccessoryService.save(motobikeAccessory);
    }
}
