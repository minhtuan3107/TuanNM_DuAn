package com.example.backendglasses.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MotobikeAccessory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String img;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "typeAccessory_id", referencedColumnName = "id")
    private TypeAccessory typeAccessory;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    private Long price;
    private LocalDate date;
}
