export class EquipmentModel {

    constructor(equipmentCode, name, type, status, availableCount, staffCodeList = [], fieldList = []) {
        this._equipmentCode = equipmentCode;
        this._name = name;
        this._type = type;
        this._status = status;
        this._availableCount = availableCount;
        this._staffCodeList = staffCodeList;
        this._fieldList = fieldList;
    }

    get equipmentCode() {
        return this._equipmentCode;
    }

    set equipmentCode(value) {
        this._equipmentCode = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get availableCount() {
        return this._availableCount;
    }

    set availableCount(value) {
        this._availableCount = value;
    }

    get staffCodeList() {
        return this._staffCodeList;
    }

    set staffCodeList(value) {
        this._staffCodeList = value;
    }

    get fieldList() {
        return this._fieldList;
    }

    set fieldList(value) {
        this._fieldList = value;
    }
}
