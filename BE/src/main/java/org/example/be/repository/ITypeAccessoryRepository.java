package org.example.be.repository;

import org.example.be.model.TypeAccessory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITypeAccessoryRepository extends JpaRepository<TypeAccessory, Long> {
    @Query(value = "SELECT type_accessory.* FROM type_accessory JOIN motobike_accessory ON type_accessory.id = motobike_accessory.type_accessory_id GROUP BY type_accessory.id limit 8;", nativeQuery = true)
    List<TypeAccessory> getTypeAccessories();


}
