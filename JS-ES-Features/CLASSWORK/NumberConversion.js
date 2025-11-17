//  Convert "45.67" into a number and check if valid

let str = "45.67";

let num = parseFloat(str);

if (isNaN(num)) {
    console.log(`"${str}" is not a valid number.`);
} else {
    console.log(`The number is:`, num);
}