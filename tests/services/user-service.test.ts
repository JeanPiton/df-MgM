import { conflictUserError } from "@/errors";
import { userRepository, usersRepository } from "@/repositories";
import { userService } from "@/services";
import { faker } from "@faker-js/faker";

describe("createUser", () => {
    const generateValidInput = () => ({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    it("should throw conflictUserError if email is in use", async () => {
        jest.spyOn(usersRepository, "findAllUsersByEmail").mockImplementationOnce((email) => {
            return Promise.resolve({
                id: faker.word.noun(),
                email: email,
                password: faker.word.noun(),
                name: faker.person.firstName(),
                role: "USER",
                token: faker.number.hex()
            });
        });
        const input = generateValidInput();
        try {
            await userService.createUser(input);
            fail('should throw conflictUserError');
        } catch (error) {
            expect(error).toEqual(conflictUserError("email already in use"));
        }
    });

    it("should return created user", async () => {
        jest.spyOn(usersRepository, "findAllUsersByEmail").mockImplementationOnce(():null => {
            return null;
        });
        jest.spyOn(userRepository, "createUser").mockImplementationOnce((email, hash, name) => {
            return Promise.resolve({
                id: faker.word.noun(),
                email: email,
                password: hash,
                name: name,
                role: "USER",
                token: faker.number.hex(),
                currency: [],
                inventory: []
            })
        });
        const input = generateValidInput();
        const user = await userService.createUser(input);

        expect(user).toEqual({
            id: expect.any(String),
            email: input.email,
            password: expect.any(String),
            name: input.name,
            role: "USER",
            token: expect.any(String),
            currency: [],
            inventory: []
        })
    });
})