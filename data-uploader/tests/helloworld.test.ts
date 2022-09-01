import { describe, expect, test } from '@jest/globals';
import {Sum} from '../src/helloworld';

let sum: Sum = new Sum();

describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum.calculate(1, 2)).toBe(3);
    });
});