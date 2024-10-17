function generateKey(length = 16) { // Default key length to 16
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters[randomIndex];
    }
    return key;
}

function encode(plaintext, key) {
    let encodedText = '';
    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i];
        const rotation = key.charCodeAt(i % key.length) % 400 + 100; // Use key to derive rotation
        const encodedChar = String.fromCharCode(char.charCodeAt(0) + rotation);
        encodedText += encodedChar;
    }
    return encodedText;
}

function decode(encodedText, key) {
    let decodedText = '';
    for (let i = 0; i < encodedText.length; i++) {
        const char = encodedText[i];
        const rotation = key.charCodeAt(i % key.length) % 400 + 100; // Use key to derive rotation
        const decodedChar = String.fromCharCode(char.charCodeAt(0) - rotation);
        decodedText += decodedChar;
    }
    return decodedText;
}
