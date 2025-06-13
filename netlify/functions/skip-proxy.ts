import { Handler } from '@netlify/functions';

const SKIP_API_BASE = 'https://go.cosmos.network/api/skip';

export const handler: Handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const path = event.path.replace('/.netlify/functions/skip-proxy', '');
        const response = await fetch(`${SKIP_API_BASE}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: event.body
        });

        const data = await response.json();

        return {
            statusCode: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
}; 