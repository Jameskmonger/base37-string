import { TestFixture, TestCase, Expect } from "alsatian";
import * as Long from "long";
import { encode, decode, MAX_ENCODED_VALUE } from "./index";

@TestFixture()
export class Tests {

    @TestCase("Mopar", new Long(0x017FB1F7, 0x00000000))
    @TestCase("abc123", new Long(0x045E3859, 0x00000000))
    @TestCase("jameskmonger", new Long(0x8C92749B, 0x18C80EF5))
    @TestCase("Dr_Munjuice", new Long(0xA719992A, 0x004CA64A))
    public shouldEncodeCorrectly(input: string, expected: Long) {
        const output = encode(input);

        Expect(output.equals(expected)).toBe(true);
    }

    @TestCase("abc123", "ABC123")
    @TestCase("jameskmonger", "JAMESKMONGER")
    @TestCase("81XcJfOoOii", "81XCJFOOOII")
    public shouldEncodeCaseInsensitively(a: string, b: string) {
        const outputA = encode(a);
        const outputB = encode(b);

        Expect(outputA.equals(outputB)).toBe(true);
    }

    @TestCase(new Long(0x017FB1F7, 0x00000000), "mopar")
    @TestCase(new Long(0x045E3859, 0x00000000), "abc123")
    @TestCase(new Long(0x8C92749B, 0x18C80EF5), "jameskmonger")
    @TestCase(new Long(0xA719992A, 0x004CA64A), "dr_munjuice")
    public shouldDecodeCorrectly(input: Long, expected: string) {
        const output = decode(input);

        Expect(output).toEqual(expected);
    }

    @TestCase(MAX_ENCODED_VALUE.add(1))
    @TestCase(Long.fromInt(0))
    @TestCase(Long.fromInt(-1))
    @TestCase(Long.fromInt(37))
    @TestCase(Long.fromInt(37).multiply(10))
    public shouldThrowErrorIfDecodingBadValue(input: Long) {
        Expect(() => decode(input))
            .toThrowError(Error, "Invalid input provided");
    }

}
