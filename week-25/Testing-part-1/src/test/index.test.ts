import {describe, it, expect} from '@jest/globals';
import {sum} from '../index.js';

describe('sum function', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(-1, 1)).toBe(0);
        expect(sum(0, 0)).toBe(0);
    }),

    it('adds 1 + 2 to equal 3', () => { // you can also use the test function instead of it
        expect(sum(1, 2)).toBe(3);
    });
});