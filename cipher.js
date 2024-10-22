// Example function to generate a random key based on the plaintext
function generateKey(plaintext) {
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    for (let i = 0; i < plaintext.length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

// Function to encode plaintext with complex mathematical operations and XOR
function complexEncodingFunction(plaintext, key) {
    let encoded = '';
    for (let i = 0; i < plaintext.length; i++) {
        let ptCharCode = plaintext.charCodeAt(i);
        let keyCharCode = key.charCodeAt(i % key.length);
        
        // Mathematical operation (addition)
        let mathEncodedCharCode = (ptCharCode + (keyCharCode * 3)) % 256;

        // XOR operation
        let finalEncodedCharCode = mathEncodedCharCode ^ keyCharCode;

        encoded += String.fromCharCode(finalEncodedCharCode);
    }
    return encoded;
}

// Function to decode ciphertext using the reverse of the encoding process
function decode(ciphertext, key) {
    let decoded = '';
    for (let i = 0; i < ciphertext.length; i++) {
        let cipherCharCode = ciphertext.charCodeAt(i);
        let keyCharCode = key.charCodeAt(i % key.length);

        // Reverse the XOR operation
        let mathEncodedCharCode = cipherCharCode ^ keyCharCode;

        // Reverse the mathematical operation (subtraction)
        let decodedCharCode = (mathEncodedCharCode - (keyCharCode * 3) + 256) % 256;

        decoded += String.fromCharCode(decodedCharCode);
    }
    return decoded;
}

// Event listener for encoding the plaintext
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
        navigator.clipboard.writeText(encodedText);
    });
});

// Encoding function
function encode(plaintext) {
    const key = generateKey(plaintext);  // Generate the key
    const encodedText = complexEncodingFunction(plaintext, key); // Encode the plaintext using the key

    return { key, encodedText };
}

// Decode functionality
document.getElementById('decode-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const ciphertext = document.getElementById('ciphertext').value;
    const decodeKey = document.getElementById('decode-key').value;

    const decodedText = decode(ciphertext, decodeKey);
    document.getElementById('decoded-result').textContent = decodedText;
});
