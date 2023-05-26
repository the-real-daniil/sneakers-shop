const BASE_API_URL = process.env.NODE_ENV === 'production' ? 'https://sneakers-api-132b.onrender.com' : 'http://localhost:8001';

export type Sneaker = {
    id: number;
    name: string;
    price: number;
    image: string;
}

export const getSneakers = async (): Promise<Record<string, Sneaker>> => {
    const res = await fetch(`${BASE_API_URL}/sneakers`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export type UserSneaker = {
    steps: number;
    id: number;
}

export const getUserSneakers = async (userId: number): Promise<Record<string, UserSneaker>> => {
    const res = await fetch(`${BASE_API_URL}/users/${userId}/sneakers`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export const addSneakerToUser = async (userId: number, sneakerId: number): Promise<Record<string, UserSneaker>> => {
    const res = await fetch(`${BASE_API_URL}/users/${userId}/sneakers/${sneakerId}`, {
        method: 'POST',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

type Price = {
    label: string;
    amount: number;
}

export const createInvoiceLink = async (prices: Price[]) => {
    const res = await fetch(`${BASE_API_URL}/invoiceLink`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prices,
        }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res;
}
