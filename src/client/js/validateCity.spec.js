import { isValidCity } from './validateCity';

describe('isValidCity...', () => {
    it('should return false for an empty city', () => {
        actualResult = isValidCity('');
        expect(actualResult).toBeFalsy;
    })
})