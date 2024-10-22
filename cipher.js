// Event listener for encoding the plaintext
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

// Function to encode plaintext using the complex encoding method
function encode(plaintext) {
    const key = generateKey(plaintext);  // Generate the key
    const encodedText = complexEncodingFunction(plaintext, key); // Encode the plaintext using the key

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

// Complex encoding function using advanced mathematical operations
function complexEncodingFunction(plaintext, key) {
    let encoded = '';
    for (let i = 0; i < plaintext.length; i++) {
        // Fetch the char code of both the plaintext and key
        let ptCharCode = plaintext.charCodeAt(i);
        let keyCharCode = key.charCodeAt(i % key.length);

        // Complex mathematical operation to mix the characters
        let encodedCharCode = (
            ((ptCharCode ^ keyCharCode) + (ptCharCode * keyCharCode)) % 256 // XOR and multiply, modulus to keep values in range
        ) + 
        (
            Math.abs(Math.sin(ptCharCode + keyCharCode) * 1000) % 256  // Sin function for non-linearity, modulus 256
        ) + 
        (
            ((ptCharCode << 3) + (keyCharCode >> 2)) % 256  // Shift bits to add more complexity
        );

        // Ensure the encoded value stays within the range of valid character codes (0-255)
        encodedCharCode = Math.floor(encodedCharCode) % 256;

        // Convert back to a character and add to the encoded string
        encoded += String.fromCharCode(encodedCharCode);
    }
    return encoded;
}

// Event listener for decoding the ciphertext
document.getElementById('decode-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const ciphertext = document.getElementById('ciphertext').value;
    const decodeKey = document.getElementById('decode-key').value;

    const decodedText = decode(ciphertext, decodeKey);
    document.getElementById('decoded-result').textContent = decodedText;
});

// Function to decode ciphertext using a reverse approach
function decode(ciphertext, key) {
    let decoded = '';
    for (let i = 0; i < ciphertext.length; i++) {
        let cipherCharCode = ciphertext.charCodeAt(i);
        let keyCharCode = key.charCodeAt(i % key.length);

        // Reverse the complex encoding function by undoing the operations
        let decodedCharCode = (
            ((cipherCharCode - Math.abs(Math.sin(cipherCharCode + keyCharCode) * 1000) % 256) % 256)  // Reverse non-linearity
            - ((cipherCharCode ^ keyCharCode) + (cipherCharCode * keyCharCode)) % 256  // Reverse XOR and multiply
        ) % 256;

        // Handle negative values and ensure char code is valid
        decodedCharCode = ((decodedCharCode + 256) % 256);

        // Convert back to character
        decoded += String.fromCharCode(decodedCharCode);
    }
    return decoded;
}
