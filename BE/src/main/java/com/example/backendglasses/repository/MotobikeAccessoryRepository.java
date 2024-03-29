package com.example.backendglasses.repository;

import com.example.backendglasses.model.MotobikeAccessory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MotobikeAccessoryRepository extends JpaRepository<MotobikeAccessory, Long> {
    @Query(value = "select * from motobike_accessory where motobike_accessory.is_deleted = 0 order by motobike_accessory.date desc limit 10", nativeQuery = true)
    List<MotobikeAccessory> getListNew();

    @Query(value = "SELECT ma.* FROM motobike_accessory ma JOIN ( SELECT motobike_accessory_id, COUNT(*) AS booking_count FROM booking GROUP BY motobike_accessory_id ORDER BY booking_count DESC LIMIT 3) AS max_booking ON max_booking.motobike_accessory_id = ma.id; ", nativeQuery = true)
    List<MotobikeAccessory> getListHot();

    @Query(value = "select * from motobike_accessory where motobike_accessory.name like :name and motobike_accessory.is_deleted = 0", nativeQuery = true)
    List<MotobikeAccessory> getListNewAll(@Param("name") String name);

    @Query(value = "SELECT ma.* FROM motobike_accessory ma " +
            "JOIN type_accessory ta ON ma.type_accessory_id = ta.id " +
            "WHERE ma.is_deleted = 0 AND (ma.name LIKE :name OR ta.name LIKE :name) " +
            "GROUP BY ma.id",
            countQuery = "SELECT COUNT(*) FROM motobike_accessory ma " +
                    "JOIN type_accessory ta ON ma.type_accessory_id = ta.id " +
                    "WHERE ma.is_deleted = 0 AND (ma.name LIKE :name OR ta.name LIKE :name) " +
                    "GROUP BY ma.id",
            nativeQuery = true)
    Page<MotobikeAccessory> getAllAndSearch(@Param("name") String name, Pageable pageable);

}
