package org.example.be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "motobikeAccessory_id", referencedColumnName = "id")
    private MotobikeAccessory motobikeAccessory;
    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    private LocalDateTime dateBooking;
    @ManyToOne
    @JoinColumn(name = "statusBooking_id", referencedColumnName = "id")
    private StatusBooking statusBooking;
    private Long totalPrice;
    private int quantity;
    @Column(columnDefinition = "boolean default false")
    private Boolean status = false;
}
