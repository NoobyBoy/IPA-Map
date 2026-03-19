    'b_descriptive': 'assets/sounds/b_descriptive.ogg', 
    'p_descriptive': 'assets/sounds/p_descriptive.ogg', 
    'd_descriptive': 'assets/sounds/d_descriptive.ogg', 
    'k_descriptive': 'assets/sounds/k_descriptive.ogg', 
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ipaSoundMapping;
} else {
    window.ipaSoundMapping = ipaSoundMapping;
}
