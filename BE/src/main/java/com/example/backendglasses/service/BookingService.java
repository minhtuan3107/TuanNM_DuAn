package com.example.backendglasses.service;

import com.example.backendglasses.model.Booking;
import com.example.backendglasses.model.User;
import com.example.backendglasses.model.dto.HistoryBookingDTO;
import com.example.backendglasses.repository.BookingRepository;
import com.example.backendglasses.service.impl.IAccountService;
import com.example.backendglasses.service.impl.IBookingService;
import com.example.backendglasses.service.impl.IMotobikeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IMotobikeAccessoryService motobikeAccessoryService;

    @Override
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> checkLiveCart(Long idAccount, Long idAccessary) {
        return bookingRepository.checkLiveCart(idAccount, idAccessary);
    }

    @Override
    public List<Booking> getListPay(Long id) {
        return bookingRepository.getListPay(id);
    }

    @Override
    public List<Booking> getListPayment(Long id) {
        return bookingRepository.getListPayment(id);
    }

    @Override
    public List<Booking> detailsBooking(String dateTime, Long idAccount) {
        return bookingRepository.detailsBooking(dateTime, idAccount);
    }


    @Override
    public List<Booking> getCartByIdAccount(Long id) {
        return bookingRepository.getCart(id);
    }

    @Override
    public Long getAmountPriceCart(Long id) {
        return bookingRepository.getAmountPriceByAccountId(id);
    }

    @Override
    public void addToCard(Long idAccount, Long idAccessory) {
        bookingRepository.addToCard(idAccount, idAccessory);
    }

    @Override
    public void deleteCart(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public void updateQuantity(int quantity, Long idBooking) {
        bookingRepository.updateQuantity(quantity, idBooking);
    }

    @Override
    public Page<Booking> getListAndSearch(String name, Pageable pageable) {
        return bookingRepository.getBooking(name, pageable);
    }

    @Override
    public void save(Booking booking) {
        bookingRepository.save(booking);
    }

    @Override
    public Booking findById(Long id) { // tìm booking theo id
        return bookingRepository.findById(id).get();
    }

    @Override
    public List<Booking> checkBooking(Long idAccount, Long idAccessory) { // kiểm tra booking
        return bookingRepository.checkBooking(idAccount, idAccessory);
    }

    @Override
    public Booking findBookingByIdAccountAndIdAccessory(Long idAccount, Long idAccessory) { // tìm booking theo id tài khoản và id phụ tùng
        return bookingRepository.findBookingByIdAccountAndIdAccessory(idAccount, idAccessory);
    }


    @Override
    public Page<HistoryBookingDTO> getListBookingAccount(Long id, Pageable pageable) { // lấy danh sách booking theo tài khoản
        List<HistoryBookingDTO> resultList = bookingRepository.getListBookingFormat(id); // lấy danh sách booking theo tài khoản
        int start = (int) pageable.getOffset(); // bắt đầu
        int end = Math.min((start + pageable.getPageSize()), resultList.size()); // kết thúc
        Page<HistoryBookingDTO> page = new PageImpl<>(resultList.subList(start, end), pageable, resultList.size()); // phân trang
        return page;
    }


    @Override
    public Page<HistoryBookingDTO> getListBooking(Pageable pageable) { // lấy danh sách booking theo trang và số lượng
        List<HistoryBookingDTO> resultList = bookingRepository.getListBooking();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), resultList.size());
        Page<HistoryBookingDTO> page = new PageImpl<>(resultList.subList(start, end), pageable, resultList.size());
        return page;
    }

    @Override
    public List<Booking> detailBookingAdmin(String date) {
        return bookingRepository.detailBookingAdmin(date);
    }


}
