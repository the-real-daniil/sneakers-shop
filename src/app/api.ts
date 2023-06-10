export type Sneaker = {
    id: number;
    name: string;
    price: number;
    image: string;
}

export const getSneakers = async (): Promise<Record<string, Sneaker>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sneakers`);

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${userId}/sneakers`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export const createInvoiceLink = async (sneakerId: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/invoiceLink`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sneakerId,
        }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
