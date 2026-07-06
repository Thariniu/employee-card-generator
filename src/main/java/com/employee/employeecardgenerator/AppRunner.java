package com.employee.employeecardgenerator;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AppRunner implements CommandLineRunner {

    @Override
    public void run(String... args) {

        ExcelService excelService = new ExcelService();
        List<Employee> employees = excelService.readExcel();

        for (int i = 0; i < employees.size(); i++) {

            Employee emp = employees.get(i);
            int rowNo = i + 2; // +2 because Excel row 1 is header, row starts from 1

            List<String> errors = Validation.validate(emp);

            if (!errors.isEmpty()) {

                String name = emp.getName();

                if (name == null || name.trim().isEmpty()) {
                    name = "[EMPTY NAME]";
                }

                System.out.println("ROW " + rowNo + " → " + name);
                System.out.println(errors);
                System.out.println(); // spacing
            }
        }
    }
}