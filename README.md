# toner.js
==========
Photo filter utilities for image manipulation

## Quick Examples

	// Apply a tone to a single photo
	toner.tone(document.getElementById('logo'), {
        sepia:  50,
        invert: 20
    })
	
	// Apply a tone to multiple photos
	toner.tone(document.getElementsByClassName('photo'), {
        sepia:  50,
        invert: 70,
        contrast: 140
    })
	
	// Create reusable tones
	var contrastTone = toner.createTone({ contrast: 40 })
	toner.tone(document.getElementById('photo'), contrastTone)

	// Get the current value for a filter within a tone
    console.log(toner.get(ev.target, 'sepia'))

    // Add a single additional filter after a tone has been applied
    toner.addFilters(document.getElementById('logo2'), {
        sepia: 50
    })
    toner.addFilters(document.getElementById('logo2'), {
        invert: 20
    })

    // Add multiple filters after a tone has been applied
    toner.addFilters(document.getElementById('logo2'), {
        sepia: 40,
        invert: 20
    })

    // Remove a filter from a previously applied tone
    toner.removeFilters(document.getElementById('logo2'), "contrast")

    // Remove multiple filters from a previously applied tone
    toner.removeFilters(document.getElementById('logo3'), ["contrast", "invert"])

    // Remove a tone all together
    toner.removeTone(document.getElementsByClassName('photo'))
	