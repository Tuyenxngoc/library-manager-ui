import httpRequest, { axiosPrivate } from '~/utils/httpRequest';

export const getReviewsByBook = (bookDefinitionId) => {
    return httpRequest.get(`reviews/book/${bookDefinitionId}`);
};

export const getReviewsByReader = (readerId) => {
    return httpRequest.get(`reviews/reader/${readerId}`);
};

export const createReview = (data) => {
    return axiosPrivate.post('reviews', data);
};

export const updateReview = (reviewId, data) => {
    return axiosPrivate.put(`reviews/${reviewId}`, data);
};

export const deleteReview = (reviewId) => {
    return axiosPrivate.delete(`reviews/${reviewId}`);
};
