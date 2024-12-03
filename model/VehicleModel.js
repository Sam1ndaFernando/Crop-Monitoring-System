export class VehicleModel {
    constructor(
        vehicleCode,
        licensePlateNumber,
        name,
        category,
        fuelType,
        status,
        remark,
        staff
    ) {
        this.VehicleCode = vehicleCode;
        this.LicensePlateNumber = licensePlateNumber;
        this.VehicleName = name;
        this.VehicleCategory = category;
        this.VehicleFuelType = fuelType;
        this.VehicleStatus = status;
        this.VehicleRemark = remark;
        this.Staff = staff;  // Reference to the StaffEntity model
    }

    // Getter and Setter for VehicleCode
    getVehicleCode() {
        return this.VehicleCode;
    }

    setVehicleCode(vehicleCode) {
        this.VehicleCode = vehicleCode;
    }

    // Getter and Setter for LicensePlateNumber
    getLicensePlateNumber() {
        return this.LicensePlateNumber;
    }

    setLicensePlateNumber(licensePlateNumber) {
        this.LicensePlateNumber = licensePlateNumber;
    }

    // Getter and Setter for VehicleName
    getVehicleName() {
        return this.VehicleName;
    }

    setVehicleName(name) {
        this.VehicleName = name;
    }

    // Getter and Setter for VehicleCategory
    getVehicleCategory() {
        return this.VehicleCategory;
    }

    setVehicleCategory(category) {
        this.VehicleCategory = category;
    }

    // Getter and Setter for VehicleFuelType
    getVehicleFuelType() {
        return this.VehicleFuelType;
    }

    setVehicleFuelType(fuelType) {
        this.VehicleFuelType = fuelType;
    }

    // Getter and Setter for VehicleStatus
    getVehicleStatus() {
        return this.VehicleStatus;
    }

    setVehicleStatus(status) {
        this.VehicleStatus = status;
    }

    // Getter and Setter for VehicleRemark
    getVehicleRemark() {
        return this.VehicleRemark;
    }

    setVehicleRemark(remark) {
        this.VehicleRemark = remark;
    }

    // Getter and Setter for Staff
    getStaff() {
        return this.Staff;
    }

    setStaff(staff) {
        this.Staff = staff;
    }
}
