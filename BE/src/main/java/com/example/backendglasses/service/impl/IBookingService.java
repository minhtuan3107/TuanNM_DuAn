package com.example.backendglasses.service.impl;

import com.example.backendglasses.model.Booking;
import com.example.backendglasses.model.dto.HistoryBookingDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBookingService {

    List<Booking> checkLiveCart(Long idAccount, Long idAccessary);

    List<Booking> getListPay(Long id);

    List<Booking> detailsBooking(String dateTime, Long idAccount);

    List<Booking> getCartByIdAccount(Long id);

    Long getAmountPriceCart(Long id);

    void addToCard(Long idAccount, Long idAccessory);

    void deleteCart(Long id);

    void updateQuantity(int quantity, Long idBooking);

    Page<Booking> getListAndSearch(String name, Pageable pageable);

    void save(Booking booking);

    Booking findById(Long id);

    List<Booking> checkBooking(Long idAccount, Long idAccessory);

    Booking findBookingByIdAccountAndIdAccessory(Long idAccount, Long idAccessory);

    List<HistoryBookingDTO> getListBookingFormat(Long id);

    List<HistoryBookingDTO> getListBooking();

    List<Booking> detailBookingAdmin(String date);

}