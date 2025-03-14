import { axiosPrivate } from '~/utils/httpRequest';

export const markNotificationAsRead = (notificationId) => {
    return axiosPrivate.put(`notifications/read/${notificationId}`);
};

export const getNotifications = () => {
    return axiosPrivate.get('notifications');
};

export const deleteNotification = (notificationId) => {
    return axiosPrivate.delete(`notifications/${notificationId}`);
};
