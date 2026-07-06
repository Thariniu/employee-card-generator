package com.employee.employeecardgenerator;

import java.util.ArrayList;
import java.util.List;

public class Validation {

    public static List<String> validate(Employee emp) {

        List<String> errors = new ArrayList<>();

        // NAME
        if (emp.getName() == null || emp.getName().trim().isEmpty()) {
            errors.add("Invalid Name");
        }

        // DESIGNATION
        if (emp.getDesignation() == null || emp.getDesignation().trim().isEmpty()) {
            errors.add("Invalid Designation");
        }

        // ADDRESS
        if (emp.getAddress() == null || emp.getAddress().trim().length() < 5) {
            errors.add("Invalid Address");
        }

        // EMAIL
        if (emp.getEmail() == null ||
                !emp.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            errors.add("Invalid Email");
        }

        // MOBILE
        if (emp.getMobileNo() == null || emp.getMobileNo().trim().isEmpty()) {
            errors.add("Invalid Mobile");
        } else {

            String mobile = emp.getMobileNo()
                    .replaceAll("\\u00A0", "")   // remove hidden Excel spaces
                    .trim()
                    .replaceAll("[^0-9]", "");   // keep only digits

            if (mobile.length() == 12 && mobile.startsWith("91")) {
                mobile = mobile.substring(2); // remove country code if present
            }

            if (mobile.length() != 10) {
                errors.add("Invalid Mobile");
            }
        }

        // QUANTITY
        if (emp.getQuantity() <= 0) {
            errors.add("Invalid Quantity");
        }

        return errors;
    }
}