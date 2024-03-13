import { signInSchema } from '@/schemas';
import { faker } from '@faker-js/faker';

describe("signInSchema", () => {
    const generateValidInput = () => ({
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    describe("when email is not valid", () => {
        it("should return error if email is not present", () => {
            const input = generateValidInput();
            delete input.email;

            const { error } = signInSchema.validate(input);

            expect(error).toBeDefined();
        });

        it("should return error if email is not an email", () => {
            const input = generateValidInput();
            input.email = faker.lorem.text();

            const { error } = signInSchema.validate(input);

            expect(error).toBeDefined();
        });
    });

    describe("when password is not valid", () => {
        it("should return error if password is not present", () => {
            const input = generateValidInput();
            delete input.password;

            const { error } = signInSchema.validate(input);

            expect(error).toBeDefined();
        });
    });

    it('should return no error if input is valid', () => {
        const input = generateValidInput();
    
        const { error } = signInSchema.validate(input);
    
        expect(error).toBeUndefined();
    });
});