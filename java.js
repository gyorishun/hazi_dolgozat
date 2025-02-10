// Funkció, ami a gombra kattintva elmenti az adatokat cookie-ba
function saveNumber() {
    // A bemeneti mezők értékei
    const name = document.getElementById('name').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Ellenőrizzük, hogy minden mező ki legyen töltve
    if (name && cardNumber && expiryDate && cvv) {
        // Adatok mentése cookie-ba (max-30 napra)
        document.cookie = "userName=" + encodeURIComponent(name) + "; path=/; max-age=" + 60*60*24*30; // 30 nap
        document.cookie = "userCardNumber=" + encodeURIComponent(cardNumber) + "; path=/; max-age=" + 60*60*24*30; // 30 nap
        document.cookie = "userExpiryDate=" + encodeURIComponent(expiryDate) + "; path=/; max-age=" + 60*60*24*30; // 30 nap
        document.cookie = "userCVV=" + encodeURIComponent(cvv) + "; path=/; max-age=" + 60*60*24*30; // 30 nap

        // Üzenet a felhasználónak
        document.getElementById('message').textContent = "Az adatok sikeresen elmentve!";
    } else {
        // Ha valamelyik mező üres
        document.getElementById('message').textContent = "Kérlek, töltsd ki az összes mezőt!";
    }
}

// Bankkártya szám formázása: minden 4 karakter után kötőjel
document.getElementById('cardNumber').addEventListener('input', function(e) {
    const input = e.target.value.replace(/\D/g, ''); // Csak a számokat tartja meg
    let formatted = '';
    
    for (let i = 0; i < input.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatted += '-';
        }
        formatted += input[i];
    }
    
    e.target.value = formatted;
});

// Lejárati dátum formázása: minden 2. karakter után perjel
document.getElementById('expiryDate').addEventListener('input', function(e) {
    const input = e.target.value.replace(/\D/g, ''); // Csak a számokat tartja meg
    let formatted = '';
    
    for (let i = 0; i < input.length; i++) {
        if (i === 2) {
            formatted += '/';
        }
        formatted += input[i];
    }
    
    e.target.value = formatted;
});

document.getElementById('cvv').addEventListener('input', function(e) {
    // Csak a számokat engedjük beírni
    const input = e.target.value.replace(/\D/g, '');  // Nem numerikus karakterek eltávolítása
    e.target.value = input;  // Az input értékét visszaállítjuk csak számokra
});

// Funkció a cookie-k betöltéséhez és megjelenítéséhez
function loadCookies() {
    const cookies = document.cookie.split("; ");
    cookies.forEach(function(cookie) {
        const [key, value] = cookie.split("=");
        if (key === "userName") {
            document.getElementById('name').value = decodeURIComponent(value);
        } else if (key === "userCardNumber") {
            document.getElementById('cardNumber').value = decodeURIComponent(value);
        } else if (key === "userExpiryDate") {
            document.getElementById('expiryDate').value = decodeURIComponent(value);
        } else if (key === "userCVV") {
            document.getElementById('cvv').value = decodeURIComponent(value);
        }
    });
}

// Oldal betöltésekor hívódik a cookie-k betöltése
window.onload = function() {
    loadCookies();
}
