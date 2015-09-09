/// <reference path="../../../../typings/tsd.d.ts" />
import * as util from './utilities';


describe("Utilities", () => {
	beforeEach(() => {
		
	});
	
	describe("checkAdjacents()" , () => {
		
		
		it('Expect one non-adjacents when one picked is not in adjacents', () => {
			let pickedName = 'foo';
			let adjacents = ['baz', 'bar'];
			let picked = [{'name': pickedName}];
			let notAdjacents = [];
			notAdjacents = util.checkAdjacents(adjacents, picked);
			console.log("Non Adjacents: ", notAdjacents);
			expect(notAdjacents[0]).to.equal(pickedName);
		});
	
		it('Expect no non-adjacents since all picked are adjacents', () => {
			let adjacents = ['baz', 'bar'];
			let picked = [{'name': 'bar'}, {'name': 'baz'}];
			let notAdjacents = [];
			notAdjacents = util.checkAdjacents(adjacents, picked);
			expect(notAdjacents.length).to.equal(0);
		});
	
		it('Expect one non-adjacent of two picked since one of two picked are adjacents', () => {
			let adjacents = ['baz', 'bar'];
			let picked = [{'name': 'bar'}, {'name': 'foo'}];
			let notAdjacents = [];
			notAdjacents = util.checkAdjacents(adjacents, picked);
			expect(notAdjacents.length).to.equal(1);
			expect(notAdjacents[0]).to.equal('foo');
		});
	
		it('Expect error when no candidate adjacents are picked', () => {
			let adjacents = ['baz', 'bar'];
			let picked = [];
			expect(util.checkAdjacents(adjacents, picked)).to.throw(new Error("No candidate adjacents have been picked"));
		});
	
		it('Expect error when candidate adjacents are undefined', () => {
			let adjacents = ['baz', 'bar'];
			let picked = undefined;
			expect(util.checkAdjacents(adjacents, picked)).to.throw(new Error("No candidate adjacents have been picked"));
		});
	
		
	});
	
	describe("convertStateArrayToStateNameStringArray()", () => {
		
		it("should convert array with a name property to proper string array", () => {
			//FIXME: complete test case and other test cases
		});
		
	});
	
});