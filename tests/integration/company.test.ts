import app, { init } from '@/app';
import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createCompany } from '../factories/company-factory';
import { cleanDb } from '../helpers';

beforeAll(async () => {
    await init();
    await prisma.superUser.updateMany({where:{name:"admin"},data:{token:"SUtesttoken"}});
});
  
beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

const authorizedPost = async (path: string, message: Object) => {
    const token = (await prisma.superUser.findFirst()).token;
    return await server.post(path).set("Authorization", token).send(message);
}

describe("POST /company/sign-up", () => {
    const generateValidInput = () => ({
        name: faker.person.firstName(),
        contact: faker.lorem.text(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    it('should respond with status bad request when body is empty', async () => {
        const response = await authorizedPost("/company/sign-up",{});
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when name is not present in body', async () => {
        const input = generateValidInput();
        delete input.name;
    
        const response = await authorizedPost('/company/sign-up',input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when contact is not present in body', async () => {
        const input = generateValidInput();
        delete input.contact;
    
        const response = await authorizedPost('/company/sign-up',input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when email is not present in body', async () => {
        const input = generateValidInput();
        delete input.email;
    
        const response = await authorizedPost('/company/sign-up',input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when email is not an email', async () => {
        const input = generateValidInput();
        input.email = faker.word.noun();
    
        const response = await authorizedPost('/company/sign-up',input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when password is not present in body', async () => {
        const input = generateValidInput();
        delete input.password;
    
        const response = await authorizedPost('/company/sign-up',input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status conflict when email is already in use', async () => {
        const input = generateValidInput();
        await createCompany({email:input.email});
    
        const response = await authorizedPost('/company/sign-up',input);/////

        console.log(response.body)
    
        expect(response.status).toEqual(httpStatus.CONFLICT);
    });

    it('should respond with status unathorized when authorization is invalid', async () => {
        const input = generateValidInput();
    
        const response = await server.post('/company/sign-up').send(input);
    
        expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status created and company data', async () => {
        const input = generateValidInput();
    
        const response = await authorizedPost('/company/sign-up',input);
    
        expect(response.status).toEqual(httpStatus.CREATED);
        expect(response.body).toEqual({
            id: expect.any(String),
            email: input.email,
            name: input.name,
            password: expect.any(String),
            contact: expect.any(String),
            role: "COMPANY",
            token: expect.toBeOneOf([expect.any(String), null])
        });
    });

    it('should insert a new company in the database', async () => {
        const input = generateValidInput();

        const beforeCount = await prisma.company.count();
    
        await authorizedPost('/company/sign-up',input);

        const afterCount = await prisma.company.count();
    
        expect(beforeCount).toBe(0);
        expect(afterCount).toBe(1);
    });
})