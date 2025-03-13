import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, message, Spin, Tabs } from 'antd';
import { Parallax } from 'react-parallax';
import images, { backgrounds } from '~/assets';
import Breadcrumb from '~/components/Breadcrumb';
import SectionHeader from '~/components/SectionHeader';
import classNames from 'classnames/bind';
import styles from './BookDetail.module.scss';
import SocialIcons from '~/components/SocialIcons';
import { getBookDetailForUser } from '~/services/bookDefinitionService';
import { addToCart } from '~/services/cartService';
import useAuth from '~/hooks/useAuth';
import ReviewSection from './ReviewSection';

const cx = classNames.bind(styles);

function BookDetail() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [entityData, setEntityData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const [messageApi, contextHolder] = message.useMessage();

    const handleAddToCart = async (bookCode) => {
        if (isAuthenticated) {
            try {
                const response = await addToCart(bookCode);
                if (response.status === 201) {
                    messageApi.success(response.data.data.message);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau';
                messageApi.error(errorMessage);
            }
        } else {
            navigate('/login', { replace: true, state: { from: location } });
        }
    };

    const onChangeTab = (key) => {
        console.log(key);
    };

    useEffect(() => {
        const fetchEntities = async () => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const response = await getBookDetailForUser(id);
                const { data } = response.data;
                setEntityData(data);
            } catch (error) {
                const errorMessage =
                    error.response?.data?.message || error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau.';
                setErrorMessage(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntities();
    }, [id]);

    const breadcrumbItems = [
        {
            label: 'Trang chủ',
            url: '/',
        },
        {
            label: 'Thư viện sách',
            url: '/books',
        },
        {
            label: 'Sách tiếng việt',
        },
    ];

    const tabItems = [
        {
            key: '1',
            label: 'Thông tin xếp giá',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Chi tiết',
            children: 'Content of Tab Pane 2',
        },
    ];

    return (
        <>
            {contextHolder}

            <Parallax bgImage={backgrounds.bgparallax7} strength={500}>
                <div className="innerbanner">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <h1>Chi tiết sách</h1>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <Breadcrumb items={breadcrumbItems} />
                            </div>
                        </div>
                    </div>
                </div>
            </Parallax>

            <div className="container sectionspace">
                <div className="row mb-4">
                    <div className="col-3">
                        <h5 className="section-title">Sách được mượn nhiều nhất</h5>
                    </div>
                    <div className="col-9">
                        {isLoading ? (
                            <div className="d-flex justify-content-center w-100">
                                <Spin size="large" />
                            </div>
                        ) : errorMessage ? (
                            <div className="w-100">
                                <Alert message="Lỗi" description={errorMessage} type="error" />
                            </div>
                        ) : (
                            <div className={cx('content')}>
                                <div className="row g-3">
                                    <div className="col-3">
                                        <img
                                            className={cx('image')}
                                            src={entityData.imageUrl || images.placeimg}
                                            alt=""
                                        />
                                    </div>

                                    <div className="col-9">
                                        <ul className={cx('category')}>
                                            <li>Số lượng sách còn trong thư viện: {entityData.bookCount}</li>
                                        </ul>

                                        <div className={cx('title')}>
                                            <h3>{entityData.title}</h3>
                                        </div>

                                        <span className={cx('writer')}>
                                            Tác giả:&nbsp;
                                            {entityData.authors && entityData.authors.length > 0
                                                ? entityData.authors.map((author, index) => (
                                                      <React.Fragment key={author.id || index}>
                                                          <Link to={`/books?authorId=${author.id}`}>{author.name}</Link>
                                                          {index < entityData.authors.length - 1 && ', '}
                                                      </React.Fragment>
                                                  ))
                                                : 'Không xác định'}
                                        </span>

                                        <div className={cx('share')}>
                                            <span>Share:</span>
                                            <SocialIcons url={`http://localhost:3000/books/${id}`} />
                                        </div>

                                        <div className={cx('description')}>
                                            <h4>Tóm tắt nội dung</h4>
                                            <p>
                                                {entityData.summary
                                                    ? entityData.summary
                                                    : 'Chưa có mô tả cho cuốn sách này'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <SectionHeader title={<h5 className="mb-0">Chi tiết sách</h5>} />

                                        <ul className={cx('info')}>
                                            <li>
                                                <span>Số trang:</span>
                                                <span>{entityData.pageCount || 'N/A'}</span>
                                            </li>
                                            <li>
                                                <span>Kích thước:</span>
                                                <span>{entityData.bookSize ? entityData.bookSize : 'N/A'}</span>
                                            </li>
                                            <li>
                                                <span>Năm xuất bản:</span>
                                                <span>{entityData.publishingYear || 'N/A'}</span>
                                            </li>
                                            <li>
                                                <span>Nhà xuất bản:</span>
                                                <span>{entityData.publisher ? entityData.publisher.name : 'N/A'}</span>
                                            </li>
                                            <li>
                                                <span>Ngôn ngữ:</span>
                                                <span>{entityData.language || 'N/A'}</span>
                                            </li>
                                            <li>
                                                <span>ISBN:</span>
                                                <span>{entityData.isbn || 'N/A'}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-12">
                                        <Tabs defaultActiveKey="1" items={tabItems} onChange={onChangeTab} />
                                    </div>

                                    <div className="col-12">
                                        <ReviewSection bookDefinitionId={id} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetail;
