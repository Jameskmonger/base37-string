import * as Long from "long";

const hash = (input: string) => {
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

const unhash = (input: Long) => {
    return "";
};

export {
    hash,
    unhash
};
