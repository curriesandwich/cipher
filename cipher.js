// Global variable to store the key for decoding later
let currentKey = '';

// Function to encode plaintext
function encode(plaintext) {
    currentKey = generateKey(plaintext.length); // Generate a key matching the length of the plaintext
    const encodedText = chaoticEncoding(plaintext, currentKey); // Encode the plaintext using the key

    return { key: currentKey, encodedText };
}

// Function to decode ciphertext
function decode(ciphertext, key) {
    const keyNumbers = key.split('').map(char => char.charCodeAt(0));
    let decoded = '';

    for (let i = 0; i < ciphertext.length; i++) {
        const chaoticValue = logisticMap(i) * 256; // Chaotic map value
        const keyValue = keyNumbers[i % keyNumbers.length] + chaoticValue;
        decoded += String.fromCharCode((ciphertext.charCodeAt(i) - keyValue + 65536) % 65536);
    }
    return decoded;
}

// Example function to generate a key based on the length of the plaintext
function generateKey(length) {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) { // Use the length parameter to generate a key of the correct length
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key; // Key length matches the specified length
}

// Chaotic encoding function
function chaoticEncoding(plaintext, key) {
    const keyNumbers = key.split('').map(char => char.charCodeAt(0));
    let encoded = '';

    for (let i = 0; i < plaintext.length; i++) {
        const chaoticValue = logisticMap(i) * 256; // Chaotic map value
        const keyValue = keyNumbers[i % keyNumbers.length] + chaoticValue;
        encoded += String.fromCharCode((plaintext.charCodeAt(i) + keyValue) % 65536); // Use modulo to wrap around character values
    }
    return encoded;
}

// Logistic map for chaos
function logisticMap(n) {
    const r = 3.99; // Control parameter for chaos
    let x = (n % 1) + 0.1; // Ensure x is in (0, 1)
    return r * x * (1 - x);
}

// Form submission for encoding
document.getElementById('cipher-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const plaintext = document.getElementById('plaintext').value;
    const { key, encodedText } = encode(plaintext);
    
    document.getElementById('key').textContent = key; // Display the full key
    document.getElementById('encoded').textContent = encodedText;

    // Enable copying functionality
    document.getElementById('copy-key').addEventListener('click', () => {
        navigator.clipboard.writeText(key); // Copy the full key
    });
    document.getElementById('copy-encoded').addEventListener('click', () => {
        navigator.clipboard.writeText(encodedText); // Copy the encoded text
    });
});

// Form submission for decoding
document.getElementById('decode-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const ciphertext = document.getElementById('ciphertext').value;

    // Use the stored key for decoding
    const decodedText = decode(ciphertext, currentKey);
    document.getElementById('decoded-result').textContent = decodedText;
});
