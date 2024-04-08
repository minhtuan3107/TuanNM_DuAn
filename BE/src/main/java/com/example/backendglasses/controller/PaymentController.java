package com.example.backendglasses.controller;

import com.example.backendglasses.config.ConfigVNP;
import com.example.backendglasses.model.Booking;
import com.example.backendglasses.model.MotobikeAccessory;
import com.example.backendglasses.model.User;
import com.example.backendglasses.model.dto.PaymentResDTO;
import com.example.backendglasses.service.impl.IAccountService;
import com.example.backendglasses.service.impl.IBookingService;
import com.example.backendglasses.service.impl.IMotobikeAccessoryService;
import com.example.backendglasses.service.impl.IStatusBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private IBookingService bookingService;
    @Autowired
    private IMotobikeAccessoryService motobikeAccessoryService;
    @Autowired
    private IStatusBookingService statusBookingService;
    @Autowired
    private IAccountService accountService;

    @GetMapping("/createPay")
    private ResponseEntity<String> payment(@RequestParam(value = "price", required = false) Long price,
                                           @RequestParam(value = "id", required = false) Long id) throws UnsupportedEncodingException {
        long amount = price * 100;
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        String bankCode = "NCB";
        String vnp_TxnRef = ConfigVNP.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = ConfigVNP.vnp_TmnCode;
        String vnp_ReturnUrl = "http://localhost:3000/payOk/" + id + "/";
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 5);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = ConfigVNP.hmacSHA512(ConfigVNP.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = ConfigVNP.vnp_PayUrl + "?" + queryUrl;
        PaymentResDTO paymentResDTO = new PaymentResDTO();
        paymentResDTO.setStatus("OK");
        paymentResDTO.setMessage("Success");
        paymentResDTO.setUrl(paymentUrl);
//        return ResponseEntity.status(HttpStatus.OK).body(paymentResDTO);
        return new ResponseEntity<>(paymentUrl, HttpStatus.OK);
    }

    @GetMapping("/payment_infor/{id}")
    public ResponseEntity<Boolean> handlePaymentInfo(
            @PathVariable Long id,
            @RequestParam(defaultValue = "") String status) {

        // Xử lý thông tin thanh toán ở đây
        System.out.println("ID Account: " + id);
        System.out.println(status);
        List<Booking> bookings = bookingService.getListPayment(id);
        LocalDateTime dateTime = LocalDateTime.now();
        User user = accountService.findById(id);
        Long price = bookingService.getAmountPriceCart(id);
        if (status.equals("00")) {
            for (Booking booking : bookings) {
                MotobikeAccessory motobikeAccessory = motobikeAccessoryService.findById(booking.getMotobikeAccessory().getId());
                motobikeAccessory.setQuantity(motobikeAccessory.getQuantity() - booking.getQuantity());
                motobikeAccessoryService.save(motobikeAccessory);
                booking.setStatusBooking(statusBookingService.findById(2L));
                booking.setStatusPayment(2);
                booking.setDateBooking(dateTime);
                booking.setTotalPrice(motobikeAccessory.getPrice());
                bookingService.save(booking);
            }
            accountService.sendMailBooking(user, bookings, price, true);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
}