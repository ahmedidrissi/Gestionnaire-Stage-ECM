package com.example.gestionnairestageecm.controllers;

import com.example.gestionnairestageecm.models.Tutor;
import com.example.gestionnairestageecm.services.TutorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api/v1/Tutors")
@RestController
@AllArgsConstructor
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @GetMapping("/list")
    public List<Tutor> getAllTutors() {
        return tutorService.getAllTutors();
    }

    @GetMapping("/number={tutorNumber}")
    public Tutor getTutorById(@PathVariable Long tutorNumber) {
        return tutorService.getTutorById(tutorNumber);
    }

    @GetMapping("/name={firstName}+{lastName}")
    public Tutor getTutorByName(@PathVariable String firstName, @PathVariable String lastName) {
        return tutorService.getTutorByFirstNameAndLastName(firstName, lastName);
    }

    @PostMapping("/new")
    public void saveTutor(@RequestBody Tutor Tutor) {
        tutorService.saveTutor(Tutor);
    }


    @PutMapping("/update/number={tutorNumber}")
    public void updateTutor(@PathVariable Long tutorNumber, @RequestBody Tutor newTutor) {
        tutorService.updateTutor(tutorNumber, newTutor);
    }

    @DeleteMapping("/delete/number={tutorNumber}")
    public void deleteTutor(@PathVariable Long tutorNumber) {
        tutorService.deleteTutor(tutorNumber);
    } 
    
}