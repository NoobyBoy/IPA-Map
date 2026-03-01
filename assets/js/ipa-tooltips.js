// IPA Chart Tooltip JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize multi-consonant tooltips
    const consonantIndicators = document.querySelectorAll('.multi-consonant-indicator');
    
    consonantIndicators.forEach(indicator => {
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
    
    // Initialize multi-vowel tooltips
    const vowelIndicators = document.querySelectorAll('.multi-vowel-indicator');
    
    vowelIndicators.forEach(indicator => {
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
        const allIndicators = document.querySelectorAll('.multi-consonant-indicator, .multi-vowel-indicator');
        allIndicators.forEach(indicator => {
            indicator.style.setProperty('--tooltip-opacity', '0');
            indicator.style.setProperty('--tooltip-visibility', 'hidden');
        });
    });
});
