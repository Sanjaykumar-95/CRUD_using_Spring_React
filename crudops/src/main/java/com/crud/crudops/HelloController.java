package com.crud.crudops;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/student")
public class HelloController {

    @Autowired
    private StudentServices studentServices;

    @RequestMapping(value = "/hello")
    public String hello(){
        return "Hello World";
    }

    @PostMapping(value = "/save")
    private String saveStudent(@RequestBody Student students){
        studentServices.saveorUpdate(students);
        return students.get_id();
    }

    @GetMapping(value = "/getAll")
    private Iterable<Student>getStudents(){
        return studentServices.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    private Student update(@RequestBody Student student,@PathVariable(name = "id")String _id){
        student.set_id(_id);
        studentServices.saveorUpdate(student);
        return student;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteStudent(@PathVariable("id")String _id){
        studentServices.deleteStudent(_id);
    }

    @RequestMapping("/student/{id}")
    private Student getStudent(@PathVariable(name = "id")String studentid){
        return studentServices.getStudentById(studentid);
    }
    
}
