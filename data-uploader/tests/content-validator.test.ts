import { describe, expect, test } from '@jest/globals';
import { ContentValidator } from '../src/content-validator';

var contentValidator = new ContentValidator();

describe('Validate content', () => {
    test('Check valid JSON', () => {
        expect(contentValidator.ValidateJSON()).toBe(true);
    });

    test('Check invalid JSON', () => {
        expect(contentValidator.ValidateJSON()).toBe(false);
    });
});