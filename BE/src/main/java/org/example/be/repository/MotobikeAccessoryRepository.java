package org.example.be.repository;

import org.example.be.model.MotobikeAccessory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MotobikeAccessoryRepository extends JpaRepository<MotobikeAccessory,Long> {
    @Query(value = "select * from motobike_accessory\n" +
            "where is_delete = 0 order by motobike_accessory.date desc", nativeQuery = true)
    List<MotobikeAccessory> getListNew();

  @Query(value = "select * from motobike_accessory\n" +
            "order by motobike_accessory.date desc", nativeQuery = true)
    List<MotobikeAccessory> getListNew1();


}
