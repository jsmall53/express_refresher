import { expect, should } from 'chai';
import { generateToken, validateToken } from '../../src/v1/token';
import { isExportDeclaration } from 'typescript';

describe("token", function() {
    it("should generate a token from email address", function() {
        const email = "test@test.com";
        const token = generateToken(email);
        expect(token).to.be.a('string');
    });
    it("should be able to validate a generated token to retrieve the email address", function() {
        const email = "test@test.com";
        const token = generateToken(email);
        const validated_email = validateToken(token);
        expect(validated_email).to.be.a('string');
        expect(validated_email).to.be.equal(email);
    });
});