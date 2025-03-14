import { useState } from 'react';
import { Button, Modal } from 'antd';
import images from '~/assets';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function Notification({ data, onDelete, onRead }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);

        if (!data.read) {
            onRead(data.id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteNotification = () => {
        onDelete(data.id);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={cx('wrapper', { unread: !data.read })} onClick={handleOpenModal}>
                <div className={cx('left')}>
                    <img src={images.logo} width={30} alt="" />
                </div>
                <div className={cx('right')}>
                    <div className={cx('title')}>{data.title}</div>
                    <div className={cx('content')}>{data.message}</div>
                    <div className={cx('time')}>{data.createdAt}</div>
                </div>
            </div>

            <Modal
                title="Chi tiết thông báo"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                    <Button key="delete" type="primary" danger onClick={handleDeleteNotification}>
                        Xóa thông báo
                    </Button>,
                ]}
            >
                <h3>{data.title}</h3>
                <p>{data.message}</p>
                <p className={cx('time')}>{data.createdAt}</p>
            </Modal>
        </>
    );
}

export default Notification;
