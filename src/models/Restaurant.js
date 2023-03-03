"use strict";
class Restaurant {
        constructor(id, restaurantName, category, restaurantLogo, location, contact, openHours, timestampCreated, timestampUpdated, timestampDeleted) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.category = category;
        this.restaurantLogo = restaurantLogo;
        this.location = location;
        this.contact = contact;
        this.openHours = openHours;
        this.timestampCreated = timestampCreated;
        this.timestampUpdated = timestampUpdated;
        this.timestampDeleted = timestampDeleted;
    }
    //add the set and get methods here
    getID(){
        return this.id;
    }
    getRestaurantName(){
        return this.restaurantName;
    }
    getRestaurantCategory(){
        return this.category;
    }
    getRestaurantLogo(){
        return this.restaurantLogo;
    }
    getRestaurantLocation(){
        return this.location;
    }
    getRestaurantContact(){
        return this.contact;
    }
    getRestaurantOpenHours(){
        return this.openHours;
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
    setRestaurantID(id){
        this.id = id;
    }
    setRestaurantName(restaurantName){
        this.restaurantName = restaurantName;;
    }
    setRestaurantCategory(category){
        this.category = category;;
    }
    setRestaurantLogo(restaurantLogo){
        this.restaurantLogo = restaurantLogo;;
    }
    setRestaurantLocation(location){
        this.location = location;;
    }
    setRestaurantContact(contact){
        this.contact = contact;;
    }
    setRestaurantOpenHours(openHours){
        this.openHours = openHours;;
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
module.exports = Restaurant;
