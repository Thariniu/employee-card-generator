package com.employee.employeecardgenerator;

import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelService package org.example;

import org.apache.poi.ss.usermodel.*;
        import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {

    public List<Employee> readExcel() {

        List<Employee> employees = new ArrayList<>();

        try {
            InputStream is = getClass().getClassLoader()
                    .getResourceAsStream("employees.xlsx");

            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {

                Row row = sheet.getRow(i);

                Employee emp = new Employee();

                emp.setId((int) row.getCell(0).getNumericCellValue());
                emp.setName(row.getCell(1).getStringCellValue());
                emp.setEmail(row.getCell(2).getStringCellValue());

                employees.add(emp);
            }

            workbook.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return employees;
    }
}{
}
