class DateClass {
    private timeZone: string;

    constructor(timeZone: string) {
        this.timeZone = timeZone;
    }

    getTime(){
        var d = new Date();
        return d.getTime;
    }

    getMonth(){
        var d = new Date();
        return d.getMonth();
    }

    getTimezone(){
        return this.timeZone
    }

}

const dateObj = new DateClass("IND");
const response = dateObj.getMonth();
console.log(response);
