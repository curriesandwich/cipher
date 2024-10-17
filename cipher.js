function generateKey(length = 16) {
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

document.getElementById('cipher-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const plaintext = document.getElementById('plaintext').value;
    const key = generateKey(plaintext);
    const encoded = encode(plaintext, key);
    const decoded = decode(encoded, key);

    document.getElementById('key').innerText = JSON.stringify(key);
    document.getElementById('encoded').innerText = encoded;
    document.getElementById('decoded').innerText = decoded;
    document.getElementById('results').style.display = 'block'; // Show results
});

document.getElementById('decode-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ciphertext = document.getElementById('ciphertext').value;
    const keyInput = document.getElementById('decode-key').value;
    let key;

    try {
        key = JSON.parse(keyInput); // Parse the key from JSON format
        const decodedText = decode(ciphertext, key);
        document.getElementById('decoded-result').innerText = decodedText;
        document.getElementById('decode-results').style.display = 'block'; // Show decode results
    } catch (error) {
        alert('Invalid key format. Please enter a valid JSON array for the key.');
    }
});

// Copy key to clipboard
document.getElementById('copy-key').addEventListener('click', function() {
    const keyText = document.getElementById('key').innerText;
    navigator.clipboard.writeText(keyText).then(() => {
        alert('Key copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});

// Copy encoded text to clipboard
document.getElementById('copy-encoded').addEventListener('click', function() {
    const encodedText = document.getElementById('encoded').innerText;
    navigator.clipboard.writeText(encodedText).then(() => {
        alert('Encoded text copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
