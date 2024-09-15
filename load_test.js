import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },  // Ramp up to 100 users over 30 seconds
        { duration: '1m', target: 100 },   // Stay at 100 users for 1 minute
        { duration: '30s', target: 0 }     // Ramp down to 0 users
    ],
};

export default function () {
    let res = http.get('http://localhost:5000/'); // Change the api to test 
    check(res, {
        'is status 200': (r) => r.status === 200,
        'response body is correct': (r) => r.body === 'Hello from server',
    }); // Change the status and response to see result
    sleep(1);
}
