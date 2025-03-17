import { useEffect, useState } from 'react';
import { Dropdown, Badge, Spin } from 'antd';
import { Client } from '@stomp/stompjs';
import { FaBell } from 'react-icons/fa';
import { getNotifications, deleteNotification, markNotificationAsRead } from '~/services/notificationService';
import Notification from '~/components/Notification';
import { ACCESS_TOKEN } from '~/constants';

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

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const wsUrl = `ws://localhost:8080/ws/websocket?token=${token}`;

        const client = new Client({
            brokerURL: wsUrl,
            reconnectDelay: 5000,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            onConnect: () => {
                console.log('✅ Connected to WebSocket via STOMP');
                client.subscribe('/topic/public', (message) => {
                    setNotifications((prev) => [...prev, message.body]);
                });
            },
            onDisconnect: () => {
                console.log('❌ Disconnected from WebSocket');
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
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
