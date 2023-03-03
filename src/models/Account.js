"use strict";
class Account {
        constructor(id, username, password, email, contactnumber, profileImage, token, timestampCreated, timestampUpdated, timestampDeleted) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.contactnumber = contactnumber;
        this.profileImage = profileImage;
        this.token = token;
        this.timestampCreated = timestampCreated;
        this.timestampUpdated = timestampUpdated;
        this.timestampDeleted = timestampDeleted;
    }
    //add the set and get methods here
    getID(){
        return this.id;
    }
    getUsername(){
        return this.username;
    }
    getPassword(){
        return this.password;
    }
    getEmail(){
        return this.email;
    }
    getContactNumber(){
        return this.contactnumber;
    }
    getProfileImage(){
        return this.profileImage;
    }
    getToken(){
        return this.token;
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
    setUsername(username){
    this.username = username;
    }
    setPassword(password){
    this.password = password;
    }
    setEmail(email){
    this.email = email;
    }
    setContactNumber(contactNumber){
    this.contactnumber = contactNumber;
    }
    setProfileImage(profileImage){
        this.profileImage = profileImage;
    }
    setToken(token){
        this.token = token;
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
module.exports = Account;
