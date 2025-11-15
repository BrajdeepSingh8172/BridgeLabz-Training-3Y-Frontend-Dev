let isDoorLocked = true;
let isWindowClosed = true;
let isAlarmOn = true;
let isOwnerInside = true;

function checkSecurity() {
  const isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;
  console.log(`Security Status: ${isSecure ? "Secure" : "Unsafe"}`);
}

console.log("Initial state:");
checkSecurity();

console.log("\nChange: owner goes outside");
isOwnerInside = false;
checkSecurity();

console.log("\nChange: alarm is turned off");
isAlarmOn = false;
checkSecurity();

console.log("\nRestore secure conditions");
isOwnerInside = true;
isAlarmOn = true;
isDoorLocked = true;
isWindowClosed = true;
checkSecurity();
