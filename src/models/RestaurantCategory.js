"use strict";
class RestaurantCategory {
        constructor(id, category, timestampCreated, timestampUpdated, timestampDeleted) {
        this.id = id;
        this.category = category;
        this.timestampCreated = timestampCreated;
        this.timestampUpdated = timestampUpdated;
        this.timestampDeleted = timestampDeleted;
    }
    //add the set and get methods here
    getID(){
        return this.id;
    }
    getCategory(){
        return this.category;
    }
    getTimeStampCreated(){
        return this.timestampCreated;
    }
    getTimeStampUpdated(){
        return this.timestampUpdated;
    }
    getTimeStampDeleted(){
        return this.timestampDeleted;
    }

    // Set Variable
    setID(id){
        this.id = id;
    }
    setCategory(category){
        this.category = category;;
    }
    setTimeStampCreated(timestampCreated){
        this.timestampCreated = timestampCreated;
    }
    setTimeStampUpdated(timestampUpdated){
        this.timestampUpdated = timestampUpdated;
    }
    setTimeStampDeleted(timestampDeleted){
        this.timestampDeleted = timestampDeleted;
    }
}
module.exports = RestaurantCategory;
