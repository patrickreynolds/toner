;(function() {

    function Toner() {
    }

    Toner.prototype.tone = function(selection, tone) {
        if (selection.toString() === '[object HTMLCollection]') {
            var selectionLength = selection.length;
            while(selectionLength--)
                this._applyTone(selection[selectionLength], this._toneDetails(tone));
        } else {
            this._applyTone(selection, this._toneDetails(tone));
        }
    };

    Toner.prototype.createTone = function(tones) {
        return this._filter(tones);
    };

    Toner.prototype.addFilters = function(selection, filters) {
        var currentFilters = selection.style[this._browser(selection)];
        var updatedFilters = this._zipFilters(currentFilters, filters);
        this._applyTone(selection, updatedFilters);
    };

    Toner.prototype.get = function(selection, filterName) {
        return this._valueForFilter(selection, filterName);
    };

    Toner.prototype.removeFilters = function(selection, filters) {
        var currentFilters, updatedFilters;
        if (selection.toString() === '[object HTMLCollection]') {
            var selectionLength = selection.length;
            while(selectionLength--) {
                currentFilters = selection.style[this._browser(selection)];
                updatedFilters = this._cleanFilters(selection.style[this._browser(selection)], filters);
                this._applyTone(selection[selectionLength], this._filter(updatedFilters));
            }
        } else {
            currentFilters = selection.style[this._browser(selection)];
            updatedFilters = this._cleanFilters(currentFilters, filters);
            this._applyTone(selection, updatedFilters);
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

    Toner.prototype._applyTone = function(selection, tone) {
        selection.style[this._browser(selection)] = tone;
    };

    Toner.prototype._filter = function(tones) {
        var self = this;
        var filters = "";

        for (var tone in tones) {
            if (tones.hasOwnProperty(tone))
                filters += self[tone](tones[tone]) + " ";
        }
        return filters.trim();
    };

    Toner.prototype._valueForFilter = function(selection, name) {
        var filters = selection.style[this._browser(selection)];
        var value = this._toneFromFilters(filters)[name];
        return (value || value === 0) ? value : 'undefined';
    };

    Toner.prototype._zipFilters = function(currentFilters, filters) {
        var currentTone = this._toneFromFilters(currentFilters);
        for (var tone in currentTone) {
            if (!(filters[tone] || filters[tone] === 0)) {
                filters[tone] = currentTone[tone];
            }
        }
        return this._filter(filters);
    };

    Toner.prototype._cleanFilters = function(currentFilters, filtersToRemove) {
        var currentTone = this._toneFromFilters(currentFilters);
        if (filtersToRemove.constructor === Array) {
            filtersToRemove.forEach(function(filter) {
                if (currentTone[filter] || currentTone[filter] === 0) {
                    delete currentTone[filter];
                }
            });
        } else {
            delete currentTone[filtersToRemove];
        }
        return this._filter(currentTone);
    };

    Toner.prototype._toneDetails = function(tone) {
        return tone.constructor === Object ? this.createTone(tone) : tone;
    };

    Toner.prototype._toneFromFilters = function(filters) {
        var tone = {};
        filters.split(' ').forEach(function(filter) {
            if (filter) {
                var filterName = filter.split('(')[0];
                var value = parseFloat(filter.split('(')[1].slice(0, -1));
                tone[filterName] = value;
            }
        }, this);
        return tone;
    };

    Toner.prototype._browser = function(selection) {
        if (selection.style.webkitFilter   || selection.style.webkitFilter === "")
            return 'webkitFilter';
        else if (selection.style.mozFilter || selection.style.mozFilter === "")
            return 'mozFilter';
        else if (selection.style.msFilter  || selection.style.msFilter === "")
            return 'msFilter';
        else if (selection.style.oFilter   || selection.style.oFilter === "")
            return 'oFilter';
        else if (selection.style.filter    || selection.style.filter === "")
            return 'filter';
    };

    Toner.prototype._checkLowerBounds = function(value, lowerBound) {
        return (parseFloat(value) < lowerBound) ? lowerBound : value;
    };

    Toner.prototype._checkUpperBounds = function(value, upperBound) {
        return (parseFloat(value) > upperBound) ? upperBound : value;
    };

    // Value between 0
    Toner.prototype.blur = function(value) {
        value = this._checkLowerBounds(value, 0.0);
        return 'blur('+ value +'px)';
    };

    // Value greater than 0
    Toner.prototype.brightness = function(value) {
        value = this._checkLowerBounds(value, 0.0);
        return 'brightness('+ value +'%)';
    };

    // Value between 0 and 200
    Toner.prototype.contrast = function(value) {
        value = this._checkLowerBounds(value, 0.0);
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

    // Value greater than 0
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

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = new Toner();
    }
    else {
        window.toner = new Toner();
    }
}());