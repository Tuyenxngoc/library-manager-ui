import { axiosPrivate } from '~/utils/httpRequest';

export const getLogs = (params) => {
    return axiosPrivate.get(`logs?${params}`);
};
