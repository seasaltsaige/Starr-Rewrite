export default function createCode () {
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let stringToReturn = "";
    for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * string.length);
        const char = string.charAt(random);
        string = string.replace(char, "");
        stringToReturn += char;
    }

    return stringToReturn;

}