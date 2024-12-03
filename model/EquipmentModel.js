export class EquipmentModel {

    constructor(equipmentCode, name, type, status, availableCount, staffCodeList = [], fieldList = []) {
        this.EquipmentCode = equipmentCode;
        this.Equipmentname = name;
        this.EquipmenType = type;
        this.EquipmenStatus = status;
        this.EquipmentAvailableCount = availableCount;
        this.EquipmentStaffCodeList = staffCodeList;
        this.EquipmentFieldList = fieldList;
    }

    // Getter and Setter for EquipmentCode
    getEquipmentCode() {
        return this.EquipmentCode;
    }

    setEquipmentCode(equipmentCode) {
        this.EquipmentCode = equipmentCode;
    }

    // Getter and Setter for Equipmentname
    getEquipmentname() {
        return this.Equipmentname;
    }

    setEquipmentname(name) {
        this.Equipmentname = name;
    }

    // Getter and Setter for EquipmenType
    getEquipmenType() {
        return this.EquipmenType;
    }

    setEquipmenType(type) {
        this.EquipmenType = type;
    }

    // Getter and Setter for EquipmenStatus
    getEquipmenStatus() {
        return this.EquipmenStatus;
    }

    setEquipmenStatus(status) {
        this.EquipmenStatus = status;
    }

    // Getter and Setter for EquipmentAvailableCount
    getEquipmentAvailableCount() {
        return this.EquipmentAvailableCount;
    }

    setEquipmentAvailableCount(availableCount) {
        this.EquipmentAvailableCount = availableCount;
    }

    // Getter and Setter for EquipmentStaffCodeList
    getEquipmentStaffCodeList() {
        return this.EquipmentStaffCodeList;
    }

    setEquipmentStaffCodeList(staffCodeList) {
        this.EquipmentStaffCodeList = staffCodeList;
    }

    // Getter and Setter for EquipmentFieldList
    getEquipmentFieldList() {
        return this.EquipmentFieldList;
    }

    setEquipmentFieldList(fieldList) {
        this.EquipmentFieldList = fieldList;
    }
}
