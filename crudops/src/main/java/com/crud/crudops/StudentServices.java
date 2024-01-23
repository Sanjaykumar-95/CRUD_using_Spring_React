package com.crud.crudops;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServices {
    
    @Autowired
    private StudentRepo repo;

    public void saveorUpdate(Student students) {
        repo.save(students);
    }

    public Iterable<Student> listAll() {
        return this.repo.findAll();
    }

    public void deleteStudent(String _id) {
        repo.deleteById(_id);
    }

    public Student getStudentById(String studentid) {
        return repo.findById(studentid).get();
    }
    
}
