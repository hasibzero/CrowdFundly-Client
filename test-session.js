const fetch = require('node-fetch');

async function test() {
  try {
    // 1. Log in to get the cookie
    const res = await fetch('http://localhost:3000/api/auth/sign-in/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test1787585037958@example.com',
        password: 'Password123!',
      })
    });
    
    console.log('Login Status:', res.status);
    const cookies = res.headers.raw()['set-cookie'];
    console.log('Cookies:', cookies);
    
    if (!cookies) {
      console.log('NO COOKIE SET!');
      return;
    }
    
    // 2. Fetch session
    const res2 = await fetch('http://localhost:3000/api/auth/get-session', {
      headers: {
        'Cookie': cookies.join('; ')
      }
    });
    console.log('Session Status:', res2.status);
    console.log('Session Body:', await res2.text());

  } catch (err) {
    console.error('Error:', err);
  }
}

test();
