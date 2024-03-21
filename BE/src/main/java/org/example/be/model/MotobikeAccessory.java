package org.example.be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
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
