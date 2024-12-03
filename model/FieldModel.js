export class FieldModel {
    constructor(fieldCode, name, location, extentSize, fieldImage1, fieldImage2, equipmentsList = [], staffList = [], logList = [], cropList = []) {
        this.FieldCode = fieldCode;
        this.FieldName = name;
        this.FieldLocation = location;
        this.FieldExtentSize = extentSize;
        this.FieldImage1 = fieldImage1;
        this.FieldImage2 = fieldImage2;
        this.EquipmentsList = equipmentsList;
        this.StaffList = staffList;
        this.LogList = logList;
        this.CropList = cropList;
    }

    // Getter and Setter for FieldCode
    getFieldCode() {
        return this.FieldCode;
    }

    setFieldCode(fieldCode) {
        this.FieldCode = fieldCode;
    }

    // Getter and Setter for FieldName
    getFieldName() {
        return this.FieldName;
    }

    setFieldName(name) {
        this.FieldName = name;
    }

    // Getter and Setter for FieldLocation
    getFieldLocation() {
        return this.FieldLocation;
    }

    setFieldLocation(location) {
        this.FieldLocation = location;
    }

    // Getter and Setter for FieldExtentSize
    getFieldExtentSize() {
        return this.FieldExtentSize;
    }

    setFieldExtentSize(extentSize) {
        this.FieldExtentSize = extentSize;
    }

    // Getter and Setter for FieldImage1
    getFieldImage1() {
        return this.FieldImage1;
    }

    setFieldImage1(fieldImage1) {
        this.FieldImage1 = fieldImage1;
    }

    // Getter and Setter for FieldImage2
    getFieldImage2() {
        return this.FieldImage2;
    }

    setFieldImage2(fieldImage2) {
        this.FieldImage2 = fieldImage2;
    }

    // Getter and Setter for EquipmentsList
    getEquipmentsList() {
        return this.EquipmentsList;
    }

    setEquipmentsList(equipmentsList) {
        this.EquipmentsList = equipmentsList;
    }

    // Getter and Setter for StaffList
    getStaffList() {
        return this.StaffList;
    }

    setStaffList(staffList) {
        this.StaffList = staffList;
    }

    // Getter and Setter for LogList
    getLogList() {
        return this.LogList;
    }

    setLogList(logList) {
        this.LogList = logList;
    }

    // Getter and Setter for CropList
    getCropList() {
        return this.CropList;
    }

    setCropList(cropList) {
        this.CropList = cropList;
    }
}
