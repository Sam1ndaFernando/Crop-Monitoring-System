export class StaffModel {
    constructor(
        memberCode,
        firstName,
        lastName,
        joinedDate,
        dateOfBirth,
        gender,
        designation,
        addressLine1,
        addressLine2,
        addressLine3,
        addressLine4,
        addressLine5,
        contactNo,
        email,
        role,
        vehicleList = [],
        fieldList = [],
        logList = [],
        equipmentList = []
    ) {
        this.MemberCode = memberCode;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.JoinedDate = joinedDate;
        this.DateOfBirth = dateOfBirth;
        this.Gender = gender;
        this.Designation = designation;
        this.AddressLine1 = addressLine1;
        this.AddressLine2 = addressLine2;
        this.AddressLine3 = addressLine3;
        this.AddressLine4 = addressLine4;
        this.AddressLine5 = addressLine5;
        this.ContactNo = contactNo;
        this.Email = email;
        this.Role = role;
        this.VehicleList = vehicleList;
        this.FieldList = fieldList;
        this.LogList = logList;
        this.EquipmentList = equipmentList;
    }

    // Getter and Setter for MemberCode
    getMemberCode() {
        return this.MemberCode;
    }

    setMemberCode(memberCode) {
        this.MemberCode = memberCode;
    }

    // Getter and Setter for FirstName
    getFirstName() {
        return this.FirstName;
    }

    setFirstName(firstName) {
        this.FirstName = firstName;
    }

    // Getter and Setter for LastName
    getLastName() {
        return this.LastName;
    }

    setLastName(lastName) {
        this.LastName = lastName;
    }

    // Getter and Setter for JoinedDate
    getJoinedDate() {
        return this.JoinedDate;
    }

    setJoinedDate(joinedDate) {
        this.JoinedDate = joinedDate;
    }

    // Getter and Setter for DateOfBirth
    getDateOfBirth() {
        return this.DateOfBirth;
    }

    setDateOfBirth(dateOfBirth) {
        this.DateOfBirth = dateOfBirth;
    }

    // Getter and Setter for Gender
    getGender() {
        return this.Gender;
    }

    setGender(gender) {
        this.Gender = gender;
    }

    // Getter and Setter for Designation
    getDesignation() {
        return this.Designation;
    }

    setDesignation(designation) {
        this.Designation = designation;
    }

    // Getter and Setter for AddressLine1
    getAddressLine1() {
        return this.AddressLine1;
    }

    setAddressLine1(addressLine1) {
        this.AddressLine1 = addressLine1;
    }

    // Getter and Setter for AddressLine2
    getAddressLine2() {
        return this.AddressLine2;
    }

    setAddressLine2(addressLine2) {
        this.AddressLine2 = addressLine2;
    }

    // Getter and Setter for AddressLine3
    getAddressLine3() {
        return this.AddressLine3;
    }

    setAddressLine3(addressLine3) {
        this.AddressLine3 = addressLine3;
    }

    // Getter and Setter for AddressLine4
    getAddressLine4() {
        return this.AddressLine4;
    }

    setAddressLine4(addressLine4) {
        this.AddressLine4 = addressLine4;
    }

    // Getter and Setter for AddressLine5
    getAddressLine5() {
        return this.AddressLine5;
    }

    setAddressLine5(addressLine5) {
        this.AddressLine5 = addressLine5;
    }

    // Getter and Setter for ContactNo
    getContactNo() {
        return this.ContactNo;
    }

    setContactNo(contactNo) {
        this.ContactNo = contactNo;
    }

    // Getter and Setter for Email
    getEmail() {
        return this.Email;
    }

    setEmail(email) {
        this.Email = email;
    }

    // Getter and Setter for Role
    getRole() {
        return this.Role;
    }

    setRole(role) {
        this.Role = role;
    }

    // Getter and Setter for VehicleList
    getVehicleList() {
        return this.VehicleList;
    }

    setVehicleList(vehicleList) {
        this.VehicleList = vehicleList;
    }

    // Getter and Setter for FieldList
    getFieldList() {
        return this.FieldList;
    }

    setFieldList(fieldList) {
        this.FieldList = fieldList;
    }

    // Getter and Setter for LogList
    getLogList() {
        return this.LogList;
    }

    setLogList(logList) {
        this.LogList = logList;
    }

    // Getter and Setter for EquipmentList
    getEquipmentList() {
        return this.EquipmentList;
    }

    setEquipmentList(equipmentList) {
        this.EquipmentList = equipmentList;
    }
}
