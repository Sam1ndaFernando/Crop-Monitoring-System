export class LogModel {
    constructor(logCode, date, logDetails, observedImage, staffList = [], cropList = [], fieldList = []) {
        this._logCode = logCode;
        this._date = date;
        this._logDetails = logDetails;
        this._observedImage = observedImage;
        this._staffList = staffList;
        this._cropList = cropList;
        this._fieldList = fieldList;
    }

    get logCode() {
        return this._logCode;
    }

    get date() {
        return this._date;
    }

    get logDetails() {
        return this._logDetails;
    }

    get observedImage() {
        return this._observedImage;
    }

    get staffList() {
        return this._staffList;
    }

    get cropList() {
        return this._cropList;
    }

    get fieldList() {
        return this._fieldList;
    }
}
