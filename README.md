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
    sepia:  70,
    brightness: 200
})
```  

###### Before
![Before](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/before-tone.png)
###### After
![After](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/after-tone.png)


```javascript
// Apply a tone to multiple photos
toner.tone(document.getElementsByClassName('photo'), {
    sepia:  50,
    invert: 70,
    contrast: 140
})
```

###### Before
![Before](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/before-tone-multiple.png)
###### After
![After](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/after-tone-multiple.png)


```javascript
// Create reusable tones
var grayscaleTone = toner.createTone({ grayscale: 100 })
toner.tone(document.getElementById('logo'), grayscaleTone)
```

###### Before
![Before](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/before-create-tone.png)
###### After
![After](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/after-create-tone.png)


```javascript
// Get the current value for a filter within a tone
console.log(toner.get(document.getElementById('logo'), 'grayscale'))
> 100
```

```javascript
// Add a single additional filter after a tone has been applied
toner.addFilters(document.getElementById('logo2'), {
    sepia: 70
})
toner.addFilters(document.getElementById('logo2'), {
    brightness: 200
})
```

###### Before
![Before](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/before-filter-add.png)
###### After
![After](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/after-filter-add.png)


```javascript
// Add multiple filters after a tone has been applied
toner.addFilters(document.getElementById('logo2'), {
    sepia: 70,
    brightness: 200
})
```

###### Before
![Before](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/before-filter-add.png)
###### After
![After](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/after-filter-add.png)


```javascript
// Remove a filter from a previously applied tone
toner.removeFilters(document.getElementById('logo2'), "opacity")
```

###### Before
![Before](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/before-filter-remove.png)
###### After
![After](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/after-filter-remove.png)


```javascript
// Remove multiple filters from a previously applied tone
toner.removeFilters(document.getElementById('logo3'), ["saturate", "opacity"])
```

###### Before
![Before](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/before-filters-remove.png)
###### After
![After](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/after-filters-remove.png)


```javascript
// Remove a tone all together
toner.removeTone(document.getElementsByClassName('photo'))  
```

###### Before
![Before](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/before-filters-remove.png)
###### After
![After](https://git.corp.adobe.com/XD/toner.js/blob/master/examples/images/after-filters-remove.png)


## TODO List

- [x] Apply a custom tone
- [x] Create a custom tone
- [x] Update an applied tone
- [x] Remove filters from previously applied tones
- [x] Remove a previously applied tone
- [x] Get filter values from an applied tone
- [x] Handle bounds checking per filter attribute
- [x] Create a build script to lint and minify files
- [ ] Increase performance using requestAnimationFrame for fast incrementation/decrementation
- [ ] Implement model and browser tests
