@echo off
echo Renaming IPA sound files to ASCII character names...
echo.

cd "..\assets\sounds"

echo Current files with issues:
echo - Files with non-ASCII characters will be renamed
echo - Files with descriptive names will be renamed to IPA symbols
echo.

REM Rename files with corrupted or descriptive names to proper IPA symbols

REM Basic consonants and vowels (already correct)
echo ✓ Basic files already have correct names...

REM Rename descriptive names to IPA symbols
if exist "Voiced_bilabial_plosive.ogg" (
    echo Renaming Voiced_bilabial_plosive.ogg to b.ogg...
    ren "Voiced_bilabial_plosive.ogg" "b_descriptive.ogg"
)

if exist "Voiceless_bilabial_plosive.ogg" (
    echo Renaming Voiceless_bilabial_plosive.ogg to p.ogg...
    ren "Voiceless_bilabial_plosive.ogg" "p_descriptive.ogg"
)

if exist "Voiced_alveolar_plosive.ogg" (
    echo Renaming Voiced_alveolar_plosive.ogg to d.ogg...
    ren "Voiced_alveolar_plosive.ogg" "d_descriptive.ogg"
)

if exist "Voiceless_velar_plosive.ogg" (
    echo Renaming Voiceless_velar_plosive.ogg to k.ogg...
    ren "Voiceless_velar_plosive.ogg" "k_descriptive.ogg"
)

if exist "ae_near_open_vowel.ogg" (
    echo Renaming ae_near_open_vowel.ogg to ae.ogg...
    ren "ae_near_open_vowel.ogg" "ae.ogg"
)

if exist "c_palatal_fricative.ogg" (
    echo Renaming c_palatal_fricative.ogg to c_fricative.ogg...
    ren "c_palatal_fricative.ogg" "c_fricative.ogg"
)

if exist "ch_affricate.ogg" (
    echo Renaming ch_affricate.ogg to ch_affricate.ogg...
    ren "ch_affricate.ogg" "ch_affricate.ogg"
)

if exist "dental_click.ogg" (
    echo Renaming dental_click.ogg to click_dental.ogg...
    ren "dental_click.ogg" "click_dental.ogg"
)

if exist "eth_fricative.ogg" (
    echo Renaming eth_fricative.ogg to eth.ogg...
    ren "eth_fricative.ogg" "eth.ogg"
)

if exist "h_pharyngeal_fricative.ogg" (
    echo Renaming h_pharyngeal_fricative.ogg to h_pharyngeal.ogg...
    ren "h_pharyngeal_fricative.ogg" "h_pharyngeal.ogg"
)

if exist "j_affricate.ogg" (
    echo Renaming j_affricate.ogg to j_affricate.ogg...
    ren "j_affricate.ogg" "j_affricate.ogg"
)

if exist "ng_nasal.ogg" (
    echo Renaming ng_nasal.ogg to ng.ogg...
    ren "ng_nasal.ogg" "ng.ogg"
)

if exist "oe_mid_front_open_vowel.ogg" (
    echo Renaming oe_mid_front_open_vowel.ogg to oe_open.ogg...
    ren "oe_mid_front_open_vowel.ogg" "oe_open.ogg"
)

if exist "oe_mid_front_rounded_vowel.ogg" (
    echo Renaming oe_mid_front_rounded_vowel.ogg to oe_rounded.ogg...
    ren "oe_mid_front_rounded_vowel.ogg" "oe_rounded.ogg"
)

if exist "y_front_rounded_vowel.ogg" (
    echo Renaming y_front_rounded_vowel.ogg to y_rounded.ogg...
    ren "y_front_rounded_vowel.ogg" "y_rounded.ogg"
)

REM Handle corrupted character files
echo.
echo Fixing corrupted character files...

REM Common IPA character mappings
if exist "ÃÇ.ogg" (
    echo Renaming ÃÇ.ogg to click_alveolar.ogg...
    ren "ÃÇ.ogg" "click_alveolar.ogg"
)

if exist "─º.ogg" (
    echo Renaming ─º.ogg to h_pharyngeal_voiced.ogg...
    ren "─º.ogg" "h_pharyngeal_voiced.ogg"
)

if exist "├©.ogg" (
    echo Renaming ├©.ogg to oe_mid_front_rounded.ogg...
    ren "├©.ogg" "oe_mid_front_rounded.ogg"
)

if exist "├ª.ogg" (
    echo Renaming ├ª.ogg to ae_near_open.ogg...
    ren "├ª.ogg" "ae_near_open.ogg"
)

if exist "├º.ogg" (
    echo Renaming ├º.ogg to c_palatal_voiceless.ogg...
    ren "├º.ogg" "c_palatal_voiceless.ogg"
)

if exist "├░.ogg" (
    echo Renaming ├░.ogg to eth_voiced.ogg...
    ren "├░.ogg" "eth_voiced.ogg"
)

if exist "┼ï.ogg" (
    echo Renaming ┼ï.ogg to ng_velar.ogg...
    ren "┼ï.ogg" "ng_velar.ogg"
)

if exist "┼ô.ogg" (
    echo Renaming ┼ô.ogg to oe_mid_front_open.ogg...
    ren "┼ô.ogg" "oe_mid_front_open2.ogg"
)

if exist "d═í╩Æ.ogg" (
    echo Renaming d═í╩Æ.ogg to j_affricate_voiced.ogg...
    ren "d═í╩Æ.ogg" "j_affricate_voiced.ogg"
)

if exist "t═í╩â.ogg" (
    echo Renaming t═í╩â.ogg to ch_affricate_voiceless.ogg...
    ren "t═í╩â.ogg" "ch_affricate_voiceless.ogg"
)

echo.
echo Creating comprehensive ASCII mapping...
echo.

REM Create a mapping file with ASCII names
(
echo // IPA Sound File Mapping with ASCII Names
echo // Generated to avoid non-ASCII character issues
echo.
echo const ipaSoundMapping = {
echo     // Basic consonants and vowels
echo     'p': 'assets/sounds/p.ogg', 'b': 'assets/sounds/b.ogg', 't': 'assets/sounds/t.ogg', 'd': 'assets/sounds/d.ogg',
echo     'k': 'assets/sounds/k.ogg', 'g': 'assets/sounds/g.ogg', 'q': 'assets/sounds/q.ogg',
echo     'm': 'assets/sounds/m.ogg', 'n': 'assets/sounds/n.ogg',
echo     'l': 'assets/sounds/l.ogg', 'r': 'assets/sounds/r.ogg',
echo     'f': 'assets/sounds/f.ogg', 'v': 'assets/sounds/v.ogg',
echo     's': 'assets/sounds/s.ogg', 'z': 'assets/sounds/z.ogg',
echo     'h': 'assets/sounds/h.ogg', 'w': 'assets/sounds/w.ogg', 'j': 'assets/sounds/j.ogg',
echo     'x': 'assets/sounds/x.ogg',
echo.
echo     // Vowels
echo     'a': 'assets/sounds/a.ogg', 'e': 'assets/sounds/e.ogg', 'i': 'assets/sounds/i.ogg',
echo     'o': 'assets/sounds/o.ogg', 'u': 'assets/sounds/u.ogg', 'y': 'assets/sounds/y.ogg',
echo.
echo     // ASCII-named special sounds
echo     'ae': 'assets/sounds/ae.ogg',
echo     'oe_open': 'assets/sounds/oe_open.ogg',
echo     'oe_rounded': 'assets/sounds/oe_rounded.ogg',
echo     'y_rounded': 'assets/sounds/y_rounded.ogg',
echo     'c_fricative': 'assets/sounds/c_fricative.ogg',
echo     'ch_affricate': 'assets/sounds/ch_affricate.ogg',
echo     'click_dental': 'assets/sounds/click_dental.ogg',
echo     'eth': 'assets/sounds/eth.ogg',
echo     'h_pharyngeal': 'assets/sounds/h_pharyngeal.ogg',
echo     'j_affricate': 'assets/sounds/j_affricate.ogg',
echo     'ng': 'assets/sounds/ng.ogg',
echo.
echo     // Fixed corrupted files
echo     'click_alveolar': 'assets/sounds/click_alveolar.ogg',
echo     'h_pharyngeal_voiced': 'assets/sounds/h_pharyngeal_voiced.ogg',
echo     'oe_mid_front_rounded': 'assets/sounds/oe_mid_front_rounded.ogg',
echo     'ae_near_open': 'assets/sounds/ae_near_open.ogg',
echo     'c_palatal_voiceless': 'assets/sounds/c_palatal_voiceless.ogg',
echo     'eth_voiced': 'assets/sounds/eth_voiced.ogg',
echo     'ng_velar': 'assets/sounds/ng_velar.ogg',
echo     'oe_mid_front_open2': 'assets/sounds/oe_mid_front_open2.ogg',
echo     'j_affricate_voiced': 'assets/sounds/j_affricate_voiced.ogg',
echo     'ch_affricate_voiceless': 'assets/sounds/ch_affricate_voiceless.ogg',
echo.
echo     // Descriptive files (if they exist)
) > "..\..\tools\temp_mapping.js"

REM Add descriptive files if they exist
if exist "b_descriptive.ogg" (
    echo     'b_descriptive': 'assets/sounds/b_descriptive.ogg', >> "..\..\tools\temp_mapping.js"
)
if exist "p_descriptive.ogg" (
    echo     'p_descriptive': 'assets/sounds/p_descriptive.ogg', >> "..\..\tools\temp_mapping.js"
)
if exist "d_descriptive.ogg" (
    echo     'd_descriptive': 'assets/sounds/d_descriptive.ogg', >> "..\..\tools\temp_mapping.js"
)
if exist "k_descriptive.ogg" (
    echo     'k_descriptive': 'assets/sounds/k_descriptive.ogg', >> "..\..\tools\temp_mapping.js"
)

(
echo };
echo.
echo if ^(typeof module !== 'undefined' ^&^& module.exports^) {
echo     module.exports = ipaSoundMapping;
echo } else {
echo     window.ipaSoundMapping = ipaSoundMapping;
echo }
) >> "..\..\tools\temp_mapping.js"

move "..\..\tools\temp_mapping.js" "..\js\ipa-sounds-mapping-ascii.js"

echo.
echo Listing final files...
echo.
dir /b

echo.
echo ✓ Renaming completed!
echo ✓ Created ASCII mapping file: assets\js\ipa-sounds-mapping-ascii.js
echo.
pause
