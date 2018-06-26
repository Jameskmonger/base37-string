import { TestFixture, TestCase, Expect } from "alsatian";
import * as Long from "long";
import { hash, unhash } from "./index";

@TestFixture()
export class HashTests {

    @TestCase("Mopar", new Long(0x017FB1F7, 0x00000000))
    @TestCase("abc123", new Long(0x045E3859, 0x00000000))
    @TestCase("jameskmonger", new Long(0x8C92749B, 0x18C80EF5))
    @TestCase("Dr_Munjuice", new Long(0xA719992A, 0x004CA64A))
    public shouldHashCorrectly(input: string, expected: Long) {
        const output = hash(input);

        Expect(output.equals(expected)).toBe(true);
    }

    @TestCase("abc123", "ABC123")
    @TestCase("jameskmonger", "JAMESKMONGER")
    @TestCase("81XcJfOoOii", "81XCJFOOOII")
    public shouldHashCaseInsensitively(a: string, b: string) {
        const outputA = hash(a);
        const outputB = hash(b);

        Expect(outputA.equals(outputB)).toBe(true);
    }

    @TestCase(new Long(0x017FB1F7, 0x00000000), "Mopar")
    @TestCase(new Long(0x045E3859, 0x00000000), "abc123")
    @TestCase(new Long(0x8C92749B, 0x18C80EF5), "jameskmonger")
    @TestCase(new Long(0xA719992A, 0x004CA64A), "Mopar")
    public shouldUnashCorrectly(input: Long, expected: string) {
        const output = unhash(input);

        Expect(output).toEqual(expected);
    }

}
