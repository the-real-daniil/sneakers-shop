const BASE_API_URL = process.env.NODE_ENV === 'production' ? 'http://51.250.41.6:8001' : 'http://localhost:8001';

export type Sneaker = {
    id: number;
    name: string;
    price: string;
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