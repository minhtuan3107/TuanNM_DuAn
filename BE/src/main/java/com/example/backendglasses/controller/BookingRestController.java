package com.example.backendglasses.controller;

import com.example.backendglasses.model.Booking;
import com.example.backendglasses.model.MotobikeAccessory;
import com.example.backendglasses.model.User;
import com.example.backendglasses.model.dto.CartDTO;
import com.example.backendglasses.model.dto.HistoryBookingDTO;
import com.example.backendglasses.model.dto.QuantityDTO;
import com.example.backendglasses.service.impl.IAccountService;
import com.example.backendglasses.service.impl.IBookingService;
import com.example.backendglasses.service.impl.IMotobikeAccessoryService;
import com.example.backendglasses.service.impl.IStatusBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

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


    @GetMapping("")
    private ResponseEntity<List<HistoryBookingDTO>> getListBookingByAccount(@RequestParam Long id) {
        List<HistoryBookingDTO> getListBooking = bookingService.getListBookingFormat(id);
        return new ResponseEntity<>(getListBooking, HttpStatus.OK);
    }



    @GetMapping("detailsBooking/{id}")
    private ResponseEntity<List<Booking>> detailsBooking(@PathVariable Long id, @RequestParam(defaultValue = "") String date) {
        List<Booking> bookings = bookingService.detailsBooking(date, id);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("cart")
    private ResponseEntity<List<Booking>> getCart(@RequestParam Long id) {
        List<Booking> getListBooking = bookingService.getCartByIdAccount(id);
        return new ResponseEntity<>(getListBooking, HttpStatus.OK);
    }

    @GetMapping("price")
    private ResponseEntity<Long> getAmountPriceCart(@RequestParam(value = "id", required = false) Long id) {
        Long priceCart = bookingService.getAmountPriceCart(id);
        return new ResponseEntity<>(priceCart, HttpStatus.OK);
    }

    @PostMapping("/addToCart")
    private void addToCart(@RequestBody CartDTO cartDTO) {
        List<Booking> booking = bookingService.checkBooking(cartDTO.getIdAccount(), cartDTO.getIdAccessory());
        if (booking.size() == 0) {
            bookingService.addToCard(cartDTO.getIdAccount(), cartDTO.getIdAccessory());
        } else {
            Booking booking1 = bookingService.findBookingByIdAccountAndIdAccessory(cartDTO.getIdAccount(), cartDTO.getIdAccessory());
            booking1.setQuantity(booking1.getQuantity() + 1);
            bookingService.save(booking1);
        }
    }


    @GetMapping("shipCod")
    private void shipCod(@RequestParam Long price,
                         @RequestParam Long idAccount,
                         @RequestParam(defaultValue = "") String des,
                         @RequestParam(defaultValue = "") String address,
                         @RequestParam(defaultValue = "") String phone) {
        List<Booking> bookings = bookingService.getListPay(idAccount);
        LocalDateTime dateTime = LocalDateTime.now();
        for (Booking booking : bookings) {
            MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
            motobikeAccessory.setQuantity(motobikeAccessory.getQuantity() - booking.getQuantity());
            motobikeAccessoryService.save(motobikeAccessory);
            booking.setStatusBooking(statusBookingService.findById(2L));
            booking.setStatusPayment(1);
            booking.setDateBooking(dateTime);
            booking.setTotalPrice(motobikeAccessory.getPrice());
            booking.setDes(des);
            if (address.equals("")) {
                booking.setAddress(booking.getAccount().getAddress());
            } else {
                booking.setAddress(address);
            }
            if (phone.equals("")) {
                booking.setPhone(booking.getAccount().getPhoneNumber());
            } else {
                booking.setPhone(phone);
            }
            bookingService.save(booking);
        }
    }

    @GetMapping("donePayment/{idAccount}")
    private void donePayment(@PathVariable Long idBooking) {
        Booking booking = bookingService.findById(idBooking);
        LocalDateTime dateTime = LocalDateTime.now();
        MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
        booking.setStatusBooking(statusBookingService.findById(2L));
        booking.setStatusPayment(2);
        booking.setDateBooking(dateTime);
        booking.setTotalPrice(motobikeAccessory.getPrice());
        bookingService.save(booking);
    }



    @GetMapping("deleteCart")
    private void deleteCart(@RequestParam Long idBooking) {
        bookingService.deleteCart(idBooking);
    }

    @PostMapping("setQuantity")
    private void setQuantity(@RequestBody QuantityDTO quantityDTO) {
        bookingService.updateQuantity(quantityDTO.getQuantity(), quantityDTO.getIdBooking());
    }


    @GetMapping("checkQuantityPayment")
    private ResponseEntity<?> checkQuantityPayment(@RequestParam Long idAccount) {
        List<Booking> bookings = bookingService.getListPay(idAccount);
        for (Booking booking : bookings) {
            MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
            System.out.println(motobikeAccessory.getQuantity() - booking.getQuantity() < -1);
            if (motobikeAccessory.getQuantity() - booking.getQuantity() < -1) {
                return new ResponseEntity<>("NO", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("YES", HttpStatus.OK);
    }

    @GetMapping("/quantityCart")
    private ResponseEntity<?> getQuantityCart(@RequestParam(value = "idUser", required = false) Long idUser) {
        List<Booking> getList = bookingService.getCartByIdAccount(idUser);
        return new ResponseEntity<>(getList.size(), HttpStatus.OK);
    }
}
