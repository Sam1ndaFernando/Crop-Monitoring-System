export class CropModel {
    constructor(cropCode, cropName, scientificName, category, season, cropImage, logList = [], fieldList = []) {
        this.CropCode = cropCode;
        this.CropName = cropName;
        this.ScientificName = scientificName;
        this.Category = category;
        this.Season = season;
        this.CropImage = cropImage;
        this.LogList = logList;
        this.FieldList = fieldList;
    }

    // Getter and Setter for CropCode
    getCropCode() {
        return this.CropCode;
    }

    setCropCode(cropCode) {
        this.CropCode = cropCode;
    }

    // Getter and Setter for CropName
    getCropName() {
        return this.CropName;
    }

    setCropName(cropName) {
        this.CropName = cropName;
    }

    // Getter and Setter for ScientificName
    getScientificName() {
        return this.ScientificName;
    }

    setScientificName(scientificName) {
        this.ScientificName = scientificName;
    }

    // Getter and Setter for Category
    getCategory() {
        return this.Category;
    }

    setCategory(category) {
        this.Category = category;
    }

    // Getter and Setter for Season
    getSeason() {
        return this.Season;
    }

    setSeason(season) {
        this.Season = season;
    }

    // Getter and Setter for CropImage
    getCropImage() {
        return this.CropImage;
    }

    setCropImage(cropImage) {
        this.CropImage = cropImage;
    }

    // Getter and Setter for LogList
    getLogList() {
        return this.LogList;
    }

    setLogList(logList) {
        this.LogList = logList;
    }

    // Getter and Setter for FieldList
    getFieldList() {
        return this.FieldList;
    }

    setFieldList(fieldList) {
        this.FieldList = fieldList;
    }
}
