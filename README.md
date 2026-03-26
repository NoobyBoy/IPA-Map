# IPA Map

An interactive world map displaying the International Phonetic Alphabet (IPA) symbols used in languages across different countries.

**🌐 Try it online:** [https://noobyboy.github.io/IPA-Map/](https://noobyboy.github.io/IPA-Map/)


[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html5.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Overview

IPA Map is a web-based visualization tool that explores the phonetic diversity of languages worldwide. By clicking on any country, users can discover the specific IPA phonemes used in that country's official languages, providing insights into how speech sounds vary across different regions and cultures.

## Features

- **🗺️ Interactive World Map**: Built with amCharts, featuring zoom, pan, and hover effects
- **🔤 Country-Specific Phonetic Data**: Displays IPA symbols for each country's official languages
- **🔄 Real-Time Data Integration**: 
  - Uses PHOIBLE database for comprehensive phoneme inventories
  - Integrates with REST Countries API for language information
  - Special handling for multilingual countries and language variants
- **🎨 Visual Design**: Modern, responsive interface using HTML5 UP's Dimension theme
- **🏳️ Country Flags**: Displays national flags alongside country information
- **🌍 Comprehensive Coverage**: All recognized countries and territories with accurate linguistic data

## How It Works

### Data Sources
- **PHOIBLE Database**: Provides comprehensive phoneme inventories for thousands of languages
- **REST Countries API**: Supplies official language information by country
- **Custom Language Mapping**: Special handling for multilingual countries and language variants

### Technical Implementation
- **Frontend**: Pure HTML5, CSS3, JavaScript (no framework dependencies)
- **Mapping**: amCharts 5 with GeoJSON world data
- **Data Processing**: PapaParse for CSV parsing, langs library for language codes
- **Styling**: HTML5 UP Dimension theme with responsive design

## Language Coverage

The map covers all recognized countries and territories, including:
- Major world languages and their regional variants
- Indigenous languages where officially recognized
- Special handling for multilingual countries (e.g., Switzerland, Belgium, Canada)
- Accurate IPA representation using standardized phonetic symbols

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API data fetching

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/NoobyBoy/IPA-Map.git
   ```

2. Navigate to the project directory:
   ```bash
   cd IPA-Map
   ```

3. Open `index.html` in your web browser:
   ```bash
   # Simply open the file in your preferred browser
   # or use a local server for better development experience
   python -m http.server 8000
   # then visit http://localhost:8000
   ```

### Usage
1. **Explore the Map**: Use mouse to pan and zoom the world map
2. **Discover Phonetics**: Click on any country to see its IPA phoneme inventory
3. **View Details**: Hover over countries to see their names and flags
4. **Navigate**: Use zoom controls for detailed regional exploration

## Contributing

Contributions are welcome! Please consider the following:

### Areas for Contribution
- **Language Data**: Help improve phoneme inventories and language mappings
- **UI/UX**: Enhance the user interface and experience

### Guidelines
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Submit a pull request with a clear description

### Support

For questions, issues, or suggestions:
1. Check existing [GitHub Issues](https://github.com/NoobyBoy/IPA-Map/issues)
2. Create a new issue with detailed information
3. Join discussions in the repository

---

**Explore the world of phonetics with IPA Map! 🌍🔤**
