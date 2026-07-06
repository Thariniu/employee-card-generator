package com.employee.employeecardgenerator;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelService {

    public List<Employee> readExcel() {

        List<Employee> employees = new ArrayList<>();

        InputStream is = getClass().getClassLoader()
                .getResourceAsStream("Sample-Visiting-Card.xlsx");

        if (is == null) {
            throw new RuntimeException("Excel file not found in resources folder");
        }

        try (is; Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {

                Row row = sheet.getRow(i);
                if (row == null) continue;

                Employee emp = new Employee();

                emp.setName(get(row, 0));
                emp.setDesignation(get(row, 1));
                emp.setAddress(get(row, 2));
                emp.setEmail(get(row, 3));
                emp.setMobileNo(get(row, 4));
                emp.setQuantity((int) getNumber(row, 5));

                employees.add(emp);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return employees;
    }

    private String get(Row row, int i) {
        Cell cell = row.getCell(i);
        return cell == null ? "" : cell.toString().trim();
    }

    private double getNumber(Row row, int i) {
        Cell cell = row.getCell(i);
        return cell == null ? 0 : cell.getNumericCellValue();
    }
}
