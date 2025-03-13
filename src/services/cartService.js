import { axiosPrivate } from '~/utils/httpRequest';

export const addToCart = (bookCode) => {
    return axiosPrivate.post(`carts/add?bookCode=${bookCode}`);
};

export const getCartDetails = (params) => {
    return axiosPrivate.get(`carts/details?${params}`);
};

export const removeFromCart = (id) => {
    return axiosPrivate.delete(`carts/remove?cartDetailIds=${id}`);
};

export const clearCart = () => {
    return axiosPrivate.delete('carts/clear');
};

export const getPendingBorrowRequests = (params) => {
    return axiosPrivate.get(`carts/pending-borrow-requests?${params}`);
};
