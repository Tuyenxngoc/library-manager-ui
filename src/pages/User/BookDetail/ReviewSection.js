import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { List, Input, Button, message, Rate } from 'antd';
import { getReviewsByBook, createReview, updateReview, deleteReview } from '~/services/reviewService';
import useAuth from '~/hooks/useAuth';
import { ROLES } from '~/constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { TextArea } = Input;

const ReviewSection = ({ bookDefinitionId }) => {
    const { isAuthenticated, user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ comment: '', rating: 0 });
    const [editingReview, setEditingReview] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const isAdmin = user?.roleNames?.includes(ROLES.ManageReview);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await getReviewsByBook(bookDefinitionId);
            setReviews(response.data.data);
        } catch (error) {
            console.error('Lỗi khi tải bình luận:', error);
        }
    }, [bookDefinitionId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleAddReview = async () => {
        if (newReview.rating === 0) {
            return messageApi.warning('Vui lòng đánh giá số sao.');
        }
        try {
            await createReview({ bookDefinitionId, comment: newReview.comment, rating: newReview.rating });
            messageApi.success('Thêm bình luận thành công!');
            setNewReview({ comment: '', rating: 0 });
            fetchReviews();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Thêm bình luận thất bại.';
            messageApi.error(errorMessage);
        }
    };

    const handleUpdateReview = async () => {
        if (editingReview.rating === 0) {
            return messageApi.warning('Vui lòng đánh giá số sao.');
        }
        try {
            await updateReview(editingReview.id, { comment: editingReview.comment, rating: editingReview.rating });
            messageApi.success('Cập nhật bình luận thành công!');
            setEditingReview(null);
            fetchReviews();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Cập nhật bình luận thất bại.';
            messageApi.error(errorMessage);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReview(reviewId);
            messageApi.success('Xóa bình luận thành công!');
            fetchReviews();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Xóa bình luận thất bại.';
            messageApi.error(errorMessage);
        }
    };

    return (
        <>
            {contextHolder}

            <h4>Bình luận & Đánh giá</h4>

            {isAuthenticated ? (
                <div>
                    <Rate
                        value={newReview.rating}
                        onChange={(value) => setNewReview({ ...newReview, rating: value })}
                    />
                    <TextArea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Viết bình luận của bạn..."
                        maxLength={500}
                        showCount
                    />
                    <Button type="primary" onClick={handleAddReview} className="mt-2">
                        Gửi bình luận
                    </Button>
                </div>
            ) : (
                <p>
                    Vui lòng <Link to="/login">đăng nhập</Link> để bình luận.
                </p>
            )}

            <List
                className="mt-4"
                dataSource={reviews}
                renderItem={(review) => (
                    <List.Item
                        actions={
                            user?.cardNumber === review.reader.cardNumber
                                ? [
                                      <Button
                                          type="link"
                                          onClick={() =>
                                              setEditingReview({
                                                  id: review.id,
                                                  rating: review.rating,
                                                  comment: review.comment,
                                              })
                                          }
                                      >
                                          Sửa
                                      </Button>,
                                      <Button type="link" danger onClick={() => handleDeleteReview(review.id)}>
                                          Xóa
                                      </Button>,
                                  ]
                                : isAdmin
                                ? [
                                      <Button type="link" danger onClick={() => handleDeleteReview(review.id)}>
                                          Xóa
                                      </Button>,
                                  ]
                                : []
                        }
                    >
                        {editingReview?.id === review.id ? (
                            <div>
                                <Rate
                                    value={editingReview.rating}
                                    onChange={(value) => setEditingReview({ ...editingReview, rating: value })}
                                />
                                <TextArea
                                    value={editingReview.comment}
                                    onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                                    maxLength={500}
                                    showCount
                                />
                                <Button type="primary" onClick={handleUpdateReview} className="mt-2">
                                    Lưu
                                </Button>
                                <Button onClick={() => setEditingReview(null)} className="mt-2 ms-2">
                                    Hủy
                                </Button>
                            </div>
                        ) : (
                            <List.Item.Meta
                                title={
                                    <div>
                                        <strong>{review.reader.fullName}</strong>
                                        <Rate value={review.rating} disabled className="ms-2" />
                                        <span className="text-gray-500 ms-2">
                                            {dayjs(review.lastModifiedDate).fromNow()}
                                        </span>
                                    </div>
                                }
                                description={review.comment}
                            />
                        )}
                    </List.Item>
                )}
            />
        </>
    );
};

export default ReviewSection;
