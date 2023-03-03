"use strict";
class Mail {
        constructor(from, to, subject, text, html) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }
    //add the set and get methods here
    getFrom(){
        return this.from;
    }
    getTo(){
        return this.to;
    }
    getSubject(){
        return this.subject;
    }
    getText(){
        return this.text;
    }
    getHTML(){
        return this.html;
    }

    // Set Variable
    setFrom(from){
        this.from = from;
    }
    setTo(to){
    this.to = to;
    }
    setSubject(subject){
    this.subject = subject;
    }
    setText(text){
    this.text = text;
    }
    setHTML(html){
    this.html = html;
    }
}
module.exports = Mail;
