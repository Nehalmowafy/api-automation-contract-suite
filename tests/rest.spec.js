const { test, expect } = require('@playwright/test');

test.describe('RESTful API Contract & Mutation Suite', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('TC-REST-01: GET /posts/1 validates schema integrity, status, and payload shape', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);

    // Status code verification
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // Header contract validation
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

    // Schema and body integrity assertions
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('userId');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
    expect(typeof data.title).toBe('string');
  });

  test('TC-REST-02: GET /posts with query parameters filters response records', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`, {
      params: { userId: 1 },
    });

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);

    // Verify all returned records honor the query filter contract
    for (const post of posts) {
      expect(post.userId).toBe(1);
    }
  });

  test('TC-REST-03: POST /posts creates resource and confirms ledger mutation', async ({ request }) => {
    const payload = {
      title: 'Automated QA Contract Test',
      body: 'Validating payload ingestion via Playwright request fixture.',
      userId: 42,
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    // 201 Created confirmation
    expect(response.status()).toBe(201);

    const createdRecord = await response.json();
    expect(createdRecord).toMatchObject(payload);
    expect(createdRecord).toHaveProperty('id');
  });

  test('TC-REST-04: GET non-existent resource returns 404 contract boundary', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/999999`);
    expect(response.status()).toBe(404);
  });
});