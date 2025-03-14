import { useEffect, useState } from 'react';
import { Dropdown, Badge, Spin } from 'antd';
import { FaBell } from 'react-icons/fa';
import { getNotifications, deleteNotification, markNotificationAsRead } from '~/services/notificationService';
import Notification from '~/components/Notification';

function NotificationDropdown() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            await deleteNotification(id);
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        } catch (error) {
            console.error('Lỗi khi xóa thông báo:', error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await markNotificationAsRead(id);
            setNotifications((prev) =>
                prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
            );
        } catch (error) {
            console.error('Lỗi khi đánh dấu đã đọc:', error);
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const response = await getNotifications();
                setNotifications(response.data.data);
            } catch (error) {
                console.error('Lỗi khi lấy thông báo:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const notificationItems = loading
        ? [
              {
                  key: 'loading',
                  label: <Spin size="small" />,
              },
          ]
        : notifications.length > 0
        ? notifications.map((notification) => ({
              key: notification.id,
              label: <Notification data={notification} onDelete={handleDelete} onRead={handleMarkAsRead} />,
          }))
        : [
              {
                  key: 'empty',
                  label: 'Không có thông báo nào',
                  disabled: true,
              },
          ];

    return (
        <Dropdown menu={{ items: notificationItems }} trigger={['click']}>
            <Badge count={notifications.filter((n) => !n.read).length}>
                <FaBell style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Badge>
        </Dropdown>
    );
}

export default NotificationDropdown;
