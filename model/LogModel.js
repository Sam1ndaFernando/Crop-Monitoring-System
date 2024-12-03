export class LogModel {
    constructor(logCode, date, logDetails, observedImage, staffList = [], cropList = [], fieldList = []) {
        this.LogCode = logCode;
        this.Logdate = date;
        this.LogDetails = logDetails;
        this.ObservedImage = observedImage;
        this.StaffList = staffList;
        this.CropList = cropList;
        this.FieldList = fieldList;
    }

    // Getter and Setter for LogCode
    getLogCode() {
        return this.LogCode;
    }

    setLogCode(logCode) {
        this.LogCode = logCode;
    }

    // Getter and Setter for Logdate
    getLogDate() {
        return this.Logdate;
    }

    setLogDate(date) {
        this.Logdate = date;
    }

    // Getter and Setter for LogDetails
    getLogDetails() {
        return this.LogDetails;
    }

    setLogDetails(logDetails) {
        this.LogDetails = logDetails;
    }

    // Getter and Setter for ObservedImage
    getObservedImage() {
        return this.ObservedImage;
    }

    setObservedImage(observedImage) {
        this.ObservedImage = observedImage;
    }

    // Getter and Setter for StaffList
    getStaffList() {
        return this.StaffList;
    }

    setStaffList(staffList) {
        this.StaffList = staffList;
    }

    // Getter and Setter for CropList
    getCropList() {
        return this.CropList;
    }

    setCropList(cropList) {
        this.CropList = cropList;
    }

    // Getter and Setter for FieldList
    getFieldList() {
        return this.FieldList;
    }

    setFieldList(fieldList) {
        this.FieldList = fieldList;
    }
}
