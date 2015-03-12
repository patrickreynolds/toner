# Toner.js

- [Summary](#summary)
- [Examples](#examples)
- [TODO List](#todo-list)


## Summary

Photo filter utilities for image manipulation


## Examples

```javascript  
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
```

## TODO List

- [x] Apply a custom tone
- [x] Create a custom tone
- [x] Update an applied tone
- [x] Remove filters from previously applied tones
- [x] Remove a previously applied tone
- [x] Get filter values from an applied tone
- [x] Handle bounds checking per filter attribute
- [ ] Create a build script to lint and minify files
- [ ] Increase performance using requestAnimationFrame for fast incrementation/decrementation
- [ ] Implement model and browser tests
