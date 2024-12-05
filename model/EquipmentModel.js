export class EquipmentModel {
    constructor(equipmentCode, name, type, status, availableCount, staffCodeList = [], fieldList = []) {
        this.equipmentCode = equipmentCode;
        this.name = name;
        this.type = type;
        this.status = status;
        this.availableCount = availableCount;
        this.staffCodeList = staffCodeList;
        this.fieldList = fieldList;
    }

    // Getter and Setter for equipmentCode
    get equipmentCode() {
        return this._equipmentCode;
    }

    set equipmentCode(value) {
        this._equipmentCode = value;
    }

    // Getter and Setter for name
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    // Getter and Setter for type
    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    // Getter and Setter for status
    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    // Getter and Setter for availableCount
    get availableCount() {
        return this._availableCount;
    }

    set availableCount(value) {
        this._availableCount = value;
    }

    // Getter and Setter for staffCodeList
    get staffCodeList() {
        return this._staffCodeList;
    }

    set staffCodeList(value) {
        this._staffCodeList = value;
    }

    // Getter and Setter for fieldList
    get fieldList() {
        return this._fieldList;
    }

    set fieldList(value) {
        this._fieldList = value;
    }
}
