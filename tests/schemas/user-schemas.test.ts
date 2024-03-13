import { userSignUpSchema } from '@/schemas';
import { faker } from '@faker-js/faker';

describe("userSignUpSchema", () => {
    const generateValidInput = () => ({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    describe("when name is not valid", () => {
        it("should return error if name is not present", () => {
            const input = generateValidInput();
            delete input.name;

            const { error } = userSignUpSchema.validate(input);

            expect(error).toBeDefined();
        });
    });

    describe("when email is not valid", () => {
        it("should return error if email is not present", () => {
            const input = generateValidInput();
            delete input.email;

            const { error } = userSignUpSchema.validate(input);

            expect(error).toBeDefined();
        });

        it("should return error if email is not an email", () => {
            const input = generateValidInput();
            input.email = faker.lorem.text();

            const { error } = userSignUpSchema.validate(input);

            expect(error).toBeDefined();
        });
    });

    describe("when password is not valid", () => {
        it("should return error if password is not present", () => {
            const input = generateValidInput();
            delete input.password;

            const { error } = userSignUpSchema.validate(input);

            expect(error).toBeDefined();
        });
    });

    it('should return no error if input is valid', () => {
        const input = generateValidInput();
    
        const { error } = userSignUpSchema.validate(input);
    
        expect(error).toBeUndefined();
    });
});