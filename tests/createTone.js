var expect = require('chai').expect,
    toner  = require('../toner.js')

describe('createTone', function() {
    describe('blur', function() {
        it('should return a new tone with a blur attriubte of 3.5px when passed a value of 3.5', function() {
            expect(toner.createTone({ blur: 3.5 })).to.equal( "blur(3.5px)" );
        });
        it('should return a new tone with a blur attriubte of 0px when passed a value of -0.1', function() {
            expect(toner.createTone({ blur: -0.1 })).to.equal( "blur(0px)" );
        });
    });

    describe('brightness', function() {
        // Value in bounds
        it('should return a new tone with a brightness attriubte of 150% when passed a value of 150.0', function() {
            expect(toner.createTone({ brightness: 150.0 })).to.equal("brightness(150%)");
        });
        // Value under lower bounds
        it('should return a new tone with a brightness attriubte of 0% when passed a value of -0.1', function() {
            expect(toner.createTone({ brightness: -0.1 })).to.equal( "brightness(0%)" );
        });
    });

    // contrast
    describe('contrast', function() {
        // Value in bounds
        it('should return a new tone with a contrast attriubte of 150% when passed a value of 150.0', function() {
            expect(toner.createTone({ contrast: 150.0 })).to.equal( "contrast(150%)" );
        });
        // Value under lower bounds
        it('should return a new tone with a contrast attriubte of 0% when passed a value of -0.1', function() {
            expect(toner.createTone({ contrast: -0.1 })).to.equal( "contrast(0%)" );
        });
    });

    // grayscale
    describe('grayscale', function() {
        // Value within bounds
        it('should return a new tone with a grayscale attriubte of 50% when passed a value of 50.0', function() {
            expect(toner.createTone({ grayscale: 50.0 })).to.equal( "grayscale(50%)" );
        });
        // Value under lower bounds
        it('should return a new tone with a grayscale attriubte of 0% when passed a value of -0.1', function() {
            expect(toner.createTone({ grayscale: -0.1 })).to.equal( "grayscale(0%)" );
        });
        // Value over upper bounds
        it('should return a new tone with a grayscale attriubte of 100% when passed a value of 100.1', function() {
            expect(toner.createTone({ grayscale: 100.0 })).to.equal( "grayscale(100%)" );
        });
    });


    // invert
    describe('invert', function() {
        // Value within bounds
        it('should return a new tone with a invert attriubte of 50% when passed a value of 50.0', function() {
            expect(toner.createTone({ invert: 50.0 })).to.equal( "invert(50%)" );
        });
        // Value under lower bounds
        it('should return a new tone with a invert attriubte of 0% when passed a value of -0.1', function() {
            expect(toner.createTone({ invert: -0.1 })).to.equal( "invert(0%)" );
        });
        // Value over upper bounds
        it('should return a new tone with a invert attriubte of 100% when passed a value of 100.1', function() {
            expect(toner.createTone({ invert: 100.0 })).to.equal( "invert(100%)" );
        });
    });


    // opacity
    describe('opacity', function() {
        // Value within bounds
        it('should return a new tone with a opacity attriubte of 50% when passed a value of 50.0', function() {
            expect(toner.createTone({ opacity: 50.0 })).to.equal( "opacity(50%)" );
        });
        // Value under lower bounds
        it('should return a new tone with a opacity attriubte of 0% when passed a value of -0.1', function() {
            expect(toner.createTone({ opacity: -0.1 })).to.equal( "opacity(0%)" );
        });
        // Value over upper bounds
        it('should return a new tone with a opacity attriubte of 100% when passed a value of 100.1', function() {
            expect(toner.createTone({ opacity: 100.0 })).to.equal( "opacity(100%)" );
        });
    });

    // saturate
    describe('saturate', function() {
        // Value in bounds
        it('should return a new tone with a saturate attriubte of 150% when passed a value of 150.0', function() {
            expect(toner.createTone({ saturate: 150.0 })).to.equal("saturate(150%)");;
        });
        // Value under lower bounds
        it('should return a new tone with a saturate attriubte of 0% when passed a value of -0.1', function() {
            expect(toner.createTone({ saturate: -0.1 })).to.equal( "saturate(0%)" );;
        });
    });

    // sepia
    describe('sepia', function() {
        // Value within bounds
        it('should return a new tone with a sepia attriubte of 50% when passed a value of 50.0', function() {
            expect(toner.createTone({ sepia: 50.0 })).to.equal( "sepia(50%)" );
        });
        // Value under lower bounds
        it('should return a new tone with a sepia attriubte of 0% when passed a value of -0.1', function() {
            expect(toner.createTone({ sepia: -0.1 })).to.equal( "sepia(0%)" );
        });
        // Value over upper bounds
        it('should return a new tone with a sepia attriubte of 100% when passed a value of 100.1', function() {
            expect(toner.createTone({ sepia: 100.0 })).to.equal( "sepia(100%)" );
        });
    });

});