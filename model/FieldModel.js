export class FieldModel {
    constructor(
        fieldCode,
        name,
        location,
        extentSize = 0,
        fieldImage1 = null,
        fieldImage2 = null,
        equipmentsList = [],
        staffList = [],
        logList = [],
        cropList = []
    ) {
        this._fieldCode = fieldCode;
        this._name = name;
        this._location = location;
        this._extentSize = extentSize;
        this._fieldImage1 = fieldImage1;
        this._fieldImage2 = fieldImage2;
        this._equipmentsList = Array.isArray(equipmentsList) ? equipmentsList : [];
        this._staffList = Array.isArray(staffList) ? staffList : [];
        this._logList = Array.isArray(logList) ? logList : [];
        this._cropList = Array.isArray(cropList) ? cropList : [];
    }

    // Field code
    get fieldCode() {
        return this._fieldCode;
    }
    set fieldCode(value) {
        if (!value) throw new Error("Field code is required.");
        this._fieldCode = value;
    }

    // Name
    get name() {
        return this._name;
    }
    set name(value) {
        if (!value) throw new Error("Field name is required.");
        this._name = value;
    }

    // Location
    get location() {
        return this._location;
    }
    set location(value) {
        if (!value) throw new Error("Field location is required.");
        this._location = value;
    }

    // Extent size
    get extentSize() {
        return this._extentSize;
    }
    set extentSize(value) {
        if (isNaN(value) || value < 0) throw new Error("Extent size must be a non-negative number.");
        this._extentSize = value;
    }

    // Field images
    get fieldImage1() {
        return this._fieldImage1;
    }
    set fieldImage1(value) {
        this._fieldImage1 = value;
    }

    get fieldImage2() {
        return this._fieldImage2;
    }
    set fieldImage2(value) {
        this._fieldImage2 = value;
    }

    // Equipments list
    get equipmentsList() {
        return this._equipmentsList;
    }
    set equipmentsList(value) {
        if (!Array.isArray(value)) throw new Error("Equipments list must be an array.");
        this._equipmentsList = value;
    }

    addEquipment(equipment) {
        this._equipmentsList.push(equipment);
    }

    removeEquipment(equipmentCode) {
        this._equipmentsList = this._equipmentsList.filter(
            (equipment) => equipment.equipmentCode !== equipmentCode
        );
    }

    // Staff list
    get staffList() {
        return this._staffList;
    }
    set staffList(value) {
        if (!Array.isArray(value)) throw new Error("Staff list must be an array.");
        this._staffList = value;
    }

    addStaff(staff) {
        this._staffList.push(staff);
    }

    removeStaff(staffCode) {
        this._staffList = this._staffList.filter((staff) => staff.staffCode !== staffCode);
    }

    // Log list
    get logList() {
        return this._logList;
    }
    set logList(value) {
        if (!Array.isArray(value)) throw new Error("Log list must be an array.");
        this._logList = value;
    }

    addLog(log) {
        this._logList.push(log);
    }

    // Crop list
    get cropList() {
        return this._cropList;
    }
    set cropList(value) {
        if (!Array.isArray(value)) throw new Error("Crop list must be an array.");
        this._cropList = value;
    }

    addCrop(crop) {
        this._cropList.push(crop);
    }
}
