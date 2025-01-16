
const request = require('supertest');
const app = require('../index'); // Import your app

describe('API Testing', () => {
    // Test Ward Endpoints
    it('should fetch all wards', async () => {
        const res = await request(app).get('/api/ward');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should create a new ward', async () => {
        const newWard = {
            name: 'Surgical Ward',
            capacity: 20,
            departmentId: 1
        };
        const res = await request(app).post('/api/ward').send(newWard);
        expect(res.statusCode).toBe(201); // Assuming 201 is used for creation
        expect(res.body.name).toBe(newWard.name);
    });

    // Test Department Endpoints
    it('should fetch all departments', async () => {
        const res = await request(app).get('/api/department');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should create a new department', async () => {
        const newDepartment = {
            name: 'Neurology',
            head: 'Dr. Strange'
        };
        const res = await request(app).post('/api/department').send(newDepartment);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(newDepartment.name);
    });

    // Test Staff Endpoints
    it('should fetch all staff', async () => {
        const res = await request(app).get('/api/staff');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should add a new staff member', async () => {
        const newStaff = {
            name: 'Jane Doe',
            role: 'Doctor',
            wardId: 1
        };
        const res = await request(app).post('/api/staff').send(newStaff);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(newStaff.name);
    });
});
