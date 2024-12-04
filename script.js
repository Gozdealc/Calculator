const display = document.getElementById('display');
let firstNumber = null;
let selectedOperator = null;
let result = '';
// Number değerine sahip tüm sınıfları seçer, her buton döngü içinde sırayla işlenir.
// Butona olay dinleyicisi eklenir, ve bu güncellemeyi ekranda göstermek için bir fonk. eklenir.
document.querySelectorAll('.number').forEach(function(button) {
    button.addEventListener('click', function() {
        pressNumber(button.innerText);
    });
});
// Ekrana yazdırma; 
function pressNumber(number) {
    if (display.value === "0") {
        display.value = number; // İlk sayı 0 ise yerine yeni sayı gelir
    } else {
        display.value += number; // Önceki sayının yanına ekler
    }
}

document.querySelectorAll('.operator').forEach(function(button) {
    button.addEventListener('click', function() {
        if (firstNumber === null) {
            firstNumber = parseFloat(display.value); // İlk sayıyı kaydet
            selectedOperator = button.getAttribute('data-operator'); // Operatörü sakla
            display.value = ''; // Ekranı boşalt
        }
        else if (display.value !== '') {
            // Eğer ekran boş değilse operatörü ekle
            selectedOperator = button.getAttribute('data-operator');
            display.value += ` ${selectedOperator} `;
        }
    });
});

function calculate() {
    const secondNumber = parseFloat(display.value); // Ekrandan ikinci sayıyı al

    if (selectedOperator === '+') {
        result = firstNumber + secondNumber;
    } else if (selectedOperator === '-') {
        result = firstNumber - secondNumber;
    } else if (selectedOperator === '*') {
        result = firstNumber * secondNumber;
    } else if (selectedOperator === '/') {
        if (secondNumber === 0) {
            result = 'ERROR'
        }
        else {
            result = firstNumber / secondNumber;
        }       
    }
    // Sonucu ekrana yazdır
    display.value = result;

    // Değişkenleri sıfırla
    firstNumber = null;
    selectedOperator = null;
}


// Sıfırlama - Bir değeri silme
function clearDisplay(action) {   
    if (action === 'all') {
        // Tüm ekranı temizle
        display.value = '0';
        firstNumber = null;
        selectedOperator = null;

    } else if (action === 'last') {
        // Son karakteri sil
        display.value = display.value.slice(0, -1);

        // Eğer ekran tamamen boşaldıysa, 0 yaz
        if (display.value === '') {
            display.value = '0';
        }
    }
}