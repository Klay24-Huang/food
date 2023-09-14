const multiply = (num1, num2) => {
    let baseNum = 0
    const s1 = num1.toString()
    const s2 = num2.toString()
    baseNum += getBaseNum(num1)
    baseNum += getBaseNum(num2)
    return ((Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, baseNum))
}

const divide = (num1, num2) => {
    const baseNum1 = getBaseNum(num1)
    const baseNum2 = getBaseNum(num2)
    const baseNum = Math.max(baseNum1, baseNum2)
    const factor = Math.pow(10, baseNum)
    return (num1 * factor) / (num2 * factor)
}

const plus = (num1, num2) => {
    const baseNum1 = getBaseNum(num1)
    const baseNum2 = getBaseNum(num2)
    const baseNum = Math.max(baseNum1, baseNum2)
    const factor = Math.pow(10, baseNum)
    return (num1 * factor + num2 * factor) / factor
}

const minus = (num1, num2) => {
    const baseNum1 = getBaseNum(num1)
    const baseNum2 = getBaseNum(num2)
    const baseNum = Math.max(baseNum1, baseNum2)
    const factor = Math.pow(10, baseNum)
    return (num1 * factor - num2 * factor) / factor
}

const getBaseNum = (num) => {
    return (num.toString().split('.')[1] || '').length;
}

export default {
    plus,
    minus,
    multiply,
    divide,

}