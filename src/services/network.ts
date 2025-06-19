export async function fetchOrderData(orderId: string) {
    const url = `https://api.garden.finance/orders/id/${orderId}/matched`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch order data:', error);
        throw error;
    }
} 