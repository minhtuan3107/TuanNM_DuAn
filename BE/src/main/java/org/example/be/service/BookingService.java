package org.example.be.service;

import org.example.be.model.Booking;
import org.example.be.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public List<Booking> getListByIdAccount(Long id) {
        return bookingRepository.getListBookingByIdAccount(id);
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
    public Booking findById(Long id) {
        return bookingRepository.findById(id).get();
    }

    @Override
    public List<Booking> checkBooking(Long idAccount, Long idAccessory) {
        return bookingRepository.checkBooking(idAccount, idAccessory);
    }

    @Override
    public Booking findBookingByIdAccountAndIdAccessory(Long idAccount, Long idAccessory) {
        return bookingRepository.findBookingByIdAccountAndIdAccessory(idAccount,idAccessory);
    }


}
