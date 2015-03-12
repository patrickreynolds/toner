;(function() {

    function Toner() {
    }

    Toner.prototype.tone = function(selection, tone) {
        if (selection.toString() === '[object HTMLCollection]') {
            var selectionLength = selection.length;
            while(selectionLength--)
                this._applyTone(selection[selectionLength], this._useOrCreateTone(tone));
        } else {
            this._applyTone(selection, this._useOrCreateTone(tone));
        }
    };

    Toner.prototype.createTone = function(tones) {
        return this._filter(tones);
    };

    Toner.prototype.addFilters = function(element, filter) {
        var current = element.style[this._browser(element)];
        var updated = filter.constructor === Array ? 
                        this._insertFilters(current, filter) : 
                        this._insertFilter(current, filter);
        this._applyTone(element, updated);
    };

    Toner.prototype.get = function(element, filterName) {
        return this._valueForFilter(element, filterName);
    };

    Toner.prototype.removeFilters = function(element, filters) {
        if (filters.constructor === Array) {
            var currentFilters = element.style[this._browser(element)];
            var updatedFilters = this._spliceFilters(currentFilters, filters);
            this._applyTone(element, updatedFilters);
        } else {
            this._applyTone(element, this._removeFilter(element, filters));
        }
    };

    Toner.prototype.removeTone = function(selection) {
        if (selection.toString() === '[object HTMLCollection]') {
            var selectionLength = selection.length;
            while(selectionLength--)
                this._applyTone(selection[selectionLength], this.createTone({}));
        } else {
            this._applyTone(selection, this.createTone({}));
        }
    };

    Toner.prototype._applyTone = function(element, tone) {
        element.style[this._browser(element)] = tone;
    };


    Toner.prototype._filter = function(tones) {
        var self = this;
        var filters = "";

        for (var tone in tones) {
            if (tones.hasOwnProperty(tone))
                filters += self[tone](tones[tone]) + " ";
        }
        return filters;
    };

    Toner.prototype._valueForFilter = function(element, name) {
        var filters = element.style[this._browser(element)];
        var value = "";
        filters.split(" ").forEach(function(filter) {
            if (filter.split('(')[0] === name) {
                value = this._trimSuffix(filter.split('(')[1].slice(0, -1));
            }
        }, this);
        return (value || value === 0) ? value : 'undefined';
    };

    Toner.prototype._insertFilter = function(currentFilters, filterToAdd) {
        var found = false;
        var updatedFilters = currentFilters.split(' ').map(function(filter) {
            if (filter.indexOf(this._filter(filterToAdd).split('(')[0]) !== -1) {
                found = true;
                return this._filter(filterToAdd);
            } else {
                return filter;
            }
        }, this);
        
        if (!found)
            updatedFilters.push(this._filter(filterToAdd));

        return updatedFilters.join(" ");
    };

    Toner.prototype._insertFilters = function(currentFilters, filtersToAdd) {
        var updatedFilters = currentFilters.split(' ').map(function(filter) {
            var filterName = this._filter(filtersToAdd).split('(')[0];
            if (filter.indexOf(filterName) !== -1) {
                var newFilterObject = {};
                newFilterObject[filterName] = filtersToAdd[filterName];
                delete filtersToAdd[filterName];
                return this._filter(newFilterObject);
            } else {
                return filter;
            }
        }, this);

        updatedFilters.push(this._filter(filtersToAdd));
        return updatedFilters.join(" ");
    };

    Toner.prototype._spliceFilters = function(currentFilters, filtersToSplice) {
        filtersToSplice.forEach(function(filter, index) {
            currentFilters = this._spliceFilter(currentFilters, filter);
        }, this);
        return currentFilters;
    };

    Toner.prototype._removeFilter = function(element, filter) {
        return this._spliceFilter(element.style[this._browser(element)], filter);
    };

    Toner.prototype._spliceFilter = function(current, filter) {
        return current.split(' ').filter(function(element) {
            if (element.indexOf(filter) === -1)
                return element;
        }).join(" ");
    };

    Toner.prototype._useOrCreateTone = function(tone) {
        return tone.constructor === Object ? this.createTone(tone) : tone;
    };

    Toner.prototype._trimSuffix = function(value) {
        if (value.slice(-1) === 'x') {
            return value.slice(0, -2);
        } else if (value.slice(-1) === '%') {
            return value.slice(0, -1);
        } else {
            return value;
        }
    };

    Toner.prototype._browser = function(element) {
        if (element.style.webkitFilter   || element.style.webkitFilter === "")
            return 'webkitFilter';
        else if (element.style.mozFilter || element.style.mozFilter === "")
            return 'mozFilter';
        else if (element.style.msFilter  || element.style.msFilter === "")
            return 'msFilter';
        else if (element.style.oFilter   || element.style.oFilter === "")
            return 'oFilter';
        else if (element.style.filter    || element.style.filter === "")
            return 'filter';
    };

    Toner.prototype._checkLowerBounds = function(value, lowerBound) {
        return (parseFloat(value) < lowerBound) ? lowerBound : value;
    };

    Toner.prototype._checkUpperBounds = function(value, upperBound) {
        return (parseFloat(value) > upperBound) ? upperBound : value;
    };

    // Value between 1 and 10
    Toner.prototype.blur = function(value) {
        value = this._checkLowerBounds(value);
        return 'blur('+ value +'px)';
    };

    // Value between 0 and 1
    Toner.prototype.brightness = function(value) {
        value = this._checkLowerBounds(value);
        return 'brightness('+ value +'%)';
    };

    // Value between 0 and 200
    Toner.prototype.contrast = function(value) {
        value = this._checkLowerBounds(value);
        return 'contrast('+ value +'%)';
    };

    // Value between 0 and 100
    Toner.prototype.grayscale = function(value) {
        value = this._checkLowerBounds(value, 0.0);
        value = this._checkUpperBounds(value, 100.0);
        return 'grayscale('+ value +'%)';
    };

    // Value between 0 and 100
    Toner.prototype.invert = function(value) {
        value = this._checkLowerBounds(value, 0.0);
        value = this._checkUpperBounds(value, 100.0);
        return 'invert('+ value +'%)';
    };

    // Value between 0 and 100
    Toner.prototype.opacity = function(value) {
        value = this._checkLowerBounds(value, 0.0);
        value = this._checkUpperBounds(value, 100.0);
        return 'opacity('+ value +'%)';
    };

    // Value between 0 and 
    Toner.prototype.saturate = function(value) {
        value = this._checkLowerBounds(value, 0.0);
        return 'saturate('+ value +'%)';
    };

    // Value between 0 and 200
    Toner.prototype.sepia = function(value) {
        value = this._checkLowerBounds(value, 0.0);
        value = this._checkUpperBounds(value, 100.0);
        return 'sepia('+ value +'%)';
    };

    window.toner = new Toner();
}());