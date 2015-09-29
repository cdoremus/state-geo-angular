/// <reference path="../../../../typings/tsd.d.ts" />
import * as util from './utilities';
import * as Constants from './constants';

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
	
		it('Expect no non-adjacents since all picked are adjacents and order is different for both adjacents and picked', () => {
			let adjacents = ['baz', 'bar'];
			let picked = [{'name': 'bar'}, {'name': 'baz'}];
			let notAdjacents = [];
			notAdjacents = util.extraPickedStates(adjacents, picked);
			expect(notAdjacents.length).to.equal(0);
		});
	
		it('Expect no non-adjacents since all picked are adjacents and order is the same for both adjacents and picked', () => {
			let adjacents = ['bar', 'baz'];
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
				expect(err.message).to.equal(Constants.messages.CandidateAdjacentsNotPicked);
			}					
		});
	
		it('Expect error when candidate adjacents are undefined', () => {
			let adjacents = ['baz', 'bar'];
			let picked = undefined;
			try {
				util.extraPickedStates(adjacents, picked);
				expect.fail('Should have failed');
			} catch (err) {
				expect(err.message).to.equal(Constants.messages.CandidateAdjacentsNotPicked);
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
		
		it('Expect no non-adjacent when picked states and adjacent states array are the same in the same order', () => {
			let adjacents = ['bar', 'foo'];
			let picked = [{'name': 'bar'}, {'name': 'foo'}];
			let notAdjacents = [];
			notAdjacents = util.missingPickedStates(adjacents, picked);
			expect(notAdjacents.length).to.equal(0);
		});

		it('Expect no non-adjacent when picked states and adjacent states array are the same in different order', () => {
			let adjacents = ['bar', 'foo'];
			let picked = [{'name': 'foo'}, {'name': 'bar'}];
			let notAdjacents = [];
			notAdjacents = util.missingPickedStates(adjacents, picked);
			expect(notAdjacents.length).to.equal(0);
		});

	});	
	
	describe("convertStateArrayToStateNameStringArray()", () => {
		
		it("should convert array with a name property to proper string array", () => {
			//FIXME: complete test case and other test cases
		});
		
	});


	describe("sortAdjacentStateArray", () => {
		
		it("should sort state array with name property", () => {
			let arr = [{'name':'foo'}, {'name':'bar'}, 
				{'name':'baz'}, {'name':'foobar'}];
			let sortedArr = util.sortAdjacentStateArray(arr);
			expect(sortedArr[0].name).to.equal('bar');
			expect(sortedArr[3].name).to.equal('foobar');
			
		});
		
		it("should sort states that have the a 'New' prefix", () => {
			let arr = [{'name':'New York'}, {'name':'Alaska'}, 
				{'name':'Maryland'}, {'name':'New Jersey'}];
			let sortedArr = util.sortAdjacentStateArray(arr);
			expect(sortedArr[2].name).to.equal('New Jersey');
			expect(sortedArr[3].name).to.equal('New York');
			
		});

		it("should return an empty array if the input array is empty", () => {
			let arr = [];
			let sortedArr = util.sortAdjacentStateArray(arr);
			expect(sortedArr.length).to.equal(0);
		});

		it("should return an empty array if the input array is undefined", () => {
			let arr = undefined;
			let sortedArr = util.sortAdjacentStateArray(arr);
			expect(sortedArr.length).to.equal(0);
		});
	});


	describe("removeElementFromArray", () => {
		
		it("must return element with item removed", () => {
			let arr =  ['one','two','three'];
			let newArr = util.removeElementFromArray(arr, 'two');
			assert.deepEqual(newArr, ['one','three']);
		});
		
		it("must return array if element is not in the array", () => {
			let arr =  ['one','two','three'];
			let newArr = util.removeElementFromArray(arr, 'four');
			assert.deepEqual(newArr, arr);
		});
		
		it("must return array with first item removed when there are two of the element", () => {
			let arr =  ['one','two','three', 'two'];
			let newArr = util.removeElementFromArray(arr, 'two');
			assert.deepEqual(newArr, ['one','three', 'two']);
		});

		it("must return array if element is undefined", () => {
			let arr =  ['one','two','three'];
			let newArr = util.removeElementFromArray(arr, 'four');
			assert.deepEqual(newArr, arr);
		});

		it("must throw an Error if array parameter is not an array", () => {
			let arr =  'one';
			let element = 'one';
			try {
				util.removeElementFromArray(arr, element);
				fail('Should throw an Error in call');
			} catch (error) { 
				expect(error.message).to.equal(Constants.messages.ObjectNotAnArray);
			}
		});
	});
	
	describe("randomArrayItem", () => {
		it("must return an object if parameter is null", () => {
			let states = null;
			expect(util.randomArrayItem(states)).to.not.be.a('null');
			expect(util.randomArrayItem(states)).to.not.be.an('undefined');
			expect(util.randomArrayItem(states)).to.be.an('object');			
		});

		it("must return an object if parameter is not an array", () => {
			let states = {};
			expect(util.randomArrayItem(states)).to.not.be.a('null');
			expect(util.randomArrayItem(states)).to.not.be.an('undefined');
			expect(util.randomArrayItem(states)).to.be.an('object');			
		});

		it("must return an object if parameter is an empty array", () => {
			let states = [];
			expect(util.randomArrayItem(states)).to.not.be.a('null');
			expect(util.randomArrayItem(states)).to.not.be.an('undefined');
			expect(util.randomArrayItem(states)).to.be.an('object');			
		});

		it("must return an state-like object if parameter is a state-like array", () => {
			let states = [
				{'id':1, 'code':'ME'}, 
				{'id':2, 'code':'MA'},
				{'id':3, 'code':'NH'}
				]
			expect(util.randomArrayItem(states)).to.be.an('object');
			expect(util.randomArrayItem(states)).to.have.property('id');
			expect(util.randomArrayItem(states)).to.have.property('code');
		});
	});

});