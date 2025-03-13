import React, { useState, useEffect, useCallback } from 'react';
import { List, Input, Button, message, Rate } from 'antd';
import { getReviewsByBook, createReview, updateReview, deleteReview } from '~/services/reviewService';
import useAuth from '~/hooks/useAuth';

const ReviewSection = ({ bookDefinitionId }) => {
    const { isAuthenticated, user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ comment: '', rating: 0 });
    const [editingReview, setEditingReview] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

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
        if (!newReview.comment.trim() || newReview.rating === 0) {
            return messageApi.warning('Vui lòng nhập nội dung và đánh giá số sao.');
        }
        try {
            await createReview({ bookDefinitionId, comment: newReview.comment, rating: newReview.rating });
            messageApi.success('Thêm bình luận thành công!');
            setNewReview({ comment: '', rating: 0 });
            fetchReviews();
        } catch {
            messageApi.error('Thêm bình luận thất bại.');
        }
    };

    const handleUpdateReview = async () => {
        if (!editingReview.comment.trim() || editingReview.rating === 0) {
            return messageApi.warning('Vui lòng nhập nội dung và đánh giá số sao.');
        }
        try {
            await updateReview(editingReview.id, { comment: editingReview.comment, rating: editingReview.rating });
            messageApi.success('Cập nhật bình luận thành công!');
            setEditingReview(null);
            fetchReviews();
        } catch {
            messageApi.error('Cập nhật bình luận thất bại.');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReview(reviewId);
            messageApi.success('Xóa bình luận thành công!');
            fetchReviews();
        } catch {
            messageApi.error('Xóa bình luận thất bại.');
        }
    };

    return (
        <div>
            {contextHolder}
            <h4>Bình luận & Đánh giá</h4>

            {isAuthenticated ? (
                <div>
                    <Rate
                        value={newReview.rating}
                        onChange={(value) => setNewReview({ ...newReview, rating: value })}
                    />
                    <Input.TextArea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Viết bình luận của bạn..."
                    />
                    <Button type="primary" onClick={handleAddReview} className="mt-2">
                        Gửi bình luận
                    </Button>
                </div>
            ) : (
                <p>
                    Vui lòng <a href="/login">đăng nhập</a> để bình luận.
                </p>
            )}

            <List
                className="mt-4"
                dataSource={reviews}
                renderItem={(review) => (
                    <List.Item
                        actions={
                            user?.id === review.readerId
                                ? [
                                      <Button
                                          type="link"
                                          onClick={() =>
                                              setEditingReview({
                                                  id: review.id,
                                                  comment: review.comment,
                                                  rating: review.rating,
                                              })
                                          }
                                      >
                                          Sửa
                                      </Button>,
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
                                <Input.TextArea
                                    value={editingReview.comment}
                                    onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                                />
                                <Button type="primary" onClick={handleUpdateReview} className="mt-2">
                                    Lưu
                                </Button>
                                <Button onClick={() => setEditingReview(null)} className="mt-2 ml-2">
                                    Hủy
                                </Button>
                            </div>
                        ) : (
                            <List.Item.Meta
                                title={
                                    <div>
                                        <strong>{review.userName}</strong>
                                        <Rate value={review.rating} disabled className="ml-2" />
                                    </div>
                                }
                                description={review.comment}
                            />
                        )}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ReviewSection;
