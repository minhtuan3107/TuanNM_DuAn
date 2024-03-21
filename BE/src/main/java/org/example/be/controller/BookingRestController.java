package org.example.be.controller;

import org.example.be.model.Booking;
import org.example.be.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/booking")
public class BookingRestController {
    @Autowired
    private IBookingService bookingService;

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
        bookingService.addToCard(idAccount, idAccessory);
    }
}
