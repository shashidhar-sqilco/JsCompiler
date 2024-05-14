const height = 10;
for (let i = 1; i <= height; i++) {
let line = '';
// Print spaces for the left padding
for (let j = 1; j <= height - i; j++) {
line += ' ';
}
// Print asterisks for the triangle
for (let k = 1; k <= 2 * i - 1; k++) {
line += '*';
}
console.log(line);
}