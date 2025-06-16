import { countryList } from "./countryCurrency.js";


    let fromCurrency = "USD";
    let toCurrency = "NGN";

    function createDropdown(containerId, isFrom) {
      const container = document.getElementById(containerId);
      container.innerHTML = `
        <div class="dropdown-selected">
          <img src="https://flagcdn.com/48x36/${countryList[isFrom ? fromCurrency : toCurrency]}.png" />
          <span>${isFrom ? fromCurrency : toCurrency}</span>
        </div>
        <div class="dropdown-options">
          <input class="filter-input" placeholder="Type to search..."/>
          <div class="options-list"></div>
        </div>
      `;

      const selected = container.querySelector('.dropdown-selected');
      const dropdown = container.querySelector('.dropdown-options');
      const optionsList = container.querySelector('.options-list');
      const filterInput = container.querySelector('.filter-input');

      function populateOptions(filter = '') {
        optionsList.innerHTML = '';
        for (let code in countryList) {
          if (code.toLowerCase().includes(filter.toLowerCase())) {
            const option = document.createElement('div');
            option.className = 'dropdown-option';
            option.innerHTML = `
              <img src="https://flagcdn.com/48x36/${countryList[code]}.com" />
              <span>${code}</span>
            `;
            option.addEventListener('click', () => {
             const imgElement = selected.querySelector('img');
             const spanElement = selected.querySelector('span');
             if (imgElement && spanElement) {
               imgElement.src = `https://flagcdn.com/48x36/${countryList[code]}.png`;
               spanElement.textContent = code;

               if (isFrom) fromCurrency = code;
               else toCurrency = code;
               dropdown.classList.remove('show');

             }else{
              console.err('Dropdown elements not found.');
             }
            });
            optionsList.appendChild(option);
          }
        }
      }

      selected.addEventListener('click', () => 
      dropdown.classList.toggle('show'));
      filterInput.addEventListener('input', () => populateOptions(filterInput.value));
      populateOptions();
    }

    createDropdown("from-dropdown", true);
    createDropdown("to-dropdown", false);
    
    document.querySelector('.convert-button').addEventListener('click', async () => {

      const amount =  parseFloat(document.querySelector('.amount-input').value);
      const resultElement = document.querySelector('.result');
      if (!amount || isNaN(amount)){
        resultElement.textContent = 'Enter a valid amount';
        return;
      }
      resultElement.textContent = "Converting...";
      
      const url = `https://exchange-rate-api1.p.rapidapi.com/latest?base=${fromCurrency}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "03e776fdd6msh8a86196d8443ddbp142295jsna4c1f2e10666",
          "x-rapidapi-host": "exchange-rate-api1.p.rapidapi.com",
	},
};

    try{
      const respone = await fetch (url, options);
      const data = await respone.json();
      console.log ("API response:", JSON.stringify(data, null, 2));

      if (data && data.rates && data.rates[toCurrency]) {
        const rate = data.rates[toCurrency];
        const result = rate * amount;
        resultElement.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
      } else {
        resultElement.textContent = "Conversion failed.";
      }
    } catch (err) {
      resultElement.textContent = `Please check your internet connection. Try again`;
    }
    });

/*

    const countryList = {
      AED: "ae", AFN: "af", ALL: "al", AMD: "am", ANG: "nl", AOA: "ao", ARS: "ar", AUD: "au",
      AWG: "aw", AZN: "az", BAM: "ba", BBD: "bb", BDT: "bd", BGN: "bg", BHD: "bh", BIF: "bi",
      BMD: "bm", BND: "bn", BOB: "bo", BRL: "br", BSD: "bs", BTN: "bt", BWP: "bw", BYN: "by",
      BZD: "bz", CAD: "ca", CDF: "cd", CHF: "ch", CLP: "cl", CNY: "cn", COP: "co", CRC: "cr",
      CUP: "cu", CVE: "cv", CZK: "cz", DJF: "dj", DKK: "dk", DOP: "do", DZD: "dz", EGP: "eg",
      ERN: "er", ETB: "et", EUR: "eu", FJD: "fj", FKP: "fk", FOK: "fo", GBP: "gb", GEL: "ge",
      GGP: "gg", GHS: "gh", GIP: "gi", GMD: "gm", GNF: "gn", GTQ: "gt", GYD: "gy", HKD: "hk",
      HNL: "hn", HRK: "hr", HTG: "ht", HUF: "hu", IDR: "id", ILS: "il", IMP: "im", INR: "in",
      IQD: "iq", IRR: "ir", ISK: "is", JEP: "je", JMD: "jm", JOD: "jo", JPY: "jp", KES: "ke",
      KGS: "kg", KHR: "kh", KID: "ki", KMF: "km", KRW: "kr", KWD: "kw", KYD: "ky", KZT: "kz",
      LAK: "la", LBP: "lb", LKR: "lk", LRD: "lr", LSL: "ls", LYD: "ly", MAD: "ma", MDL: "md",
      MGA: "mg", MKD: "mk", MMK: "mm", MNT: "mn", MOP: "mo", MRU: "mr", MUR: "mu", MVR: "mv",
      MWK: "mw", MXN: "mx", MYR: "my", MZN: "mz", NAD: "na", NGN: "ng", NIO: "ni", NOK: "no",
      NPR: "np", NZD: "nz", OMR: "om", PAB: "pa", PEN: "pe", PGK: "pg", PHP: "ph", PKR: "pk",
      PLN: "pl", PYG: "py", QAR: "qa", RON: "ro", RSD: "rs", RUB: "ru", RWF: "rw", SAR: "sa",
      SBD: "sb", SCR: "sc", SDG: "sd", SEK: "se", SGD: "sg", SHP: "sh", SLL: "sl", SOS: "so",
      SRD: "sr", SSP: "ss", STN: "st", SYP: "sy", SZL: "sz", THB: "th", TJS: "tj", TMT: "tm",
      TND: "tn", TOP: "to", TRY: "tr", TTD: "tt", TVD: "tv", TWD: "tw", TZS: "tz", UAH: "ua",
      UGX: "ug", USD: "us", UYU: "uy", UZS: "uz", VES: "ve", VND: "vn", VUV: "vu", WST: "ws",
      XAF: "cm", XCD: "ag", XOF: "sn", YER: "ye", ZAR: "za", ZMW: "zm", ZWL: "zw"
    };
    
    let fromCurrency = "USD";
    let toCurrency = "NGN";
    
    function createDropdown(containerId, isFrom) {
      const container = document.getElementById(containerId);
      container.innerHTML = `
        <div class="dropdown-selected">
          <img src="https://flagcdn.com/48x36/${countryList[isFrom ? fromCurrency : toCurrency]}.png" />
          <span>${isFrom ? fromCurrency : toCurrency}</span>
        </div>
        <div class="dropdown-options">
          <input class="filter-input" placeholder="Type to search..."/>
          <div class="options-list"></div>
        </div>
      `;
    
      const selected = container.querySelector('.dropdown-selected');
      const dropdown = container.querySelector('.dropdown-options');
      const optionsList = container.querySelector('.options-list');
      const filterInput = container.querySelector('.filter-input');
    
      function populateOptions(filter = '') {
        optionsList.innerHTML = '';
        for (let code in countryList) {
          if (code.toLowerCase().includes(filter.toLowerCase())) {
            const option = document.createElement('div');
            option.className = 'dropdown-option';
            option.innerHTML = `
              <img src="https://flagcdn.com/48x36/${countryList[code]}.png" />
              <span>${code}</span>
            `;
            option.addEventListener('click', () => {
      const imgEl = selected.querySelector('img');
      const spanEl = selected.querySelector('span');
      if (imgEl && spanEl) {
        imgEl.src = `https://flagcdn.com/48x36/${countryList[code]}.png`;
        spanEl.textContent = code;
        if (isFrom) fromCurrency = code;
        else toCurrency = code;
        dropdown.classList.remove('show');
      } else {
      
        console.error("Dropdown elements not found.");
      }
    });
            optionsList.appendChild(option);
          }
        }
      }
    
      selected.addEventListener('click', () => dropdown.classList.toggle('show'));
      filterInput.addEventListener('input', () => populateOptions(filterInput.value));
      populateOptions();
    }
    
    createDropdown("from-dropdown", true);
    createDropdown("to-dropdown", false);
    
    document.querySelector(".convert-button").addEventListener("click", async () => {
      const amount = parseFloat(document.querySelector(".amount-input").value);
      const resultEl = document.querySelector(".result");
    
      if (!amount || isNaN(amount)) {
        resultEl.textContent = "Enter a valid amount.";
        return;
      }
    
      resultEl.textContent = "Converting...";
    
      const url = `https://exchange-rate-api1.p.rapidapi.com/latest?base=${fromCurrency}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "03e776fdd6msh8a86196d8443ddbp142295jsna4c1f2e10666",
          "x-rapidapi-host": "exchange-rate-api1.p.rapidapi.com",
        },
      };
    
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        console.log("API response:", JSON.stringify(data, null, 2));
    
    
        if (data && data.rates && data.rates[toCurrency]) {
          const rate = data.rates[toCurrency];
          const result = rate * amount;
          resultEl.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        } else {
          resultEl.textContent = "Conversion failed.";
        }
      } catch (err) {
        resultEl.textContent = "API error. Please check your key or internet.";
      }
    });
    
    console.log(document.getElementById("from-dropdown")); // Should NOT be null*/

