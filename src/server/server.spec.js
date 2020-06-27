import { getCountdown } from "./server";

describe('getCountdown...', () => {
    it('should return 2 days', () => {
        const nowDate = new Date(Date.now());
        const fakeDate = new Date(nowDate.getFullYear, nowDate.getMonth, nowDate.getDate - 2);
        const fakeDateString = fakeDate.getFullYear + '-' + (fakeDate.getMonth + 1) + '-' + fakeDate.getDate;
        const actualResult = getCountdown(fakeDateString);
        expect(actualResult).toBe(2);
    })
})