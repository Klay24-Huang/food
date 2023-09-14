import * as checkoutHelper from ".";
import printTestError from '../testHelper'
import database from '../database.json'


it('Get checkout price', () => {
  const tests = [{
    name: "Case 1: Should get 0 if nothing is purchased",
    input: [],
    expected: 0
  }, {
    name: "Case 2: 232.5",
    input: ["003", "002", "003", "003", "004"],
    expected: 232.5
  }, {
    name: "Case 2: 232.5",
    input: ["003", "002", "003", "003", "004", "001"],
    expected: 277.5
  }]

  for (const test of tests) {
    let ans
    try {
      ans = checkoutHelper.checkout(test.input)
      expect(ans).toBe(test.expected)
    } catch (error) {
      printTestError({
        ...test,
        ans
      })
      throw error
    }
  }
})

it('Obtain the necessary product', () => {
  const allProducts = database.products
  const tests = [{
    name: 'case 1: select product 001',
    input: ["001"],
    // only reserve property '001' from database product
    expected: (({
      '001': id
    }) => ({
      '001': id
    }))(allProducts)
  }, {
    name: 'case 2: product 999 not found, and throw error',
    input: ["999"],
    isThrowError: true,
    expected: `product ID: 999 not found.`,
  }]

  for (const test of tests) {
    let ans
    try {
      if (!test.isThrowError) {
        ans = checkoutHelper.getProducts(test.input)
        expect(ans).toStrictEqual(test.expected)
        continue
      }

      const func = () => checkoutHelper.getProducts(test.input)
      expect(func).toThrow(Error)
      expect(func).toThrow(test.expected)
    } catch (error) {
      printTestError({
        ...test,
        ans
      })
      throw error
    }
  }
})


// promotion pattern 1
it('Buy one item at full price, and get the second one at a 50% discount', () => {
  const tests = [{
      name: 'case 1: 45 + 45 * 0.5 = 67.5',
      input: {
        productMap: new Map([
          ['001', {
            price: 45,
            count: 2
          }]
        ]),
        totalPrice: 0
      },
      expected: {
        productMap: new Map(),
        totalPrice: 67.5
      }
    },
    {
      name: 'case 2: (50 + 50 * 0.5) * 2 = 150',
      input: {
        productMap: new Map([
          ['002', {
            price: 50,
            count: 5
          }]
        ]),
        totalPrice: 0
      },
      expected: {
        productMap: new Map([
          ['002', {
            price: 50,
            count: 1
          }]
        ]),
        totalPrice: 150
      }
    }
  ]

  const action = checkoutHelper.getPromotionPatternOneAction(2, 0.5)
  let ans
  for (const test of tests) {
    try {
      ans = action(test.input.productMap, test.input.totalPrice)
      expect(ans.productMap).toStrictEqual(test.expected.productMap)
      expect(ans.totalPrice).toStrictEqual(test.expected.totalPrice)
    } catch (error) {
      printTestError({
        ...test,
        ans
      })
      throw error
    }
  }
})


// promotion pattern 2
it('Every three items form a group, and there is a $5 discount on each item', () => {
  const tests = [{
      name: 'case 1: 50 + 55 + 60 - 3 * 5 = 150',
      input: {
        productMap: new Map([
          ['002', {
            price: 50,
            count: 1
          }],
          ['003', {
            price: 55,
            count: 1
          }],
          ['004', {
            price: 60,
            count: 1
          }]
        ]),
        totalPrice: 0
      },
      expected: {
        productMap: new Map(),
        totalPrice: 150
      }
    },
    {
      name: 'case 2: Not qualified',
      input: {
        productMap: new Map([
          ['002', {
            price: 50,
            count: 1
          }]
        ]),
        totalPrice: 0
      },
      expected: {
        productMap: new Map([
          ['002', {
            price: 50,
            count: 1
          }]
        ]),
        totalPrice: 0
      }
    }
  ]

  const action = checkoutHelper.getPromotionPatternTwoAction(3, 5)
  let ans
  for (const test of tests) {
    try {
      ans = action(test.input.productMap, test.input.totalPrice)
      expect(ans.productMap).toStrictEqual(test.expected.productMap)
      expect(ans.totalPrice).toStrictEqual(test.expected.totalPrice)
    } catch (error) {
      printTestError({
        ...test,
        ans
      })
      throw error
    }
  }
})

// default 
it("sum remain products' price", () => {
  const tests = [{
      name: 'case 1: 50 + 55 + 60 = 165',
      input: {
        productMap: new Map([
          ['002', {
            price: 50,
            count: 1
          }],
          ['003', {
            price: 55,
            count: 1
          }],
          ['004', {
            price: 60,
            count: 1
          }]
        ]),
        totalPrice: 0
      },
      expected: {
        productMap: new Map(),
        totalPrice: 165
      }
    },
    {
      name: 'case 2: 50',
      input: {
        productMap: new Map([
          ['002', {
            price: 50,
            count: 1
          }]
        ]),
        totalPrice: 0
      },
      expected: {
        productMap: new Map(),
        totalPrice: 50
      }
    }
  ]

  const action = checkoutHelper.defaultAction
  let ans
  for (const test of tests) {
    try {
      ans = action(test.input.productMap, test.input.totalPrice)
      expect(ans.productMap).toStrictEqual(test.expected.productMap)
      expect(ans.totalPrice).toStrictEqual(test.expected.totalPrice)
    } catch (error) {
      printTestError({
        ...test,
        ans
      })
      throw error
    }
  }
})