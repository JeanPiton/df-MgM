import { invalidUserError } from "@/errors";
import { authenticationRepository, usersRepository } from "@/repositories";
import { authenticationService } from "@/services";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

describe("signIn", () => {
    const generateValidInput = () => ({
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    it("should throw invalidUserError if email does not exists", async () => {
        jest.spyOn(usersRepository, "findAllUsersByEmail").mockImplementationOnce((email): null => {
            return null;
        });
        const input = generateValidInput();
        try {
            await authenticationService.signIn(input);
            fail('should throw invalidUserError');
        } catch (error) {
            expect(error).toEqual(invalidUserError("email/password not found"));
        }
    });

    it("should throw invalidUserError if password does not match", async () => {
        jest.spyOn(usersRepository, "findAllUsersByEmail").mockImplementationOnce((email) => {
            return Promise.resolve({
                id: faker.word.noun(),
                email: email,
                password: faker.number.hex(),
                name: faker.person.firstName(),
                role: "USER",
                token: null
            });
        });
        const input = generateValidInput();
        try {
            await authenticationService.signIn(input);
            fail('should throw invalidUserError');
        } catch (error) {
            expect(error).toEqual(invalidUserError("email/password not found"));
        }
    });

    it("should return token", async () => {
        const input = generateValidInput();
        jest.spyOn(usersRepository, "findAllUsersByEmail").mockImplementationOnce((email) => {
            return Promise.resolve({
                id: faker.word.noun(),
                email: email,
                password: bcrypt.hashSync(input.password,10),
                name: faker.person.firstName(),
                role: "USER",
                token: null
            });
        });
        jest.spyOn(authenticationRepository, "createSession").mockImplementationOnce((role, token, email) => {
            return Promise.resolve({
                id: faker.word.noun(),
                email: email,
                password: bcrypt.hashSync(input.password,10),
                name: faker.person.firstName(),
                role: role,
                token: token,
                currency: [],
                inventory: []
            })
        });
        const token = await authenticationService.signIn(input);

        expect(token).toEqual(expect.any(String))
    });
})