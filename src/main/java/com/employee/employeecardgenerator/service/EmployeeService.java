package com.employee.employeecardgenerator.service;

import com.employee.employeecardgenerator.entity.Employee;
import com.employee.employeecardgenerator.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create Employee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get Employee By ID
    public Employee getEmployeeById(Integer id) {
        return employeeRepository.findById(id).orElse(null);
    }

    // Update Employee
    public Employee updateEmployee(Integer id, Employee employee) {

        Employee existingEmployee = employeeRepository.findById(id).orElse(null);

        if (existingEmployee != null) {
            existingEmployee.setName(employee.getName());
            existingEmployee.setDesignation(employee.getDesignation());
            existingEmployee.setAddress(employee.getAddress());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setMobileNo(employee.getMobileNo());
            existingEmployee.setQuantity(employee.getQuantity());

            return employeeRepository.save(existingEmployee);
        }

        return null;
    }

    // Delete Employee
    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }
}