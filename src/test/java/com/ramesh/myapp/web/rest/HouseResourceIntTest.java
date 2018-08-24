package com.ramesh.myapp.web.rest;

import com.ramesh.myapp.YApp;

import com.ramesh.myapp.domain.House;
import com.ramesh.myapp.repository.HouseRepository;
import com.ramesh.myapp.service.HouseService;
import com.ramesh.myapp.service.dto.HouseDTO;
import com.ramesh.myapp.service.mapper.HouseMapper;
import com.ramesh.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.ramesh.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HouseResource REST controller.
 *
 * @see HouseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = YApp.class)
public class HouseResourceIntTest {

    private static final Integer DEFAULT_HOUSE_NUM = 1;
    private static final Integer UPDATED_HOUSE_NUM = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private HouseRepository houseRepository;


    @Autowired
    private HouseMapper houseMapper;
    

    @Autowired
    private HouseService houseService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHouseMockMvc;

    private House house;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HouseResource houseResource = new HouseResource(houseService);
        this.restHouseMockMvc = MockMvcBuilders.standaloneSetup(houseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static House createEntity(EntityManager em) {
        House house = new House()
            .houseNum(DEFAULT_HOUSE_NUM)
            .name(DEFAULT_NAME);
        return house;
    }

    @Before
    public void initTest() {
        house = createEntity(em);
    }

    @Test
    @Transactional
    public void createHouse() throws Exception {
        int databaseSizeBeforeCreate = houseRepository.findAll().size();

        // Create the House
        HouseDTO houseDTO = houseMapper.toDto(house);
        restHouseMockMvc.perform(post("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(houseDTO)))
            .andExpect(status().isCreated());

        // Validate the House in the database
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeCreate + 1);
        House testHouse = houseList.get(houseList.size() - 1);
        assertThat(testHouse.getHouseNum()).isEqualTo(DEFAULT_HOUSE_NUM);
        assertThat(testHouse.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createHouseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = houseRepository.findAll().size();

        // Create the House with an existing ID
        house.setId(1L);
        HouseDTO houseDTO = houseMapper.toDto(house);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHouseMockMvc.perform(post("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(houseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the House in the database
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHouses() throws Exception {
        // Initialize the database
        houseRepository.saveAndFlush(house);

        // Get all the houseList
        restHouseMockMvc.perform(get("/api/houses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(house.getId().intValue())))
            .andExpect(jsonPath("$.[*].houseNum").value(hasItem(DEFAULT_HOUSE_NUM)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getHouse() throws Exception {
        // Initialize the database
        houseRepository.saveAndFlush(house);

        // Get the house
        restHouseMockMvc.perform(get("/api/houses/{id}", house.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(house.getId().intValue()))
            .andExpect(jsonPath("$.houseNum").value(DEFAULT_HOUSE_NUM))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingHouse() throws Exception {
        // Get the house
        restHouseMockMvc.perform(get("/api/houses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHouse() throws Exception {
        // Initialize the database
        houseRepository.saveAndFlush(house);

        int databaseSizeBeforeUpdate = houseRepository.findAll().size();

        // Update the house
        House updatedHouse = houseRepository.findById(house.getId()).get();
        // Disconnect from session so that the updates on updatedHouse are not directly saved in db
        em.detach(updatedHouse);
        updatedHouse
            .houseNum(UPDATED_HOUSE_NUM)
            .name(UPDATED_NAME);
        HouseDTO houseDTO = houseMapper.toDto(updatedHouse);

        restHouseMockMvc.perform(put("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(houseDTO)))
            .andExpect(status().isOk());

        // Validate the House in the database
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeUpdate);
        House testHouse = houseList.get(houseList.size() - 1);
        assertThat(testHouse.getHouseNum()).isEqualTo(UPDATED_HOUSE_NUM);
        assertThat(testHouse.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingHouse() throws Exception {
        int databaseSizeBeforeUpdate = houseRepository.findAll().size();

        // Create the House
        HouseDTO houseDTO = houseMapper.toDto(house);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restHouseMockMvc.perform(put("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(houseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the House in the database
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHouse() throws Exception {
        // Initialize the database
        houseRepository.saveAndFlush(house);

        int databaseSizeBeforeDelete = houseRepository.findAll().size();

        // Get the house
        restHouseMockMvc.perform(delete("/api/houses/{id}", house.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(House.class);
        House house1 = new House();
        house1.setId(1L);
        House house2 = new House();
        house2.setId(house1.getId());
        assertThat(house1).isEqualTo(house2);
        house2.setId(2L);
        assertThat(house1).isNotEqualTo(house2);
        house1.setId(null);
        assertThat(house1).isNotEqualTo(house2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HouseDTO.class);
        HouseDTO houseDTO1 = new HouseDTO();
        houseDTO1.setId(1L);
        HouseDTO houseDTO2 = new HouseDTO();
        assertThat(houseDTO1).isNotEqualTo(houseDTO2);
        houseDTO2.setId(houseDTO1.getId());
        assertThat(houseDTO1).isEqualTo(houseDTO2);
        houseDTO2.setId(2L);
        assertThat(houseDTO1).isNotEqualTo(houseDTO2);
        houseDTO1.setId(null);
        assertThat(houseDTO1).isNotEqualTo(houseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(houseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(houseMapper.fromId(null)).isNull();
    }
}
