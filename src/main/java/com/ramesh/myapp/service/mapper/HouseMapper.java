package com.ramesh.myapp.service.mapper;

import com.ramesh.myapp.domain.*;
import com.ramesh.myapp.service.dto.HouseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity House and its DTO HouseDTO.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface HouseMapper extends EntityMapper<HouseDTO, House> {

    @Mapping(source = "employee.id", target = "employeeId")
    HouseDTO toDto(House house);

    @Mapping(source = "employeeId", target = "employee")
    House toEntity(HouseDTO houseDTO);

    default House fromId(Long id) {
        if (id == null) {
            return null;
        }
        House house = new House();
        house.setId(id);
        return house;
    }
}
