function generateKey(plaintext) {
    const key = [];
    for (let i = 0; i < plaintext.length; i += 3) {
        const group = plaintext.slice(i, i + 7);
        const groupKey = [];
        for (let char of group) {
            const rotation = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
            groupKey.push(rotation);
        }
        key.push(groupKey);
    }
    return key;
}

function encode(plaintext, key) {
    let encodedText = '';
    for (let i = 0; i < key.length; i++) {
        const groupKey = key[i];
        const group = plaintext.slice(i * 7, (i + 1) * 7);
        for (let j = 0; j < group.length; j++) {
            const char = group[j];
            const encodedChar = String.fromCharCode(char.charCodeAt(0) + groupKey[j]);
            encodedText += encodedChar;
        }
    }
    return encodedText;
}

function decode(encodedText, key) {
    let decodedText = '';
    for (let i = 0; i < key.length; i++) {
        const groupKey = key[i];
        const group = encodedText.slice(i * groupKey.length, (i + 1) * groupKey.length);
        for (let j = 0; j < group.length; j++) {
            const char = group[j];
            const decodedChar = String.fromCharCode(char.charCodeAt(0) - groupKey[j]);
            decodedText += decodedChar;
        }
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
