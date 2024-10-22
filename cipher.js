document.getElementById('cipher-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const plaintext = document.getElementById('plaintext').value;
    const { key, encodedText } = encode(plaintext);
    
    // Remove the key length limit to display the full key
    document.getElementById('key').textContent = key; // Display the full key
    document.getElementById('encoded').textContent = encodedText;

    // Enable copying functionality
    document.getElementById('copy-key').addEventListener('click', () => {
        navigator.clipboard.writeText(key); // Copy the full key
    });
    document.getElementById('copy-encoded').addEventListener('click', () => {
        navigator.clipboard.writeText(encodedText);
    });
});

// Function to encode plaintext
function encode(plaintext) {
    const key = generateKey(plaintext);  // Generate the key
    const encodedText = someEncodingFunction(plaintext, key); // Encode the plaintext using the key

    return { key, encodedText };
}

// Example function to generate a random key based on the plaintext
function generateKey(plaintext) {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    for (let i = 0; i < plaintext.length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

// Placeholder for your encoding function
function someEncodingFunction(plaintext, key) {
    let encoded = '';
    for (let i = 0; i < plaintext.length; i++) {
        encoded += String.fromCharCode(plaintext.charCodeAt(i) + key.charCodeAt(i % key.length));
    }
    return encoded;
}

// Decode functionality
document.getElementById('decode-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const ciphertext = document.getElementById('ciphertext').value;
    const decodeKey = document.getElementById('decode-key').value;

    const decodedText = decode(ciphertext, decodeKey);
    document.getElementById('decoded-result').textContent = decodedText;
});

// Function to decode ciphertext
function decode(ciphertext, key) {
    let decoded = '';
    // Assume the key is a string; if JSON parsing is needed, uncomment the next line
    // const parsedKey = JSON.parse(key); 
    for (let i = 0; i < ciphertext.length; i++) {
        decoded += String.fromCharCode(ciphertext.charCodeAt(i) - key.charCodeAt(i % key.length));
    }
    return decoded;
}
