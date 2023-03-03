"use strict";
class Review {
        constructor(id, accountID, restaurantID, ratings, reviewSubject, reviewBody, reviewImage, reviewImage2, reviewImage3, reviewImage4, reviewImage5, timestampCreated, timestampUpdated, timestampDeleted) {
        this.id = id;
        this.accountID = accountID;
        this.restaurantID = restaurantID;
        this.ratings = ratings;
        this.reviewSubject = reviewSubject;
        this.reviewBody = reviewBody;
        this.reviewImage1 = reviewImage;
        this.reviewImage2 = reviewImage2;
        this.reviewImage3 = reviewImage3;
        this.reviewImage4 = reviewImage4;
        this.reviewImage5 = reviewImage5;
        this.timestampCreated = timestampCreated;
        this.timestampUpdated = timestampUpdated;
        this.timestampDeleted = timestampDeleted;
    }
    //add the set and get methods here
    getID(){
        return this.id;
    }
    getAccountID(){
        return this.accountID;
    }
    getRestaurantID(){
        return this.restaurantID;
    }
    getRatings(){
        return this.ratings;
    }
    getReviewSubject(){
        return this.reviewSubject;
    }
    getReviewBody(){
        return this.reviewBody;
    }
    getReviewImage1(){
        return this.reviewImage1;
    }
    getReviewImage2(){
        return this.reviewImage2;
    }
    getReviewImage3(){
        return this.reviewImage3;
    }
    getReviewImage4(){
        return this.reviewImage4;
    }
    getReviewImage5(){
        return this.reviewImage5;
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
    setAccountID(accountID){
        this.accountID = accountID;;
    }
    setRestaurantID(restaurantID){
        this.restaurantID = restaurantID;;
    }
    setRatings(ratings){
        this.ratings = ratings;;
    }
    setReviewSubject(reviewSubject){
        this.reviewSubject = reviewSubject;;
    }
    setReviewBody(reviewBody){
        this.reviewBody = reviewBody;;
    }
    setReviewImage(reviewImage){
        this.reviewImage = reviewImage;;
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
module.exports = Review;
