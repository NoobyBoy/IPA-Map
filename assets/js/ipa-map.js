// IPA Map JavaScript

const specialCountries = //dict of country code where language is not exactly equal to the ISO Code provided by restcountries API
{
   'AL' : ['als'],
   'AR' : ['spa', 'gug'],
   'AS' : ['eng', 'smq'],
   'EG' : ['arz'], // arabic (egyptian)
   'PY' : ['spa', 'gug'],
   'BO' : ['spa', 'ayr', 'gug', 'quh'],
   'MA' : ['ary', 'tzm', 'shi'], //
   'DZ' : ['arb'], //
   'NA' : ['afr', 'deu', 'eng', 'her', 'hgm', 'kwn', 'ndo'], //remove tsn (tswana), loz (lozi)
   'NF' : ['eng'], //remove pih (Norfuk language)
   'NO' : ['nob', 'sme'], // removed nno, smi => sme
   'NP' : ['npi'], //
   'BN' : ['kxd'], //
   'AF' : ['pes', 'pst', 'pbu'], // pus => pes (persian), pst (western pashto) and pbu (northern pashto)
   'AZ' : ['azb', 'azj'], //aze => azb (south azerbaijani) and azj (northern azerbaijani)
   'BA' : ['hrv', 'srp'], //removed bos
   'BQ' : ['nld', 'eng'], //removed pap (papiamento)
   'BW' : ['eng'], //removed tsn (tswana)
   'BY' : ['rus'], //removed bel (belarussian)
   'CD' : ['fra', 'lin', 'swh'], // remove lua (luba-kasai) and kon (kongo)
   'CG' : ['fra', 'lin'], //remove kon (kongo)
   'CK' : ['eng'], //removed rar (cook islands maori)
   'CN' : ['cmn'], // zho => cmn
   'CW' : ['eng', 'nld'], //removed pap (papiamento)
   'EE' : ['ekk'], // est => ekk
   'AW' : ['nld'], //removed pap (papiamento)
   'EH' :  ['shi', 'spa'], //removed mey
   'ES' : ['spa', 'cat', 'eus'], //removed glc
   'FJ' : ['eng', 'fij'], //removed hif (indian fijian)
   'HK' : ['yue', 'eng'], // zho => yue
   'HT' : ['fra', 'kmv'], //hat => kmv
   'IM' : ['eng', 'gle'], //glv => gle
   'IQ' : ['arb', 'ckb'], // removed arc
   'IR' : ['pes'], //fas => pes
   'KE' : ['eng', 'swh'], //swa => swh
   'KI' : ['eng'], //remove gil (gilbertese)
   'KZ' : ['rus'], //remove kaz (kazakh)
   'LV': ['lvs'], //lat => lvs
   'ME' : ['srp', 'als', 'hrv'], // bos ?? rmoved cnr (montenegrin)
   'MG' : ['fra', 'plt'], // mlg => plt
   'MH' : ['eng'] ,// removed mah (marshalese)
   'MO' : ['cmn', 'por'], //zho => cmn
   'MP' : ['eng', 'cha'], //remove cal (Carolinian)
   'MW' : ['eng'], //removed nya
   'MY' : ['eng', 'zsm'], //msa => zsm
   'NR' : ['eng'], // no  nau (nauruan)
   'NU' : ['eng'],	// no niu (niuean)
   'NZ' : ['eng', 'mri'],
   'PE':  ['spa', 'ayr', 'quh'], //aym => ayr, que => quh
   'PG' : ['eng'], // removed 'tpi' (tok pisin), 'hmo' (hiri motu)
   'SC' : ['eng', 'fra'], // removed 'crs' (seychellois creole)
   'SG' : ['eng', 'cmn', 'tam', 'zsm'], //msa => zsm
   'SZ' : ['eng'], // removed ssw (swati)
   'TK' : ['eng'], // removed tkl (tokelauan), smo (samoan)
   'TV' : ['eng'], // removed tvl (tuvaluan)
   'TW' : ['cmn'], // no taiwainese mandarin codefound
   'TZ' : ['eng', 'swh'], // swa => swh
   'UG' : ['eng', 'swh'], // swa => swh
   'UZ' : ['rus', 'uzn'], // uzb => uzn
   'VA' : ['ita'], //remove 'lat'
   'VU' : [ 'eng', 'fra'], // removed 'bis' (bislama),
   'WS' : ['eng'], //removed smo (samoan)
   'ZA' : ['afr', 'eng', 'nde',  'sot',  'xho', 'zul'], // nbl => nde, 'ven' (venda),'tso' (tsonga),'tsn' (tswana), 'ssw' (swati), 'nso' (Northern Sotho),
   'ZW' : ['eng', 'kck', 'nde', 'sna', 'sot', 'toi',  'xho'] // removed : 'zib' , 'ven' (venda), 'tsn' (tswana), 'tso' (tsonga), 'nya' (chewa), 'ndc' (ndau), 'khi' (khoïsan), 'bwg'
} 

var languageDict = null;
var languageNameDict = null;

// Initialize the application
function initializeApp() {
    // Test multi-consonant detection
    testMultiConsonantDetection();
    
    // Test multi-vowel detection
    testMultiVowelDetection();
    
    loadPhoibleData().then((result) => {
        languageDict = groupPhonemesByLanguage(result); 
        languageNameDict = groupLanguageNameByLanguageCode(result);
        console.log(languageDict);
        console.log(languageNameDict);
    })
    .catch(console.error);

    // Create root element
    var root = am5.Root.new("chartdiv");

    // Set themes (optional, for better visuals)
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create map chart
    var chart = root.container.children.push(
        am5map.MapChart.new(root, {
            panX: "rotateX",     // Flat panning (horizontal drag)
            panY: "translateY",        // Flat panning (vertical drag)
            wheelY: "zoom",      // Explicitly enable mouse wheel zoom (default, but good to set)
            wheelX: "none",      // Disable horizontal wheel (optional, default is none)
            minZoomLevel: 1,     // Optional: Prevent zooming out too far (1 = full world view)
            maxZoomLevel: 32,     // Optional: Allow deep zoom (adjust as needed)
            projection: am5map.geoMercator()
        })
    );

    // Create polygon series for countries
    var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            exclude: ["AQ"] // Exclude Antarctica, because it's ugly lol
        })
    );

    // Configure polygon template
    polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
        fill: am5.color(0xbbbbbb), // Default fill color
        stroke: am5.color(0x000000), // Black border color
        strokeWidth: 1
    });

    // Hover state (optional)
    polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(getRandomColor()) //random color each time you load the page
    });

    // Click event (attached to template)
    polygonSeries.mapPolygons.template.events.on("click", (ev) => onClick(ev));

    // Add zoom control (optional)
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
}

//===========================================//
// functions
//===========================================//

async function onClick(ev) {
    var dataItem = ev.target.dataItem;
    var countryName = dataItem.get("name");
    var countryId = dataItem.get("id");   // ISO 2-letter code, e.g. "FR"

    if (!countryName) {
        countryName = dataItem.dataContext?.name || "Unknown";
    }
    if (!countryId) {
        countryId = dataItem.dataContext?.id || "N/A";
    }

    // Use a reliable flag CDN (SVG for scalability; fallback to PNG if needed)
    var flagUrl = `https://flagcdn.com/${countryId.toLowerCase()}.svg`;
    
    var IPAs = await GetIPAByCountryCode(countryId);

    var info = getInfoPanel(countryName, flagUrl, IPAs);

    document.getElementById("info-panel").innerHTML = info;
    
    // Add click event listeners to language buttons
    const languageButtons = document.querySelectorAll('.language-btn');
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const languageIndex = parseInt(this.getAttribute('data-language-index'));
            displayIPAForLanguage(languageIndex, IPAs);
            
            // Optional: Highlight the selected button
            languageButtons.forEach(btn => btn.style.backgroundColor = '#535455ff');
            this.style.backgroundColor = '#0056b3';
        });
    });
    
    // Automatically click the first language button if it exists
    if (languageButtons.length > 0) {
        languageButtons[0].click();
    }
    
    location.hash = "#country-detail";
}

function getRandomColor() {
    var r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
    } while (max - min < 30 && max - min > 230); // condition to not have grey colors or too flashy
    return '#' +
        r.toString(16).padStart(2, '0').toUpperCase() +
        g.toString(16).padStart(2, '0').toUpperCase() +
        b.toString(16).padStart(2, '0').toUpperCase();
}

// Function to load and parse the CSV
async function loadPhoibleData() {
    const url = 'https://raw.githubusercontent.com/phoible/dev/refs/heads/master/data/phoible.csv';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        // Parse with PapaParse (async callback style for large files)
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true, 
                dynamicTyping: true, // Auto-convert numbers/strings
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.errors.length > 0) {
                        reject(results.errors);
                    } else {
                        resolve(results.data); 
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error loading PHOIBLE data:', error);
        return [];
    }
}

function groupPhonemesByLanguage(data) {
    const grouped = {};
    data.forEach(row => {
        const lang = row.ISO6393 || row.Glottocode; // Use ISO or Glottocode as key
        if (!grouped[lang]) grouped[lang] = new Set();
        grouped[lang].add(row.Phoneme); // Add unique IPA symbols
    });
    return grouped; 
}

function groupLanguageNameByLanguageCode(data) {
    const grouped = {};
    data.forEach(row => {
        const lang = row.ISO6393 || row.Glottocode; // Use ISO or Glottocode as key
        // Only store the first language name encountered for each language code
        if (!grouped[lang]) {
            grouped[lang] = row.LanguageName;
        }
    });
    return grouped; 
}

async function GetIPAByCountryCode(countrycode) {
    var codes;
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${countrycode}`);
    const data = await res.json();
    const country = data[0];
    // Official languages (ISO 639-1 or 2)
    const languages = country.languages;
    // Codes
    codes = Object.keys(languages);
    codes.forEach((code, index) => {
        if (code === "ara") {
            codes[index] = "arb";
        }
    });
    
    if (typeof specialCountries[countrycode] != 'undefined')
    {
        //remove this code
        codes = specialCountries[countrycode];
    }

    //console.log(codes);

    var IPAList = [];
    var LanguageNameList = [];
    codes.forEach((code) => { 
        IPAList.push(languageDict[code]);  
        LanguageNameList.push(languageNameDict[code]);
    });

    //console.log(IPAList);
    //console.log(LanguageNameList);
    return { IPAList, LanguageNameList };
}

function getInfoPanel(countryName, flagUrl, IPAs) {
    console.log(IPAs);
    
    // Create language buttons from LanguageNameList
    var languageButtons = '';
    if (IPAs && IPAs.LanguageNameList && IPAs.LanguageNameList.length > 0) {
        languageButtons = '<div class="language-buttons" style="margin: 15px 0;">';
        IPAs.LanguageNameList.forEach((languageName, index) => {
            if (languageName) {
                languageButtons += `<button class="language-btn" data-language-index="${index}" style="margin: 5px; padding: 8px 16px; text-align: center; line-height: 1; vertical-align: middle;">${languageName}</button>`;
            }
        });
        languageButtons += '</div>';
        console.log(IPAs);
    }
    
    var info = `
        <h2 class="major">
            <img src="${flagUrl}" alt="${countryName} Flag" width="32" height="24" style="vertical-align: middle; margin-right: 10px;">
            ${countryName}
        </h2>
        ${languageButtons}
        <div id="ipa-display" style="margin-top: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 5px; display: none;">
            <h3>IPA Symbols:</h3>
            <div id="ipa-content"></div>
        </div>
    `;
    return info;
}

function displayIPAForLanguage(languageIndex, IPAs) {
    const ipaDisplay = document.getElementById('ipa-display');
    const ipaContent = document.getElementById('ipa-content');
    
    if (IPAs && IPAs.IPAList && IPAs.IPAList[languageIndex]) {
        const ipaSet = IPAs.IPAList[languageIndex];
        const ipaArray = Array.from(ipaSet); // Convert Set to Array
        
        // Build IPA chart table
        const ipaTable = buildIPATable(ipaArray);
        ipaContent.innerHTML = ipaTable;
        ipaDisplay.style.display = 'block';
    } else {
        ipaContent.textContent = 'No IPA data available for this language';
        ipaDisplay.style.display = 'block';
    }
}

function detectMultiConsonants(ipaSymbols) {
    const multiConsonants = {};
    
    // Common IPA consonant symbols (base consonants)
    const baseConsonants = new Set([
        'p', 'b', 't', 'd', 'k', 'g', 'q', 'ɢ', 'ʔ',
        'm', 'ɱ', 'n', 'ɳ', 'ɲ', 'ŋ', 'ɴ',
        'ʙ', 'r', 'ʀ',
        'ⱱ', 'ɾ', 'ɽ',
        'ɸ', 'β', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'ʂ', 'ʐ', 'ç', 'ʝ', 'x', 'ɣ', 'χ', 'ʁ', 'ħ', 'ʕ', 'h', 'ɦ',
        'ɬ', 'ɮ',
        'ʋ', 'ɹ', 'ɻ', 'j', 'ɰ',
        'l', 'ɭ', 'ʎ', 'ʟ'
    ]);
    
    // Common diacritics and modifiers that can form multi-consonants
    const modifiers = new Set([
        'ʲ', 'ʷ', 'ˠ', 'ˤ', 'ʰ', 'ʱ', 'ⁿ', 'ˡ', '̪', '̼', '̺', '̻', '̹', '̜', '̟', '̠', '̤', '̰', '̴', '̝', '̞', '̘', '̙', '̚'
    ]);
    
    ipaSymbols.forEach(symbol => {
        // Check for multi-character symbols
        if (symbol.length > 1) {
            // Case 1: Base consonant + modifier (e.g., mʲ, tʃ, dʒ)
            const firstChar = symbol[0];
            const rest = symbol.slice(1);
            
            if (baseConsonants.has(firstChar)) {
                if (!multiConsonants[firstChar]) {
                    multiConsonants[firstChar] = [];
                }
                multiConsonants[firstChar].push(symbol);
            }
            // Case 2: Common affricates and clusters
            else if (symbol.includes('tʃ') || symbol.includes('dʒ') || symbol.includes('ts') || symbol.includes('dz')) {
                // Extract the first consonant for placement
                const firstConsonant = symbol[0];
                if (!multiConsonants[firstConsonant]) {
                    multiConsonants[firstConsonant] = [];
                }
                multiConsonants[firstConsonant].push(symbol);
            }
        }
    });
    
    return multiConsonants;
}

function detectMultiVowels(ipaSymbols) {
    const multiVowels = {};
    
    // Common IPA vowel symbols (base vowels)
    const baseVowels = new Set([
        'i', 'y', 'ɨ', 'ʉ', 'ɯ', 'u',
        'ɪ', 'ʏ', 'ʊ', 'e', 'ø', 'ɘ', 'ɵ', 'ɤ', 'o',
        'ə', 'ɛ', 'œ', 'ɜ', 'ɞ', 'ʌ', 'ɔ', 'æ', 'ɶ', 'a', 'ɐ'
    ]);
    
    // Common diacritics and modifiers that can form multi-vowels
    const modifiers = new Set([
        'ʲ', 'ʷ', 'ˠ', 'ˤ', 'ʰ', 'ʱ', 'ⁿ', 'ˡ', '̪', '̼', '̺', '̻', '̹', '̜', '̟', '̠', '̤', '̰', '̴', '̝', '̞', '̘', '̙', '̚',
        'ː', 'ˑ', '̆', '̋', 'ˏ', 'ˊ', '̌', '̀', '́', '̂', '̄', '᷄', '᷅', '᷆', '᷇', '᷈', '᷉', '⁼', 'ʼ', 'ʾ', 'ʿ'
    ]);
    
    ipaSymbols.forEach(symbol => {
        // Check for multi-character symbols
        if (symbol.length > 1) {
            // Case 1: Base vowel + modifier (e.g., iː, e̯, oʲ)
            const firstChar = symbol[0];
            const rest = symbol.slice(1);
            
            if (baseVowels.has(firstChar)) {
                if (!multiVowels[firstChar]) {
                    multiVowels[firstChar] = [];
                }
                multiVowels[firstChar].push(symbol);
            }
            // Case 2: Diphthongs and vowel clusters
            else if (symbol.includes('ai') || symbol.includes('au') || symbol.includes('ei') || symbol.includes('oi') || symbol.includes('ui')) {
                // Extract the first vowel for placement
                const firstVowel = symbol[0];
                if (baseVowels.has(firstVowel)) {
                    if (!multiVowels[firstVowel]) {
                        multiVowels[firstVowel] = [];
                    }
                    multiVowels[firstVowel].push(symbol);
                }
            }
        }
    });
    
    return multiVowels;
}

// Test function for multi-consonant detection
function testMultiConsonantDetection() {
    const testSymbols = ['p', 'b', 't', 'd', 'm', 'n', 'ts', 'tʃ', 'dʒ', 'mʲ', 'kʷ', 'sʲ', 'zʲ'];
    const result = detectMultiConsonants(testSymbols);
    console.log('Test symbols:', testSymbols);
    console.log('Detected multi-consonants:', result);
    return result;
}

function testMultiVowelDetection() {
    const testSymbols = ['i', 'e', 'a', 'o', 'u', 'iː', 'eː', 'aː', 'oː', 'uː', 'ai', 'au', 'ei', 'oi', 'ui'];
    const result = detectMultiVowels(testSymbols);
    console.log('Test vowel symbols:', testSymbols);
    console.log('Detected multi-vowels:', result);
    return result;
}

function buildIPATable(ipaSymbols) {
    // Detect multi-consonant combinations
    const multiConsonants = detectMultiConsonants(ipaSymbols);
    console.log('IPA Symbols:', ipaSymbols);
    console.log('Detected multi-consonants:', multiConsonants);
    
    // Detect multi-vowel combinations
    const multiVowels = detectMultiVowels(ipaSymbols);
    console.log('Detected multi-vowels:', multiVowels);
    
    // Define IPA chart structure with categories and symbols
    const ipaChart = {
        'Pulmonic Consonants': {
            'columnHeaders': ['Bilabial', 'Labiodental', 'Dental', 'Alveolar', 'Post alveolar', 'Retroflex', 'Palatal', 'Velar', 'Uvular', 'Pharyngeal', 'Glottal'],
            'rowHeaders': ['Plosive', 'Nasal', 'Trill', 'Tap or Flap', 'Fricative', 'Lateral Fricative', 'Approximant', 'Lateral Approximant'],
            'data': [
                [['p', 'b'], ['', ''], ['', ''], ['t', 'd'], ['', ''], ['ʈ', 'ɖ'], ['c', 'ɟ'], ['k', 'g'], ['q', 'ɢ'], ['', ''], ['ʔ', '']],
                [['', 'm'], ['', 'ɱ'], ['', ''], ['', 'n'], ['', ''], ['', 'ɳ'], ['', 'ɲ'], ['', 'ŋ'], ['', 'ɴ'], ['', ''], ['', '']],
                [['', 'ʙ'], ['', ''], ['', ''], ['', 'r'], ['', ''], ['', ''], ['', ''], ['', ''], ['', 'ʀ'], ['', ''], ['', '']],
                [['', ''], ['', 'ⱱ'], ['', ''], ['', 'ɾ'], ['', ''], ['', 'ɽ'], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
                [['ɸ', 'β'], ['f', 'v'], ['θ', 'ð'], ['s', 'z'], ['ʃ', 'ʒ'], ['ʂ', 'ʐ'], ['ç', 'ʝ'], ['x', 'ɣ'], ['χ', 'ʁ'], ['ħ', 'ʕ'], ['h', 'ɦ']],
                [['', ''], ['', ''], ['', ''], ['ɬ', 'ɮ'], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
                [['', ''], ['', 'ʋ'], ['', ''], ['', 'ɹ'], ['', ''], ['', 'ɻ'], ['', 'j'], ['', 'ɰ'], ['', ''], ['', ''], ['', '']],
                [['', ''], ['', ''], ['', ''], ['', 'l'], ['', ''], ['', 'ɭ'], ['', 'ʎ'], ['', 'ʟ'], ['', ''], ['', ''], ['', '']]
            ]
        },
        'Vowels': {
            // Vowel data positioned according to trapezoid path intersections
            // Front vowels (left section)
            'i': { x: 70, y: 55, rounded: false }, 'y': { x: 100, y: 55, rounded: true },
            'ɪ': { x: 130, y: 105, rounded: false }, 'ʏ': { x: 160, y: 105, rounded: true },
            'e': { x: 110, y: 155, rounded: false }, 'ø': { x: 140, y: 155, rounded: true },
            'ɛ': { x: 150, y: 240, rounded: false }, 'œ': { x: 180, y: 240, rounded: true },
            'æ': { x: 180, y: 290, rounded: false }, 'ɶ': { x: 220, y: 330, rounded: true },
            'a': { x: 190, y: 330, rounded: true },

            // Central vowels (middle section)
            'ɨ': { x: 197, y: 55, rounded: false }, 'ʉ': { x: 230, y: 55, rounded: true },
            'ɘ': { x: 210, y: 155, rounded: false }, 'ɵ': { x: 240, y: 155, rounded: true },
            'ə': { x: 230, y: 200, rounded: false }, 'ɜ': { x: 230, y: 240, rounded: true },
            'ɞ': { x: 260, y: 240, rounded: true }, 'ɐ': { x: 260, y: 290, rounded: false },

            // Back vowels (right section)
            'ɯ': { x: 320, y: 55, rounded: false }, 'u': { x: 350, y: 55, rounded: true },
            'ʊ': { x: 290, y: 110, rounded: false }, 'o': { x: 350, y: 155, rounded: true },
            'ɔ': { x: 350, y: 240, rounded: false }, 'ɤ': { x: 320, y: 155, rounded: true },
            'ʌ': { x: 320, y: 240, rounded: false }, 'ɑ': { x: 320, y: 330, rounded: false }, 
            'ɒ': { x: 350, y: 330, rounded: true }
        }
    };
    
    let tableHTML = '<div class="ipa-chart-container">';
    
    // Build table for each category
    Object.keys(ipaChart).forEach(category => {
        tableHTML += `<h3 class="ipa-category">${category}</h3>`;
        
        if (category === 'Vowels') {
            // Use SVG trapezoid for vowels
            tableHTML += buildVowelTrapezoidSVG(ipaSymbols, ipaChart[category], multiVowels);
        } else {
            // Add table wrapper for horizontal scrolling
            tableHTML += '<div class="ipa-table-wrapper">';
            tableHTML += '<table class="ipa-table">';
        
            const categoryData = ipaChart[category];
            
            // Check if this category has the new structure (with columnHeaders, rowHeaders, data)
            if (categoryData.columnHeaders && categoryData.rowHeaders && categoryData.data) {
                // Header row with column headers (each spans 2 columns for voiceless/voiced pairs)
                tableHTML += '<tr><th></th>';
                categoryData.columnHeaders.forEach(header => {
                    tableHTML += `<th class="ipa-subcategory" colspan="2">${header}</th>`;
                });
                tableHTML += '</tr>';
                
                // Data rows
                categoryData.data.forEach((rowData, rowIndex) => {
                    tableHTML += '<tr>';
                    
                    // Row header
                    tableHTML += `<td class="ipa-row-label">${categoryData.rowHeaders[rowIndex]}</td>`;
                    
                    // Data cells (each column has 2 sub-cells)
                    rowData.forEach(columnData => {
                        columnData.forEach(symbol => {
                            if (symbol && ipaSymbols.includes(symbol)) {
                                let cellContent = `<div class="consonant-cell-wrapper"><span class="base-symbol" title="${symbol}">${symbol}</span>`;
                                
                                // Check if this symbol has multi-consonant variants
                                if (multiConsonants[symbol] && multiConsonants[symbol].length > 0) {
                                    const presentMultiConsonants = multiConsonants[symbol]
                                        .filter(mc => ipaSymbols.includes(mc));
                                    
                                    if (presentMultiConsonants.length > 0) {
                                        const multiConsonantList = presentMultiConsonants.join(', ');
                                        cellContent += `<span class="multi-consonant-indicator" data-multi-consonants="${multiConsonantList}">+</span>`;
                                    }
                                }
                                
                                cellContent += `</div>`;
                                tableHTML += `<td class="ipa-symbol present">${cellContent}</td>`;
                            } else if (symbol) {
                                tableHTML += `<td class="ipa-symbol absent" title="${symbol}">${symbol}</td>`;
                            } else {
                                tableHTML += '<td class="ipa-symbol empty"></td>';
                            }
                        });
                    });
                    
                    tableHTML += '</tr>';
                });
            } else {
                // Old structure for other categories
                const subcategories = categoryData;
                const subcategoryKeys = Object.keys(subcategories);
                
                // Header row with subcategories
                tableHTML += '<tr><th></th>';
                subcategoryKeys.forEach(subcat => {
                    tableHTML += `<th class="ipa-subcategory">${subcat}</th>`;
                });
                tableHTML += '</tr>';
                
                // Find all unique symbols in this category
                const allCategorySymbols = [];
                subcategoryKeys.forEach(subcat => {
                    allCategorySymbols.push(...subcategories[subcat]);
                });
                
                // Create rows for symbols
                const maxRows = Math.max(...subcategoryKeys.map(subcat => subcategories[subcat].length));
                
                for (let row = 0; row < maxRows; row++) {
                    tableHTML += '<tr>';
                    
                    // Row label (could be articulation type for consonants, vowel height, etc.)
                    tableHTML += `<td class="ipa-row-label">${getRowLabel(category, row)}</td>`;
                    
                    // Cells for each subcategory
                    subcategoryKeys.forEach(subcat => {
                        const symbols = subcategories[subcat];
                        const symbol = symbols[row];
                        
                        if (symbol && ipaSymbols.includes(symbol)) {
                            tableHTML += `<td class="ipa-symbol present" title="${symbol}">${symbol}</td>`;
                        } else if (symbol) {
                            tableHTML += `<td class="ipa-symbol absent" title="${symbol}">${symbol}</td>`;
                        } else {
                            tableHTML += '<td class="ipa-symbol empty"></td>';
                        }
                    });
                    
                    tableHTML += '</tr>';
                }
            }
            
            tableHTML += '</table>';
            tableHTML += '</div>'; // Close table wrapper
        }
    });
    
    tableHTML += '</div>';
    
    // Add CSS styling for responsive tables
    tableHTML += `
        <style>
            .ipa-chart-container {
                max-width: 100%;
                overflow-x: auto;
            }
            
            .ipa-table-wrapper {
                overflow-x: auto;
                max-width: 100%;
                margin: 10px 0;
            }
            
            .ipa-table {
                border-collapse: collapse;
                min-width: 800px;
                font-size: 14px;
            }
            
            .ipa-table th, .ipa-table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
                min-width: 30px;
            }
            
            .ipa-category {
                margin: 20px 0 10px 0;
                color: #333;
            }
            
            .ipa-subcategory {
                background-color: #f5f5f5;
                font-weight: bold;
            }
            
            .ipa-subheader {
                background-color: #f9f9f9;
                font-size: 12px;
                font-weight: normal;
            }
            
            .ipa-row-label {
                background-color: #f5f5f5;
                font-weight: bold;
                text-align: left;
                min-width: 120px;
            }
            
            .ipa-symbol.present {
                background-color: #d4edda;
                color: #155724;
                font-weight: bold;
                position: relative;
                overflow: visible;
                z-index: 1;
            }
            
            .ipa-symbol.absent {
                background-color: #f8f9fa;
                color: #6c757d;
            }
            
            .ipa-symbol.empty {
                background-color: #ffffff;
            }
            
            .base-symbol {
                display: block;
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 2px;
            }
            
            .consonant-cell-wrapper {
                position: relative;
                display: inline-block;
                width: 100%;
                text-align: center;
            }
            
            .multi-consonant-indicator {
                position: absolute;
                top: -10px;
                right: -9px;
                background-color: #007bff;
                color: white;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                font-size: 12px;
                font-weight: bold;
                cursor: help;
                transition: all 0.2s ease;
                z-index: 1;
            }
            
            .multi-consonant-indicator:hover {
                background-color: #0056b3;
                transform: scale(1.2);
            }
            
            .multi-consonant-indicator::after {
                content: attr(data-multi-consonants);
                position: absolute;
                bottom: 125%;
                left: 50%;
                transform: translateX(-50%);
                background-color: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: normal;
                white-space: nowrap;
                opacity: var(--tooltip-opacity, 0);
                visibility: var(--tooltip-visibility, hidden);
                transition: opacity 0.3s ease, visibility 0.3s ease;
                z-index: 10000;
                pointer-events: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                max-width: 200px;
                word-wrap: break-word;
                white-space: normal;
            }
            
            .multi-consonant-indicator::before {
                content: '';
                position: absolute;
                bottom: 115%;
                left: 50%;
                transform: translateX(-50%);
                border: 6px solid transparent;
                border-top-color: #333;
                opacity: var(--tooltip-opacity, 0);
                visibility: var(--tooltip-visibility, hidden);
                transition: opacity 0.3s ease, visibility 0.3s ease;
                z-index: 9999;
                pointer-events: none;
            }
            
            .multi-consonant-indicator:hover::after,
            .multi-consonant-indicator:hover::before {
                opacity: 1;
                visibility: visible;
            }
            
            .multi-consonant-indicator:hover::after {
                transition-delay: 0.2s;
            }
            
            .multi-consonant-indicator:hover::before {
                transition-delay: 0.2s;
            }
        </style>
    `;
    
    // Add JavaScript for interactive tooltips
    tableHTML += `
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const indicators = document.querySelectorAll('.multi-consonant-indicator');
                
                indicators.forEach(indicator => {
                    let tooltipTimeout;
                    let isTooltipVisible = false;
                    
                    indicator.addEventListener('mouseenter', function() {
                        clearTimeout(tooltipTimeout);
                        // Force the tooltip to show
                        this.style.setProperty('--tooltip-opacity', '1');
                        this.style.setProperty('--tooltip-visibility', 'visible');
                    });
                    
                    indicator.addEventListener('mouseleave', function() {
                        // Keep tooltip visible for 2 seconds after mouse leaves
                        tooltipTimeout = setTimeout(() => {
                            this.style.setProperty('--tooltip-opacity', '0');
                            this.style.setProperty('--tooltip-visibility', 'hidden');
                        }, 2000);
                    });
                    
                    // Click to toggle tooltip
                    indicator.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (isTooltipVisible) {
                            this.style.setProperty('--tooltip-opacity', '0');
                            this.style.setProperty('--tooltip-visibility', 'hidden');
                            isTooltipVisible = false;
                        } else {
                            this.style.setProperty('--tooltip-opacity', '1');
                            this.style.setProperty('--tooltip-visibility', 'visible');
                            isTooltipVisible = true;
                            
                            // Auto-hide after 5 seconds
                            setTimeout(() => {
                                this.style.setProperty('--tooltip-opacity', '0');
                                this.style.setProperty('--tooltip-visibility', 'hidden');
                                isTooltipVisible = false;
                            }, 5000);
                        }
                    });
                });
                
                // Hide all tooltips when clicking elsewhere
                document.addEventListener('click', function() {
                    indicators.forEach(indicator => {
                        indicator.style.setProperty('--tooltip-opacity', '0');
                        indicator.style.setProperty('--tooltip-visibility', 'hidden');
                    });
                });
            });
        </script>
    `;
    
    return tableHTML;
}

function buildVowelTrapezoidSVG(ipaSymbols, vowelData, multiVowels) {
    const svgWidth = 400;
    const svgHeight = 400;
    
    let svgHTML = `
        <div class="vowel-trapezoid-container" style="position: relative;">
            <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
                <!-- Background image with fallback -->
                
                <!-- Draw trapezoid shape as fallback if image doesn't load -->
                <g>
                    <!-- Trapezoid outline matching image -->
                    <path d="M 70 60 L 330 60 L 330 330 L 200 330 L 70 60 M 197 60 L 268 329 M 115 153 L 330 153 M 160 246 L 330 246" 
                          fill="none" stroke="#000" stroke-width="1.5"/>
                    
                    <text x="10" y="60" font-size="12" fill="#000">Close</text>
                    <text x="10" y="160" font-size="12" fill="#000" >Close-mid</text>
                    <text x="10" y="250" font-size="12" fill="#000" >Open-mid</text>
                    <text x="10" y="340" font-size="12" fill="#000" >Open</text>

                    <text x="70" y="25" font-size="12" fill="#000" text-anchor="middle">Front</text>
                    <text x="200" y="25" font-size="12" fill="#000" text-anchor="middle">Central</text>
                    <text x="330" y="25" font-size="12" fill="#000" text-anchor="middle">Back</text>
                </g>
                
                <!-- Vowel symbols -->
    `;
    
    // Add each vowel symbol at its position
    Object.keys(vowelData).forEach(vowelSymbol => {
        const vowel = vowelData[vowelSymbol];
        const isPresent = ipaSymbols.includes(vowelSymbol);
        
        svgHTML += `
            <g class="vowel-symbol ${isPresent ? 'present' : 'absent'}" transform="translate(${vowel.x}, ${vowel.y})">
                <circle cx="0" cy="0" r="15" fill="${isPresent ? '#d4edda' : '#f8f9fa'}" 
                        stroke="${isPresent ? '#28a745' : '#6c757d'}" stroke-width="2"/>
                <text x="0" y="5" text-anchor="middle" font-size="16" font-weight="bold" 
                      fill="${isPresent ? '#155724' : '#6c757d'}">${vowelSymbol}</text>
            </g>
        `;
    });
    
    svgHTML += `
            </svg>
    `;
    
    // Add HTML overlay for multi-vowel indicators
    Object.keys(vowelData).forEach(vowelSymbol => {
        const vowel = vowelData[vowelSymbol];
        const isPresent = ipaSymbols.includes(vowelSymbol);
        
        if (isPresent && multiVowels[vowelSymbol] && multiVowels[vowelSymbol].length > 0) {
            const presentMultiVowels = multiVowels[vowelSymbol]
                .filter(mv => ipaSymbols.includes(mv));
            
            if (presentMultiVowels.length > 0) {
                const multiVowelList = presentMultiVowels.join(', ');
                // SVG coordinates should already be in the correct scale
                const indicatorX = vowel.x + 12;
                const indicatorY = vowel.y - 12;
                
                svgHTML += `
                    <span class="multi-vowel-indicator" 
                          data-multi-vowels="${multiVowelList}"
                          style="position: absolute; 
                                 left: ${indicatorX}px; 
                                 top: ${indicatorY}px; 
                                 transform: translate(-50%, -50%);
                                 z-index: 10;">
                        <span style="display: inline-block; 
                                   width: 16px; 
                                   height: 16px; 
                                   background-color: #007bff; 
                                   border: 1px solid #0056b3; 
                                   border-radius: 50%; 
                                   color: white; 
                                   font-size: 12px; 
                                   font-weight: bold; 
                                   text-align: center; 
                                   line-height: 16px; 
                                   cursor: pointer;">+</span>
                    </span>
                `;
            }
        }
    });
    
    svgHTML += `
        </div>
        <style>
            .vowel-trapezoid-container {
                margin: 20px auto;
                text-align: center;
                position: relative;
                width: ${svgWidth}px;
                height: ${svgHeight}px;
            }
            
            .vowel-symbol {
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .vowel-symbol.present circle {
                fill: #d4edda;
                stroke: #28a745;
            }
            
            .vowel-symbol.present text {
                fill: #155724;
            }
            
            .vowel-symbol.absent circle {
                fill: #f8f9fa;
                stroke: #6c757d;
                opacity: 0.6;
            }
            
            .vowel-symbol.absent text {
                fill: #6c757d;
                opacity: 0.6;
            }
            
            .vowel-symbol:hover circle {
                fill: #c3e6cb;
                stroke: #28a745;
                transform: scale(1.1);
            }
            
            .multi-vowel-indicator {
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .multi-vowel-indicator:hover span {
                background-color: #0056b3;
                transform: scale(1.2);
            }
            
            .multi-vowel-indicator::after {
                content: attr(data-multi-vowels);
                position: absolute;
                bottom: 125%;
                left: 50%;
                transform: translateX(-50%);
                background-color: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: normal;
                white-space: nowrap;
                opacity: var(--tooltip-opacity, 0);
                visibility: var(--tooltip-visibility, hidden);
                transition: opacity 0.3s ease, visibility 0.3s ease;
                z-index: 10000;
                pointer-events: none;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                white-space: normal;
                max-width: 200px;
                text-align: center;
            }
            
            .multi-vowel-indicator::before {
                content: '';
                position: absolute;
                bottom: 115%;
                left: 50%;
                transform: translateX(-50%);
                border: 6px solid transparent;
                border-top-color: #333;
                opacity: var(--tooltip-opacity, 0);
                visibility: var(--tooltip-visibility, hidden);
                transition: opacity 0.3s ease, visibility 0.3s ease;
                z-index: 9999;
                pointer-events: none;
            }
            
            .multi-vowel-indicator:hover::after,
            .multi-vowel-indicator:hover::before {
                opacity: 1;
                visibility: visible;
            }
            
            .multi-vowel-indicator:hover::after {
                transition-delay: 0.2s;
            }
            
            .multi-vowel-indicator:hover::before {
                transition-delay: 0.2s;
            }
        </style>
    `;
    
    // Add JavaScript for interactive tooltips
    svgHTML += `
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const indicators = document.querySelectorAll('.multi-vowel-indicator');
                
                indicators.forEach(indicator => {
                    let tooltipTimeout;
                    let isTooltipVisible = false;
                    
                    indicator.addEventListener('mouseenter', function() {
                        clearTimeout(tooltipTimeout);
                        // Force the tooltip to show
                        this.style.setProperty('--tooltip-opacity', '1');
                        this.style.setProperty('--tooltip-visibility', 'visible');
                    });
                    
                    indicator.addEventListener('mouseleave', function() {
                        // Keep tooltip visible for 2 seconds after mouse leaves
                        tooltipTimeout = setTimeout(() => {
                            this.style.setProperty('--tooltip-opacity', '0');
                            this.style.setProperty('--tooltip-visibility', 'hidden');
                        }, 2000);
                    });
                    
                    // Click to toggle tooltip
                    indicator.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (isTooltipVisible) {
                            this.style.setProperty('--tooltip-opacity', '0');
                            this.style.setProperty('--tooltip-visibility', 'hidden');
                            isTooltipVisible = false;
                        } else {
                            this.style.setProperty('--tooltip-opacity', '1');
                            this.style.setProperty('--tooltip-visibility', 'visible');
                            isTooltipVisible = true;
                            
                            // Auto-hide after 5 seconds
                            setTimeout(() => {
                                this.style.setProperty('--tooltip-opacity', '0');
                                this.style.setProperty('--tooltip-visibility', 'hidden');
                                isTooltipVisible = false;
                            }, 5000);
                        }
                    });
                });
                
                // Hide all tooltips when clicking elsewhere
                document.addEventListener('click', function() {
                    indicators.forEach(indicator => {
                        indicator.style.setProperty('--tooltip-opacity', '0');
                        indicator.style.setProperty('--tooltip-visibility', 'hidden');
                    });
                });
            });
        </script>
    `;
    
    return svgHTML;
}

function getRowLabel(category, rowIndex) {
    // This is a simplified version - you could expand this with proper articulation labels
    const labels = {
        'Pulmonic Consonants': ['Plosive', 'Nasal', 'Trill', 'Tap or Flap', 'Fricative', 'Lateral Fricative', 'Approximant', 'Lateral Approximant'],
        'Vowels': ['Close', 'Near-close', 'Close-mid', 'Mid', 'Open-mid', 'Near-open', 'Open'],
        'Non-Pulmonic Consonants': ['Bilabial', 'Dental', 'Alveolar', 'Palatal', 'Velar', 'Uvular', 'Glottal'],
        'Other Symbols': ['Primary', 'Secondary', 'Tertiary', 'Quaternary']
    };
    
    return labels[category]?.[rowIndex] || '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
