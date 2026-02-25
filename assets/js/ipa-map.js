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
        <style>
            .ipa-chart-container {
                font-family: Arial, sans-serif;
                overflow-x: auto;
            }
            
            .ipa-category {
                color: #333;
                border-bottom: 2px solid #007bff;
                padding-bottom: 5px;
                margin-top: 20px;
                margin-bottom: 10px;
            }
            
            .ipa-table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 20px;
                background-color: white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .ipa-table th, .ipa-table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
                min-width: 40px;
            }
            
            .ipa-table th {
                background-color: #f8f9fa;
                font-weight: bold;
                color: #495057;
            }
            
            .ipa-subcategory {
                font-size: 0.9em;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                max-width: 60px;
            }
            
            .ipa-row-label {
                background-color: #e9ecef;
                font-weight: bold;
                text-align: left;
                min-width: 100px;
            }
            
            .ipa-symbol {
                font-size: 1.2em;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .ipa-symbol.present {
                background-color: #d4edda;
                color: #155724;
                border: 2px solid #28a745;
            }
            
            .ipa-symbol.present:hover {
                background-color: #c3e6cb;
                transform: scale(1.1);
            }
            
            .ipa-symbol.absent {
                background-color: #f8f9fa;
                color: #6c757d;
                opacity: 0.6;
            }
            
            .ipa-symbol.empty {
                background-color: #ffffff;
            }
            
            @media (max-width: 768px) {
                .ipa-table {
                    font-size: 0.8em;
                }
                
                .ipa-subcategory {
                    writing-mode: horizontal-tb;
                    text-orientation: mixed;
                }
                
                .ipa-row-label {
                    min-width: 80px;
                    font-size: 0.8em;
                }
            }
        </style>
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

function buildIPATable(ipaSymbols) {
    // Define IPA chart structure with categories and symbols
    const ipaChart = {
        'Pulmonic Consonants': {
            'Bilabial': ['p', 'b', 'm', 'ɓ', 'ɗ', 'ʄ', 'ɠ', 'ʛ', 'ɸ', 'β', 'ʙ'],
            'Labiodental': ['f', 'v', 'ⱱ', 'ʋ'],
            'Dental': ['θ', 'ð', 'ɹ', 'ɺ', 'ɾ', 'ɫ'],
            'Alveolar': ['t', 'd', 'n', 't̪', 'd̪', 'n̪', 's', 'z', 'ɬ', 'ɮ', 'ɾ', 'ɹ', 'ɺ', 'ɫ'],
            'Postalveolar': ['ʃ', 'ʒ', 'ʂ', 'ʐ', 'ɕ', 'ʑ', 'tʃ', 'dʒ', 'tɕ', 'dʑ'],
            'Retroflex': ['ʈ', 'ɖ', 'ɳ', 'ɽ', 'ɭ', 'ɻ', 'ɽ̊', 'ɭ̊', 'ɻ̊'],
            'Palatal': ['c', 'ɟ', 'ɲ', 'ç', 'ʝ', 'ʎ', 'j', 'ɥ'],
            'Velar': ['k', 'g', 'ŋ', 'x', 'ɣ', 'ɰ', 'w'],
            'Uvular': ['q', 'ɢ', 'ɴ', 'χ', 'ʁ', 'ʀ', 'ʟ̝'],
            'Pharyngeal': ['ħ', 'ʕ', 'ʢ', 'ʡ'],
            'Glottal': ['ʔ', 'h', 'ɦ', 'ʜ', 'ʢ', 'ʡ']
        },
        'Vowels': {
            // Vowel data positioned according to trapezoid path intersections
            // Front vowels (left section)
            'i': { x: 70, y: 60, rounded: false }, 'y': { x: 100, y: 60, rounded: true },
            'ɪ': { x: 120, y: 110, rounded: false }, 'ʏ': { x: 150, y: 110, rounded: true },
            'e': { x: 110, y: 160, rounded: false }, 'ø': { x: 140, y: 160, rounded: true },
            'ɛ': { x: 130, y: 240, rounded: false }, 'œ': { x: 160, y: 240, rounded: true },
            'æ': { x: 170, y: 290, rounded: false }, 'ɶ': { x: 180, y: 320, rounded: true },
            'a': { x: 150, y: 320, rounded: true },

            // Central vowels (middle section)
            'ɨ': { x: 197, y: 60, rounded: false }, 'ʉ': { x: 230, y: 60, rounded: true },
            'ɘ': { x: 210, y: 160, rounded: false }, 'ɵ': { x: 240, y: 160, rounded: true },
            'ə': { x: 230, y: 200, rounded: false }, 'ɜ': { x: 230, y: 240, rounded: true },
            'ɞ': { x: 260, y: 240, rounded: true }, 'ɐ': { x: 250, y: 290, rounded: false },

            // Back vowels (right section)
            'ɯ': { x: 300, y: 60, rounded: false }, 'u': { x: 330, y: 60, rounded: true },
            'ʊ': { x: 280, y: 120, rounded: false }, 'o': { x: 330, y: 160, rounded: true },
            'ɔ': { x: 350, y: 240, rounded: false }, 'ɤ': { x: 300, y: 160, rounded: true },
            'ʌ': { x: 325, y: 240, rounded: false }, 'ɑ': { x: 300, y: 320, rounded: false }, 
            'ɒ': { x: 330, y: 320, rounded: true }
        },
        'Non-Pulmonic Consonants': {
            'Clicks': ['ǀ', 'ǁ', 'ǂ', 'ǃ', 'Ǆ'],
            'Implosives': ['ɓ', 'ɗ', 'ʄ', 'ɠ', 'ʛ'],
            'Ejectives': ['pʼ', 'tʼ', 'kʼ', 'sʼ', 'tsʼ', 'tɕʼ', 'tʃʼ', 'kʼ', 'qʼ', 'ʔʼ']
        },
        'Other Symbols': {
            'Diacritics': ['̩', '̯', '˞', '̤', '̰', '̼', '̪', '̺', '̻', '̹', '̜', '̟', '̠', '̩', '̯', '˞', '̤', '̰', '̼', '̪', '̺', '̻', '̹', '̜', '̟', '̠'],
            'Suprasegmentals': ['ˈ', 'ˌ', 'ː', 'ˑ', '̆', '‿', '͡', '͜', 'ˈ', 'ˌ', 'ː', 'ˑ', '̆', '‿', '͡', '͜']
        }
    };
    
    let tableHTML = '<div class="ipa-chart-container">';
    
    // Build table for each category
    Object.keys(ipaChart).forEach(category => {
        tableHTML += `<h3 class="ipa-category">${category}</h3>`;
        
        if (category === 'Vowels') {
            // Use SVG trapezoid for vowels
            tableHTML += buildVowelTrapezoidSVG(ipaSymbols, ipaChart[category]);
        } else {
            // Use regular table for other categories
            tableHTML += '<table class="ipa-table">';
        
            const subcategories = ipaChart[category];
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
            
            tableHTML += '</table>';
        }
    });
    
    tableHTML += '</div>';
    
    return tableHTML;
}

function buildVowelTrapezoidSVG(ipaSymbols, vowelData) {
    const svgWidth = 400;
    const svgHeight = 400;
    
    let svgHTML = `
        <div class="vowel-trapezoid-container">
            <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
                <!-- Background image with fallback -->
                
                <!-- Draw trapezoid shape as fallback if image doesn't load -->
                <g opacity="0.3">
                    <!-- Trapezoid outline matching image -->
                    <path d="M 70 60 L 330 60 L 330 330 L 200 330 L 70 60 M 197 60 L 268 329 M 115 153 L 330 153 M 160 246 L 330 246" 
                          fill="none" stroke="#000" stroke-width="1.5"/>
                    
                    <text x="50" y="60" font-size="12" fill="#000" text-anchor="end">Close</text>
                    <text x="50" y="120" font-size="12" fill="#000" text-anchor="end">Close-mid</text>
                    <text x="50" y="200" font-size="12" fill="#000" text-anchor="end">Open-mid</text>
                    <text x="50" y="280" font-size="12" fill="#000" text-anchor="end">Open</text>

                    <text x="30" y="370" font-size="10" fill="#000" text-anchor="middle">Front</text>
                    <text x="200" y="370" font-size="10" fill="#000" text-anchor="middle">Central</text>
                    <text x="370" y="370" font-size="10" fill="#000" text-anchor="middle">Back</text>
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
        </div>
        <style>
            .vowel-trapezoid-container {
                margin: 20px 0;
                text-align: center;
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
        </style>
    `;
    
    return svgHTML;
}

function getRowLabel(category, rowIndex) {
    // This is a simplified version - you could expand this with proper articulation labels
    const labels = {
        'Pulmonic Consonants': ['Plosive', 'Nasal', 'Fricative', 'Approximant', 'Trill', 'Tap', 'Lateral'],
        'Vowels': ['Close', 'Near-close', 'Close-mid', 'Mid', 'Open-mid', 'Near-open', 'Open'],
        'Non-Pulmonic Consonants': ['Bilabial', 'Dental', 'Alveolar', 'Palatal', 'Velar', 'Uvular', 'Glottal'],
        'Other Symbols': ['Primary', 'Secondary', 'Tertiary', 'Quaternary']
    };
    
    return labels[category]?.[rowIndex] || '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
