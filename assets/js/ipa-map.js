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
        <div id="ipa-display" style="margin-top: 15px; padding: 10px; background-color: #565758ff; border-radius: 5px; display: none;">
            <h3>IPA Symbols:</h3>
            <p id="ipa-content"></p>
        </div>
    `;
    return info;
}

function displayIPAForLanguage(languageIndex, IPAs) {
    const ipaDisplay = document.getElementById('ipa-display');
    const ipaContent = document.getElementById('ipa-content');
    
    if (IPAs && IPAs.IPAList && IPAs.IPAList[languageIndex]) {
        const ipaSet = IPAs.IPAList[languageIndex];
        const ipaArray = Array.from(ipaSet).sort(); // Convert Set to Array and sort alphabetically
        const ipaString = ipaArray.join(' '); // Join with spaces for better readability
        
        ipaContent.textContent = ipaString;
        ipaDisplay.style.display = 'block';
    } else {
        ipaContent.textContent = 'No IPA data available for this language';
        ipaDisplay.style.display = 'block';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
