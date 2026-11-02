/**
 * MSP Alumni Network - Dynamic Data Binding
 * Automatically populates statistics from data.js across all pages
 * Last updated: January 2026
 * 
 * This eliminates hardcoded numbers in HTML files.
 * Annual updates: Just change data.js, everything updates automatically.
 */

(function() {
    'use strict';
    
    // Wait for DOM and data.js to be loaded
    function initDataBinding() {
        // Check if MSP_DATA is available
        if (typeof MSP_DATA === 'undefined') {
            console.error('MSP_DATA not loaded. Make sure data.js is included before data-bind.js');
            return;
        }
        
        // Map of data keys to their values
        const dataMap = {
            // Summary statistics
            'totalAlumni': MSP_DATA.summary.totalAlumni,
            'nationalities': MSP_DATA.summary.nationalities,
            'countriesLivingIn': MSP_DATA.summary.countriesLivingIn,
            'universitiesAttended': MSP_DATA.summary.universitiesAttended,
            
            // Formatted versions (with commas)
            'totalAlumni-formatted': MSP_DATA.summary.totalAlumni.toLocaleString('en-US'),
            'universitiesAttended-formatted': MSP_DATA.summary.universitiesAttended.toLocaleString('en-US'),
            
            // Common combinations for natural language
            'alumni-nationalities': `${MSP_DATA.summary.totalAlumni.toLocaleString('en-US')} MSP alumni from ${MSP_DATA.summary.nationalities} nationalities`,
            'countries-universities': `${MSP_DATA.summary.countriesLivingIn} countries and ${MSP_DATA.summary.universitiesAttended} universities`,
            'alumni-countries': `${MSP_DATA.summary.totalAlumni.toLocaleString('en-US')} graduates across ${MSP_DATA.summary.countriesLivingIn} countries`,
            
            // WhatsApp community stats (if available)
            'whatsapp-members': '400+', // Update this manually or add to MSP_DATA
            'whatsapp-groups': '18', // Update this manually or add to MSP_DATA
            
            // Last updated
            'lastUpdated': MSP_DATA.lastUpdated || 'February 2026'
        };
        
        // Populate all elements with data-stat attributes
        document.querySelectorAll('[data-stat]').forEach(element => {
            const statKey = element.getAttribute('data-stat');
            const value = dataMap[statKey];
            
            if (value !== undefined) {
                // Handle different element types
                if (element.tagName === 'META') {
                    // For meta tags, update content attribute
                    const currentContent = element.getAttribute('content');
                    const updatedContent = updateMetaContent(currentContent, statKey, value);
                    element.setAttribute('content', updatedContent);
                } else if (element.tagName === 'TITLE') {
                    // For title tags, update text content
                    element.textContent = element.textContent.replace(/\{.*?\}/g, value);
                } else {
                    // For regular elements, update text content
                    element.textContent = value;
                }
                
                // Add a data attribute to show it was successfully populated
                element.setAttribute('data-populated', 'true');
            } else {
                console.warn(`No data found for stat key: ${statKey}`);
            }
        });
        
        // Populate elements with data-text-template (for natural language)
        document.querySelectorAll('[data-text-template]').forEach(element => {
            let template = element.getAttribute('data-text-template');
            
            // Replace all {statKey} placeholders
            Object.keys(dataMap).forEach(key => {
                const placeholder = new RegExp(`\\{${key}\\}`, 'g');
                template = template.replace(placeholder, dataMap[key]);
            });
            
            element.textContent = template;
            element.setAttribute('data-populated', 'true');
        });
        
        console.log('✓ Data binding initialized. All statistics populated from data.js');
    }
    
    /**
     * Update meta tag content by replacing specific stat values
     */
    function updateMetaContent(content, statKey, value) {
        // Map of patterns to replace in meta descriptions
        const patterns = {
            'totalAlumni-formatted': /\d{1,3}(,\d{3})*\s+MSP alumni/,
            'nationalities': /\d+\s+nationalit(y|ies)/,
            'universitiesAttended': /\d+\s+universit(y|ies)/,
            'countriesLivingIn': /\d+\s+countr(y|ies)/
        };
        
        const pattern = patterns[statKey];
        if (pattern) {
            // Preserve the text around the number
            if (statKey === 'totalAlumni-formatted') {
                return content.replace(pattern, `${value} MSP alumni`);
            } else if (statKey === 'nationalities') {
                const plural = value === 1 ? 'nationality' : 'nationalities';
                return content.replace(pattern, `${value} ${plural}`);
            } else if (statKey === 'universitiesAttended') {
                const plural = value === 1 ? 'university' : 'universities';
                return content.replace(pattern, `${value} ${plural}`);
            } else if (statKey === 'countriesLivingIn') {
                const plural = value === 1 ? 'country' : 'countries';
                return content.replace(pattern, `${value} ${plural}`);
            }
        }
        
        return content;
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDataBinding);
    } else {
        // DOM is already ready
        initDataBinding();
    }
    
    // Also expose the function globally in case it needs to be re-run
    window.MSP_DataBinding = {
        init: initDataBinding,
        version: '1.0.0'
    };
})();
