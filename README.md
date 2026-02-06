# IPA Map

An interactive world map displaying the International Phonetic Alphabet (IPA) symbols used in languages across different countries.

## Overview

IPA Map is a web-based visualization tool that explores the phonetic diversity of languages worldwide. By clicking on any country, users can discover the specific IPA phonemes used in that country's official languages, providing insights into how speech sounds vary across different regions and cultures.

## Features

- **Interactive World Map**: Built with amCharts, featuring zoom, pan, and hover effects
- **Country-Specific Phonetic Data**: Displays IPA symbols for each country's official languages
- **Real-Time Data Integration**: 
  - Uses PHOIBLE database for comprehensive phoneme inventories
  - Integrates with REST Countries API for language information
  - Special handling for multilingual countries and language variants
- **Visual Design**: Modern, responsive interface using HTML5 UP's Dimension theme
- **Country Flags**: Displays national flags alongside country information

## How It Works

1. **Data Sources**: 
   - PHOIBLE database provides phoneme inventories for thousands of languages
   - REST Countries API supplies official language information by country
   - Custom language mapping for special cases and multilingual nations

2. **Technical Implementation**:
   - Frontend: HTML5, CSS3, JavaScript
   - Mapping: amCharts 5 with GeoJSON world data
   - Data Processing: PapaParse for CSV parsing, langs library for language codes
   - Styling: HTML5 UP Dimension theme with responsive design from HTML5 UP : https://html5up.net

3. **Interactive Features**:
   - Click any country to view its phonetic profile
   - Hover effects with color-coded country highlighting
   - Zoom and pan controls for detailed exploration
   - Dynamic content loading without page refresh

## Language Coverage

The map covers all recognized countries and territories, including:
- Major world languages and their regional variants
- Indigenous languages where officially recognized
- Special handling for multilingual countries (e.g., Switzerland, Belgium, Canada)
- Accurate IPA representation using standardized phonetic symbols

## Technical Stack

- **Frontend Framework**: Pure HTML5/CSS3/JavaScript
- **Mapping Library**: amCharts 5
- **Data Sources**: 
  - PHOIBLE (phoneme database)
  - REST Countries API
  - FlagCDN for country flags
- **Dependencies**: jQuery, PapaParse, langs library
- **Design**: HTML5 UP Dimension theme

## Usage

1. Open `index.html` in a modern web browser
2. Explore the interactive world map
3. Click on any country to discover its phonetic profile
4. Use zoom controls to examine specific regions
5. Hover over countries to see their names

## Data Accuracy

The project uses authoritative linguistic databases and APIs to ensure accuracy:
- PHOIBLE: Scholarly phoneme inventory database
- Manual corrections for known API limitations

## Future Enhancements possible

- Language family filtering
- Phonetic similarity comparisons between countries
- Search functionality by phoneme or language
- Export capabilities for linguistic research
