import calculator from ".";
import printTestError from '../testHelper'


it("test multiply function", () => {
    const tests = [{
        name: 'case 1',
        input: {
            num1: 19.9,
            num2: 100
        },
        expected: 1990
    }, {
        name: 'case 2',
        input: {
            num1: 0.8,
            num2: 3
        },
        expected: 2.4
    }, {
        name: 'case 3',
        input: {
            num1: 100,
            num2: 35.41
        },
        expected: 3541
    }, ]

    for (const test of tests) {
        let ans
        try {
            ans = calculator.multiply(test.input.num1, test.input.num2)
            expect(ans).toBe(test.expected)
        } catch (error) {
            printTestError({
                ...test,
                ans
            })
            throw error
        }
    }
});

it("test divide function", () => {
    const tests = [{
        name: 'case 1',
        input: {
            num1: 0.3,
            num2: 0.1
        },
        expected: 3
    }, {
        name: 'case 2',
        input: {
            num1: 0.69,
            num2: 10
        },
        expected: 0.069
    }, ]

    for (const test of tests) {
        let ans
        try {
            ans = calculator.divide(test.input.num1, test.input.num2)
            expect(ans).toBe(test.expected)
        } catch (error) {
            printTestError({
                ...test,
                ans
            })
            throw error
        }
    }
});


it("test plus function", () => {
    const tests = [{
        name: 'case 1',
        input: {
            num1: 0.1,
            num2: 0.2
        },
        expected: 0.3
    }, {
        name: 'case 2',
        input: {
            num1: 0.7,
            num2: 0.1
        },
        expected: 0.8
    }, {
        name: 'case 3',
        input: {
            num1: 4,
            num2: 5
        },
        expected: 9
    }]

    for (const test of tests) {
        let ans
        try {
            ans = calculator.plus(test.input.num1, test.input.num2)
            expect(ans).toBe(test.expected)
        } catch (error) {
            printTestError({
                ...test,
                ans
            })
            throw error
        }
    }
});

it("test plus function", () => {
    const tests = [{
        name: 'case 1',
        input: {
            num1: 1.5,
            num2: 1.2
        },
        expected: 0.3
    }, {
        name: 'case 2',
        input: {
            num1: 0.3,
            num2: 0.2
        },
        expected: 0.1
    }, ]

    for (const test of tests) {
        let ans
        try {
            ans = calculator.minus(test.input.num1, test.input.num2)
            expect(ans).toBe(test.expected)
        } catch (error) {
            printTestError({
                ...test,
                ans
            })
            throw error
        }
    }
});