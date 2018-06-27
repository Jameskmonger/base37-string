import * as Long from "long";

const CHARACTERS = [
    '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6',
    '7', '8', '9'
];

const MAX_ENCODED_VALUE = new Long(0xa98a5dd1, 0x5b5b57f8);

const encode = (input: string) => {
    let output = input
        .split("")
        .map(character => character.charCodeAt(0))
        .reduce((accumulator, currentValue) => {
            let increment = 0;

            if (currentValue >= 65 && currentValue <= 90)
                increment = (1 + currentValue) - 65;
            else if (currentValue >= 97 && currentValue <= 122)
                increment = (1 + currentValue) - 97;
            else if (currentValue >= 48 && currentValue <= 57)
                increment = (27 + currentValue) - 48;

            return accumulator.multiply(37).add(increment);
        }, Long.fromInt(0));

    while (output.notEquals(0) && output.mod(37).equals(0)) {
        output = output.divide(37);
    }

    return output;
};

const decode = (input: Long) => {
    if (
        input.lessThanOrEqual(0)
        || input.greaterThanOrEqual(MAX_ENCODED_VALUE)
        || input.mod(37).equals(0)
    ) {
        throw Error("Invalid input provided");        
    }

    const characters = [];
    let remaining = input;

    while (remaining.notEquals(0)) {
        const n = remaining;
        remaining = remaining.divide(37);

        const index = n.subtract(remaining.multiply(37)).toInt();

        characters.unshift(CHARACTERS[index]);
    }

    return characters.join("");
};

export {
    MAX_ENCODED_VALUE,
    
    encode,
    decode
};
