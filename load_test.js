import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 1000 },  // Ramp up to 100 users over 30 seconds
        { duration: '1m', target: 1000 },   // Stay at 100 users for 1 minute
        { duration: '30s', target: 0 }     // Ramp down to 0 users
    ],
};

export default function () {
    let res = http.post('http://localhost:5000/api/auth/register', JSON.stringify({
        name: 'surya',
        email: 'suryaemail@gmail.com',
        password: '123456',
        confirmPassword: '123456'
    }), {
        headers: { 'Content-Type': 'application/json' }
    });

    // Update checks for registration route
    check(res, {
        'is status 422 for existing email': (r) => r.status === 422,
        'response body contains email error message': (r) => {
            const body = JSON.parse(r.body);
            return body.errors && body.errors.email === 'Email already exists. Please try another one';
        }
    });

    sleep(1); // Sleep to simulate some delay between requests
}
