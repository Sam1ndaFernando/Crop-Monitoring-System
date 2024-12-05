export class EquipmentModel {
    constructor(equipmentCode, name, type, status, availableCount, staffCodeList = [], fieldList = []) {
        this.Code = equipmentCode;
        this.equiName = name;
        this.equipmentType = type;
        this.equipmentStatus = status;
        this.availableCount = availableCount;
        this.staffCodeList = staffCodeList;
        this.fieldList = fieldList;
    }

    // Getter and Setter for equipmentCode
    getEquipmentCode() {
        return this.Code;
    }

    setEquipmentCode(equipmentCode) {
        this.Code = equipmentCode;
    }

    // Getter and Setter for equipmentName
    getEquipmentName() {
        return this.equiName;
    }

    setEquipmentName(name) {
        this.equiName = name;
    }

    // Getter and Setter for equipmentType
    getEquipmentType() {
        return this.equipmentType;
    }

    setEquipmentType(type) {
        this.equipmentType = type;
    }

    // Getter and Setter for equipmentStatus
    getEquipmentStatus() {
        return this.equipmentStatus;
    }

    setEquipmentStatus(status) {
        this.equipmentStatus = status;
    }

    // Getter and Setter for availableCount
    getAvailableCount() {
        return this.availableCount;
    }

    setAvailableCount(availableCount) {
        this.availableCount = availableCount;
    }

    // Getter and Setter for staffCodeList
    getStaffCodeList() {
        return this.staffCodeList;
    }

    setStaffCodeList(staffCodeList) {
        this.staffCodeList = staffCodeList;
    }

    // Getter and Setter for fieldList
    getFieldList() {
        return this.fieldList;
    }

    setFieldList(fieldList) {
        this.fieldList = fieldList;
    }
}
