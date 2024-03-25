package org.example.be.controller;

import jakarta.transaction.Transactional;
import org.example.be.model.Booking;
import org.example.be.model.MotobikeAccessory;
import org.example.be.service.IBookingService;
import org.example.be.service.IMotobikeAccessoryService;
import org.example.be.service.IStatusBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/booking")
public class BookingRestController {
    @Autowired
    private IBookingService bookingService;

    @Autowired
    private IMotobikeAccessoryService motobikeAccessoryService;
    @Autowired
    private IStatusBookingService statusBookingService;

    @GetMapping("{id}")
    private ResponseEntity<List<Booking>> getListBookingByAccount(@PathVariable Long id) {
        List<Booking> getListBooking = bookingService.getListByIdAccount(id);
        return new ResponseEntity<>(getListBooking, HttpStatus.OK);
    }

    @GetMapping("cart/{id}")
    private ResponseEntity<List<Booking>> getCart(@PathVariable Long id) {
        List<Booking> getListBooking = bookingService.getCartByIdAccount(id);
        return new ResponseEntity<>(getListBooking, HttpStatus.OK);
    }

    @GetMapping("price/{id}")
    private ResponseEntity<Long> getAmountPriceCart(@PathVariable Long id) {
        Long priceCart = bookingService.getAmountPriceCart(id);
        return new ResponseEntity<>(priceCart, HttpStatus.OK);
    }

    @GetMapping("addToCart/{idAccount}/{idAccessory}")
    private void addToCart(@PathVariable Long idAccount, @PathVariable Long idAccessory) {
        List<Booking> booking = bookingService.checkBooking(idAccount, idAccessory);
        if (booking.size() == 0) {
            bookingService.addToCard(idAccount, idAccessory);
        } else {
            Booking booking1 = bookingService.findBookingByIdAccountAndIdAccessory(idAccount, idAccessory);
            booking1.setQuantity(booking1.getQuantity() + 1);
            bookingService.save(booking1);
        }
    }

    @GetMapping("shipCod")
    private void shipCod(@RequestParam Long price, @RequestParam Long idAccount) {
        List<Booking> bookings = bookingService.getListPay(idAccount);
        for (Booking booking : bookings) {
            MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
            motobikeAccessory.setQuantity(motobikeAccessory.getQuantity() - booking.getQuantity());
            motobikeAccessoryService.save(motobikeAccessory);
            booking.setStatusBooking(statusBookingService.findById(2L));
            booking.setStatusPayment(1);
            booking.setDateBooking(LocalDateTime.now());
            booking.setTotalPrice(motobikeAccessory.getPrice());
            bookingService.save(booking);
        }
    }

    @GetMapping("donePayment/{idAccount}")
    private void donePayment(@PathVariable Long idBooking) {
        Booking booking = bookingService.findById(idBooking);
        MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
        booking.setStatusBooking(statusBookingService.findById(2L));
        booking.setStatusPayment(2);
        booking.setDateBooking(LocalDateTime.now());
        booking.setTotalPrice(motobikeAccessory.getPrice());
        bookingService.save(booking);
    }

    @PostMapping("book")
    private void bookAccessary(@RequestParam Long idBooking,
                               @RequestParam Long price) {
        Booking booking = bookingService.findById(idBooking);
        booking.setTotalPrice(price);
        booking.setDateBooking(LocalDateTime.now());
        booking.setStatusBooking(statusBookingService.findById(2L));
        bookingService.save(booking);
        MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
        motobikeAccessory.setQuantity(motobikeAccessory.getQuantity() - booking.getQuantity());
        motobikeAccessoryService.save(motobikeAccessory);
    }

    @GetMapping("deleteCart/{idBooking}")
    private void deleteCart(@PathVariable Long idBooking) {
        bookingService.deleteCart(idBooking);
    }

    @GetMapping("setQuantity/{quantity}/{idBooking}")
    private void deleteCart(@PathVariable int quantity, @PathVariable Long idBooking) {
        bookingService.updateQuantity(quantity, idBooking);
    }

    @GetMapping("getBookingAdmin")
    private ResponseEntity<?> getAllAdmin(@RequestParam(defaultValue = "") String name,
                                          @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Booking> getList = bookingService.getListAndSearch(name, pageable);
        return new ResponseEntity<>(getList, HttpStatus.OK);
    }

    @GetMapping("checkQuantityPayment")
    private ResponseEntity<?> checkQuantityPayment(@RequestParam Long idAccount) {
        List<Booking> bookings = bookingService.getListPay(idAccount);
        for (Booking booking : bookings) {
            MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
            System.out.println(motobikeAccessory.getQuantity() - booking.getQuantity() < -1);
            if (motobikeAccessory.getQuantity() - booking.getQuantity() < -1) {
                System.out.println("NO");
                return new ResponseEntity<>("NO", HttpStatus.OK);
            }
        }
        System.out.println("YES");
        return new ResponseEntity<>("YES", HttpStatus.OK);
    }
}
