"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
/**
 * Angular 2 pipe that selects a random State fron an array of State objects
 * and changes its selected property to 'selected'.
 */
var RandomStatePipe = (function () {
    function RandomStatePipe(cdRef) {
        this.changeDetectorRef = cdRef;
    }
    RandomStatePipe.prototype.transform = function (input, args) {
        if (input && input != null && input.length > 0) {
            var len = input.length;
            var rand_1 = Math.floor(Math.random() * len);
            var count_1 = 0;
            input.forEach(function (state) {
                if (count_1 === rand_1) {
                    state.selected = 'selected';
                }
                count_1++;
            });
            console.log("RandomStatePipe random state: " + input[rand_1].name + ' with index ' + rand_1);
            // this.selectedStates.push(...input);
            // patch together a new array wfrom the old one with the random one having the selected property set
            // let newInput = [...input.slice(0, rand), Object.assign({}, input[rand], {selected: ""}), ...input.slice(rand + 1)];
            // console.log("New array from RandomStatePipe with selected index " + rand, newInput);
            // this.changeDetectorRef.markForCheck();
            // return newInput;
            this.changeDetectorRef.markForCheck();
            return input;
        }
    };
    RandomStatePipe = __decorate([
        core_1.Pipe({ name: 'randomState', pure: false }),
        __param(0, core_1.Inject(core_1.ChangeDetectorRef)), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], RandomStatePipe);
    return RandomStatePipe;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RandomStatePipe;
//# sourceMappingURL=randomState.pipe.js.map