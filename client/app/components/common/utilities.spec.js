/// <reference path="../../../../typings/tsd.d.ts" />
import * as util from './utilities';


describe("Utilities", () => {
	beforeEach(() => {
		
	});
	
	describe("extraPickedStates()" , () => {
		
		
		it('Expect one non-adjacents when one picked is not in adjacents', () => {
			let pickedName = 'foo';
			let adjacents = ['baz', 'bar'];
			let picked = [{'name': pickedName}];
			let notAdjacents = [];
			notAdjacents = util.extraPickedStates(adjacents, picked);
			console.log("Non Adjacents: ", notAdjacents);
			expect(notAdjacents[0]).to.equal(pickedName);
		});
	
		it('Expect no non-adjacents since all picked are adjacents', () => {
			let adjacents = ['baz', 'bar'];
			let picked = [{'name': 'bar'}, {'name': 'baz'}];
			let notAdjacents = [];
			notAdjacents = util.extraPickedStates(adjacents, picked);
			expect(notAdjacents.length).to.equal(0);
		});
	
		it('Expect one non-adjacent of two picked since one of two picked are adjacents', () => {
			let adjacents = ['baz', 'bar'];
			let picked = [{'name': 'bar'}, {'name': 'foo'}];
			let notAdjacents = [];
			notAdjacents = util.extraPickedStates(adjacents, picked);
			expect(notAdjacents.length).to.equal(1);
			expect(notAdjacents[0]).to.equal('foo');
		});
	
		it('Expect error when no candidate adjacents are picked', () => {
			let adjacents = ['baz', 'bar'];
			let picked = [];
			try {
				util.extraPickedStates(adjacents, picked);
				expect.fail('Should have failed');
			} catch (err) {
				expect(err.message).to.equal('No candidate adjacents have been picked');
			}					
		});
	
		it('Expect error when candidate adjacents are undefined', () => {
			let adjacents = ['baz', 'bar'];
			let picked = undefined;
			try {
				util.extraPickedStates(adjacents, picked);
				expect.fail('Should have failed');
			} catch (err) {
				expect(err.message).to.equal('No candidate adjacents have been picked');
			}					
		});
	
		
	});
	
	
	describe("missingPickedStates()" , () => {
		
		it('Expect one non-adjacent when one of two picked states is not in adjacents array', () => {
			let adjacents = ['baz', 'foo'];
			let picked = [{'name': 'baz'}];
			let notAdjacents = [];
			notAdjacents = util.missingPickedStates(adjacents, picked);
			console.log("Non Adjacents: ", notAdjacents);
			expect(notAdjacents[0]).to.equal('foo');
		});
	
		it('Expect two non-adjacent when no picked states are found in adjacent states array', () => {
			let adjacents = ['bar', 'foo'];
			let picked = [{'name': 'baz'}, {'name': 'asdf'}];
			let notAdjacents = [];
			notAdjacents = util.missingPickedStates(adjacents, picked);
			console.log("Non Adjacents: ", notAdjacents);
			expect(notAdjacents[0]).to.equal('bar');
			expect(notAdjacents[1]).to.equal('foo');
		});
		
	});	
	
	describe("convertStateArrayToStateNameStringArray()", () => {
		
		it("should convert array with a name property to proper string array", () => {
			//FIXME: complete test case and other test cases
		});
		
	});
	
});