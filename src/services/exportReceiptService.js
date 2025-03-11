import { axiosPrivate } from '~/utils/httpRequest';

export const generateReceiptNumber = async () => {
    return axiosPrivate.get('export-receipts/generate-receipt-number');
};

export const createExportReceipt = (values) => {
    return axiosPrivate.post('export-receipts', values);
};

export const updateExportReceipt = (id, values) => {
    return axiosPrivate.put(`export-receipts/${id}`, values);
};

export const deleteExportReceipt = (id) => {
    return axiosPrivate.delete(`export-receipts/${id}`);
};

export const getExportReceiptById = (id) => {
    return axiosPrivate.get(`export-receipts/${id}`);
};

export const getExportReceipts = (params) => {
    return axiosPrivate.get(`export-receipts?${params}`);
};
