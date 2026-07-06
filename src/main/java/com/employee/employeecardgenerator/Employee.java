package com.employee.employeecardgenerator;



public class Employee {

    private String name;
    private String designation;
    private String address;
    private String email;
    private String mobileNo;
    private int quantity;

    public Employee() {
    }

    public Employee(String name, String designation, String address,
                    String email, String mobileNo, int quantity) {
        this.name = name;
        this.designation = designation;
        this.address = address;
        this.email = email;
        this.mobileNo = mobileNo;
        this.quantity = quantity;
    }

    // getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", designation='" + designation + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", mobileNo='" + mobileNo + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}