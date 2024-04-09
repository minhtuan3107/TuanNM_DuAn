package com.example.backendglasses.controller;

import com.example.backendglasses.model.Booking;
import com.example.backendglasses.model.MotobikeAccessory;
import com.example.backendglasses.model.StatusBooking;
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
import org.springframework.data.repository.query.Param;
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
    @Autowired
    private IAccountService iAccountService;


    @GetMapping("")
    private ResponseEntity<Page<HistoryBookingDTO>> getListBookingByAccount(@RequestParam(defaultValue = "0") int page, @RequestParam Long id) { // lấy danh sách booking theo tài khoản
        Pageable pageable = PageRequest.of(page, 5); // phân trang
        Page<HistoryBookingDTO> getListBooking = bookingService.getListBookingAccount(id, pageable); // lấy danh sách booking theo tài khoản
        return new ResponseEntity<>(getListBooking, HttpStatus.OK); // trả về danh sách booking theo tài khoản
    }


    @GetMapping("detailsBooking/{id}")
    private ResponseEntity<List<Booking>> detailsBooking(@PathVariable Long id, @RequestParam(defaultValue = "") String date) { // chi tiết booking
        List<Booking> bookings = bookingService.detailsBooking(date, id); // chi tiết booking
        return new ResponseEntity<>(bookings, HttpStatus.OK);// trả về danh sách booking
    }

    @GetMapping("cart")
    private ResponseEntity<List<Booking>> getCart(@RequestParam Long id) { // lấy giỏ hàng
        List<Booking> getListBooking = bookingService.getCartByIdAccount(id); // lấy giỏ hàng
        if (getListBooking.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // trả về giỏ hàng
        }
        return new ResponseEntity<>(getListBooking, HttpStatus.OK); // trả về giỏ hàng
    }

    @GetMapping("price")
    private ResponseEntity<Long> getAmountPriceCart(@RequestParam(value = "id", required = false) Long id) { // lấy tổng giá giỏ hàng
        Long priceCart = bookingService.getAmountPriceCart(id); // lấy tổng giá giỏ hàng
        return new ResponseEntity<>(priceCart, HttpStatus.OK); // trả về tổng giá giỏ hàng
    }

    @PostMapping("/addToCart")
    private void addToCart(@RequestBody CartDTO cartDTO) { // thêm vào giỏ hàng
        List<Booking> booking = bookingService.checkBooking(cartDTO.getIdAccount(), cartDTO.getIdAccessory()); // kiểm tra booking
        if (booking.size() == 0) { // nếu booking = 0
            bookingService.addToCard(cartDTO.getIdAccount(), cartDTO.getIdAccessory()); // thêm vào giỏ hàng
        } else {
            Booking booking1 = bookingService.findBookingByIdAccountAndIdAccessory(cartDTO.getIdAccount(), cartDTO.getIdAccessory()); // tìm booking theo id tài khoản và id phụ tùng
            booking1.setQuantity(booking1.getQuantity() + 1); // tăng số lượng
            bookingService.save(booking1); // lưu vào database
        }
    }

    @GetMapping("checkPayment")
    private void checkPayment() {
        List<Booking> bookings = bookingService.getAll();
        StatusBooking statusBooking = statusBookingService.findById(3L);
        LocalDateTime currentTime = LocalDateTime.now();
        for (Booking booking : bookings) {
            if (booking.getStatusBooking().equals(statusBooking)) {
                if (booking.getDateBooking().isBefore(currentTime.minusMinutes(5))) {
                    booking.setStatusBooking(statusBookingService.findById(1L));
                    MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
                    motobikeAccessory.setQuantity(motobikeAccessory.getQuantity() + booking.getQuantity());
                    booking.setDateBooking(null);
                    booking.setAddress("");
                    booking.setPhone("");
                    bookingService.save(booking);
                    motobikeAccessoryService.save(motobikeAccessory);
                }
            }
        }
    }

    @GetMapping("waitPayment")
    private ResponseEntity<Boolean> waitPayment(@RequestParam Long idAccount,
                                                @RequestParam(defaultValue = "") String des,
                                                @RequestParam(defaultValue = "") String address,
                                                @RequestParam(defaultValue = "") String phone) { // chờ thanh toán
        List<Booking> bookings = bookingService.getListPay(idAccount); // lấy danh sách booking
        User user = iAccountService.findById(idAccount); // tìm user theo id
        LocalDateTime localDateTime = LocalDateTime.now();
        for (Booking booking : bookings) {
            MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId()); // tìm phụ tùng theo id
            if (motobikeAccessory.getQuantity() < booking.getQuantity()) {
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
        }
        for (Booking booking : bookings) {
            MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId()); // tìm phụ tùng theo id
            booking.setStatusBooking(statusBookingService.findById(3L)); // cập nhật trạng thái booking
            motobikeAccessory.setQuantity(motobikeAccessory.getQuantity() - booking.getQuantity()); // cập nhật số lượng
            booking.setDes(des); // cập nhật mô tả
            booking.setDateBooking(localDateTime);
            if (address.equals("")) { // nếu địa chỉ rỗng
                booking.setAddress(booking.getAccount().getAddress()); // cập nhật địa chỉ
            } else { // nếu địa chỉ không rỗng
                booking.setAddress(address); // cập nhật địa chỉ
            }
            if (phone.equals("")) { // nếu số điện thoại rỗng
                booking.setPhone(booking.getAccount().getPhoneNumber()); // cập nhật số điện thoại
            } else { // nếu số điện thoại không rỗng
                booking.setPhone(phone); // cập nhật số điện thoại
            }
            bookingService.save(booking); // lưu vào database
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("shipCod")
    private void shipCod(@RequestParam Long price,
                         @RequestParam Long idAccount) { // giao hàng COD
        List<Booking> bookings = bookingService.getListPayment(idAccount);
        LocalDateTime dateTime = LocalDateTime.now();
        User user = iAccountService.findById(idAccount);
        for (Booking booking : bookings) {
            MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
            motobikeAccessoryService.save(motobikeAccessory);
            booking.setStatusBooking(statusBookingService.findById(2L));
            booking.setStatusPayment(1);
            booking.setDateBooking(dateTime);
            booking.setTotalPrice(motobikeAccessory.getPrice());
            bookingService.save(booking);
            iAccountService.sendMailBooking(user, bookings, price, true);
        }

    }

    @GetMapping("donePayment/{idAccount}")
    private void donePayment(@PathVariable Long idBooking) { // thanh toán
        Booking booking = bookingService.findById(idBooking); // tìm booking theo id
        LocalDateTime dateTime = LocalDateTime.now(); // ngày giờ hiện tại
        MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId()); // tìm phụ tùng theo id
        booking.setStatusBooking(statusBookingService.findById(2L)); // cập nhật trạng thái booking
        booking.setStatusPayment(2); // cập nhật trạng thái thanh toán
        booking.setDateBooking(dateTime); // cập nhật ngày giờ booking
        booking.setTotalPrice(motobikeAccessory.getPrice()); // cập nhật tổng giá
        bookingService.save(booking);// lưu vào database
    }


    @GetMapping("deleteCart")
    private void deleteCart(@RequestParam Long idBooking) { // xóa giỏ hàng
        bookingService.deleteCart(idBooking); // xóa giỏ hàng
    }

    @PostMapping("setQuantity")
    private void setQuantity(@RequestBody QuantityDTO quantityDTO) { // cập nhật số lượng
        bookingService.updateQuantity(quantityDTO.getQuantity(), quantityDTO.getIdBooking()); // cập nhật số lượng
    }


    @GetMapping("/quantityCart")
    private ResponseEntity<?> getQuantityCart(@RequestParam(value = "idUser", required = false) Long idUser) { // lấy số lượng giỏ hàng
        List<Booking> getList = bookingService.getCartByIdAccount(idUser); // lấy giỏ hàng
        return new ResponseEntity<>(getList.size(), HttpStatus.OK); // trả về số lượng giỏ hàng
    }
}
