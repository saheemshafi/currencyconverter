fetch(`https://open.er-api.com/v6/latest/USD`).then(response => response.json()).then((currencies) => {
    const setOptions = function (rates) {
        for (const key in rates) {
            Array.from(document.querySelectorAll('.rateSelectors')).map(selectControl => selectControl.innerHTML += `<option>${key}</option>`)
        }
    }(currencies.rates)
})



let amount = document.getElementById('amount');
let convertFrom = 'USD';
let convertTo = 'USD';

document.querySelector('.from-to').addEventListener('change', function (e) {
    if (e.target.id == 'from') {
        convertFrom = e.target.value;
    }
    if (e.target.id == 'to') {
        convertTo = e.target.value;
    }
})


document.querySelector('.convert').addEventListener('click', function (e) {

    fetch(`https://open.er-api.com/v6/latest/${convertFrom}`).then(response => response.json()).then((currencies) => {

        // console.log(parseInt(amount.value) * currencies.rates[convertTo]);
        this.classList.add('working');
        document.getElementById("result").innerHTML = `<i class='bx bx-refresh success'></i> Processing results ...`;
        setTimeout(() => {
            document.getElementById("result").innerHTML = `${amount.value} ${convertFrom} ==> ${parseInt(amount.value) * currencies.rates[convertTo]} ${convertTo}`;
            this.classList.remove('working');
        }, 2000);
    });
});

