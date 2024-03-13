import { conflictUserError } from "@/errors";
import { companyRepository, usersRepository } from "@/repositories";
import { companyService } from "@/services";
import { faker } from "@faker-js/faker";

describe("createCompany", () => {
    const generateValidInput = () => ({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        contact: faker.lorem.words()
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
            await companyService.createCompany(input);
            fail('should throw conflictUserError');
        } catch (error) {
            expect(error).toEqual(conflictUserError("email already in use"));
        }
    });

    it("should return created company", async () => {
        jest.spyOn(usersRepository, "findAllUsersByEmail").mockImplementationOnce(():null => {
            return null;
        });
        jest.spyOn(companyRepository, "createCompany").mockImplementationOnce((email, hash, name, contact) => {
            return Promise.resolve({
                id: faker.word.noun(),
                email: email,
                password: hash,
                name: name,
                role: "COMPANY",
                token: faker.number.hex(),
                contact: contact
            })
        });
        const input = generateValidInput();
        const company = await companyService.createCompany(input);

        expect(company).toEqual({
            id: expect.any(String),
            email: input.email,
            password: expect.any(String),
            name: input.name,
            role: "COMPANY",
            token: expect.any(String),
            contact: expect.any(String)
        })
    });
})