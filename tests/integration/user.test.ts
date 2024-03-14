import app, { init } from '@/app';
import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories/user-factory';
import { cleanDb } from '../helpers';

beforeAll(async () => {
    await init();
});
  
beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe("POST /user/sign-up", () => {
    const generateValidInput = () => ({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    it('should respond with status bad request when body is empty', async () => {
        const response = await server.post('/user/sign-up').send({});
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when name is not present in body', async () => {
        const input = generateValidInput();
        delete input.name;
    
        const response = await server.post('/user/sign-up').send(input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when email is not present in body', async () => {
        const input = generateValidInput();
        delete input.email;
    
        const response = await server.post('/user/sign-up').send(input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when email is not an email', async () => {
        const input = generateValidInput();
        input.email = faker.word.noun();
    
        const response = await server.post('/user/sign-up').send(input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status bad request when password is not present in body', async () => {
        const input = generateValidInput();
        delete input.password;
    
        const response = await server.post('/user/sign-up').send(input);
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status conflict when email is already in use', async () => {
        const input = generateValidInput();
        await createUser({email:input.email});
    
        const response = await server.post('/user/sign-up').send(input);
    
        expect(response.status).toEqual(httpStatus.CONFLICT);
    });

    it('should respond with status created and user data', async () => {
        const input = generateValidInput();
    
        const response = await server.post('/user/sign-up').send(input);
    
        expect(response.status).toEqual(httpStatus.CREATED);
        expect(response.body).toEqual({
            id: expect.any(String),
            email: input.email,
            name: input.name,
            password: expect.any(String),
            inventory: [],
            currency: [],
            role: "USER",
            token: expect.toBeOneOf([expect.any(String), null])
        });
    });

    it('should insert a new user in the database', async () => {
        const input = generateValidInput();

        const beforeCount = await prisma.user.count();
    
        await server.post('/user/sign-up').send(input);

        const afterCount = await prisma.user.count();
    
        expect(beforeCount).toBe(0);
        expect(afterCount).toBe(1);
    });
})