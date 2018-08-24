package com.ramesh.myapp.repository;

import com.ramesh.myapp.domain.House;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the House entity.
 */
@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
	List<House> getAllHouseByHouseNum(Integer houseNum);

}
