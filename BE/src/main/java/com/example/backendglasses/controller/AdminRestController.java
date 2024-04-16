package com.example.backendglasses.controller;

import com.example.backendglasses.model.Booking;
import com.example.backendglasses.model.MotobikeAccessory;
import com.example.backendglasses.model.TypeAccessory;
import com.example.backendglasses.model.User;
import com.example.backendglasses.model.dto.HistoryBookingDTO;
import com.example.backendglasses.model.dto.StatisticalBookingDTO;
import com.example.backendglasses.model.dto.UserBookingDTO;
import com.example.backendglasses.service.impl.IAccountService;
import com.example.backendglasses.service.impl.IBookingService;
import com.example.backendglasses.service.impl.IMotobikeAccessoryService;
import com.example.backendglasses.service.impl.ITypeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    @Autowired
    private ITypeAccessoryService typeAccessoryService;

    @GetMapping("getAllBooking")
    private ResponseEntity<?> getAllBooking(@RequestParam(defaultValue = "0") int page) { // lấy tất cả booking
        Pageable pageable = PageRequest.of(page, 5);// phân trang
        Page<HistoryBookingDTO> getListBooking = bookingService.getListBooking(pageable); // lấy danh sách booking
        return new ResponseEntity<>(getListBooking, HttpStatus.OK);// trả về danh sách booking
    }

    @GetMapping("getAllAccessary")
    private ResponseEntity<Page<MotobikeAccessory>> getAllAccessary(@RequestParam(defaultValue = "") String name, @RequestParam(defaultValue = "0") int page) { // lấy tất cả phụ tùng
        Pageable pageable = PageRequest.of(page, 5);// phân trang
        Page<MotobikeAccessory> getList = motobikeAccessoryService.getAllAndSearch(name, pageable); // lấy danh sách phụ tùng
        return new ResponseEntity<>(getList, HttpStatus.OK);// trả về danh sách phụ tùng
    }

    @GetMapping("getAllAccount")
    private ResponseEntity<List<User>> getAllUser(@RequestParam(defaultValue = "") String name, @RequestParam(defaultValue = "0") int page) { // lấy tất cả user
        Pageable pageable = PageRequest.of(page, 5); // phân trang
        List<User> users = accountService.getAll(pageable);// lấy danh sách user
        return new ResponseEntity<>(users, HttpStatus.OK);// trả về danh sách user
    }


    @GetMapping("detailBookingAdmin")
    private ResponseEntity<List<Booking>> detailsBookingAdmin(@RequestParam(defaultValue = "") String date) { // chi tiết booking
        List<Booking> bookings = bookingService.detailBookingAdmin(date);// chi tiết booking
        return new ResponseEntity<>(bookings, HttpStatus.OK); // trả về danh sách booking
    }

    @GetMapping("deleteAccessary")
    private void deleteAccessary(@RequestParam Long id) { // xóa phụ tùng
        MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(id); // tìm phụ tùng theo id
        motobikeAccessory.setIsDeleted(true);// xóa phụ tùng
        motobikeAccessoryService.save(motobikeAccessory);// lưu phụ tùng vào database
    }

    @PostMapping("addAccessary")
    private void addAccessary(@RequestBody MotobikeAccessory motobikeAccessory) { // thêm phụ tùng
        motobikeAccessory.setIsDeleted(false); // phụ tùng chưa xóa
        motobikeAccessory.setDate(LocalDate.now()); // ngày thêm phụ tùng
        motobikeAccessoryService.save(motobikeAccessory); // lưu phụ tùng vào database
    }

    @PostMapping("addTypeAccessary")
    private void addTypeAccessary(@RequestBody TypeAccessory typeAccessory) { // thêm loại phụ tùng
        typeAccessoryService.save(typeAccessory); // lưu loại phụ tùng vào database
    }

    @GetMapping("getAllTop")
    private ResponseEntity<StatisticalBookingDTO> getAllTop() { // lấy top booking
        List<StatisticalBookingDTO> list = bookingService.getBookingTop();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("getUserTop")
    private ResponseEntity<UserBookingDTO> getUserTop() { // lấy top booking
        List<UserBookingDTO> list = bookingService.getBookingUser();
        return new ResponseEntity(list, HttpStatus.OK);
    }
}
