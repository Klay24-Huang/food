import database from '../database.json'
import MathHelper from '../MathHelper';

export const checkout = (productIDs = []) => {
    try {
        if (productIDs.length === 0) return 0;
        // get this checkout's product data from database
        const products = getProducts(productIDs)
        const promotions = getPromotions()
        // sort products ids into map structure
        let productMap = getProductIDsMap(productIDs, products)
        let totalPrice = 0
        // calculate each promotion's price, and remove used product Id in map
        for (const promotion of promotions) {
            const result = promotion.action(productMap, totalPrice)
            productMap = result.productMap
            totalPrice = result.totalPrice
        }

        return totalPrice

    } catch (error) {
        // should log this error in production environment
        throw error
    }
};

export const getProductIDsMap = (productIDs, products) => {
    const map = new Map()
    for (const id of productIDs) {
        if (!map.has(id)) {
            map.set(id, {
                count: 1,
                price: products[id].price
            })
            continue
        }

        const item = map.get(id)
        map.set(id, {
            count: ++item.count,
            price: item.price
        })
    }
    return map
}

// simulate of select needed products in database
export const getProducts = (productIDs = []) => {
    // all products from db
    const allProducts = database.products
    const result = {}
    for (const id of productIDs) {
        const product = allProducts[id]
        if (!product) throw new Error(`product ID: ${id} not found.`)
        result[id] = product
    }
    return result
}

class Promotion {
    constructor(name, action) {
        this.name = name
        this.action = action
    }
}

const getPromotions = () => {
    return [
        // can add new promotion here
        new Promotion('Buy one item at full price, and get the second one at a 50% discount', getPromotionPatternOneAction(2, 0.5)),
        new Promotion('Every three items form a group, and there is a $5 discount on each item', getPromotionPatternTwoAction(3, 5)),
        new Promotion('default', defaultAction)
    ]
}

// sum remain products' price
export const defaultAction = (productMap, totalPrice) => {
    for (const item of productMap.values()) {
        totalPrice += item.count * item.price
    }
    return {
        productMap: new Map(),
        totalPrice
    }
}

// promotion 1
// buy N item, and get M % discount of total ratio
export const getPromotionPatternOneAction = (buyCount, discountRatio) => {
    return (productMap, totalPrice) => {
        for (let [key, item] of productMap) {
            while (item.count >= buyCount) {
                totalPrice = MathHelper.plus(totalPrice, MathHelper.multiply(item.price, MathHelper.minus(buyCount, discountRatio)))
                item.count -= buyCount
                if (item.count === 0) productMap.delete(key)
            }
        }
        return {
            productMap,
            totalPrice
        }
    }
}

// promotion 2
// N item form a group, and there is $ M on each item
export const getPromotionPatternTwoAction = (buyCount, discount) => {
    return (productMap, totalPrice) => {
        let recorder = []
        for (const key of productMap.keys()) {
            recorder.push(key)
            if (recorder.length === buyCount) {
                totalPrice = MathHelper.plus(totalPrice, recorder.reduce((prev, id) => {
                    const discountedPrice = MathHelper.minus(productMap.get(id).price, discount)
                    return MathHelper.plus(prev, discountedPrice)
                }, 0))
                productMap = removeItemFromProductMap(productMap, recorder)
                recorder = []
            }
        }
        return {
            productMap,
            totalPrice
        }
    }
}

export const removeItemFromProductMap = (productMap, productIDs) => {
    for (const id of productIDs) {
        let item = productMap.get(id)
        item.count--
        if (item.count === 0) productMap.delete(id)
    }
    return productMap
}