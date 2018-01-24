export function convertShiftstoEvents (shifts) {
    var events = []; 
    var shift, index; 
    for (index in shifts) {
        shift = shifts[index]; 
        event = {
            title: shift.student,
            start: new Date(shift.start),
            end: new Date(shift.end),
            hexColor: "#" + intToRGB(hashCode(shift.student))
        }
        events.push(event); 
    }
    return events; 
}

//Taken from stack overflow -> should be revised... 
//https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
export function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

export function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}