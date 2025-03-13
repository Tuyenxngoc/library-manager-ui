import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { Skeleton } from 'antd';
import { backgrounds } from '~/assets';
import Breadcrumb from '~/components/Breadcrumb';
import { getNewsArticleByTitleSlugForUser, getNewsArticlesForUser } from '~/services/newsArticlesService';
import classNames from 'classnames/bind';
import styles from './NewsArticleDetail.module.scss';
import SocialIcons from '~/components/SocialIcons';
import NewsArticle from '~/components/NewsArticle';
import { FaRegClock } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

const cx = classNames.bind(styles);

function NewsArticleDetail() {
    const { id } = useParams();

    const [articleDetail, setArticleDetail] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchArticleDetail = async () => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const response = await getNewsArticleByTitleSlugForUser(id);
                const { data } = response.data;
                setArticleDetail(data);
            } catch (error) {
                setErrorMessage(error.response.data.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };
        const fetchRelatedArticles = async () => {
            try {
                const response = await getNewsArticlesForUser();
                const { items } = response.data.data;
                setRelatedArticles(items);
            } catch (error) {}
        };

        fetchArticleDetail();
        fetchRelatedArticles();
    }, [id]);

    const items = [
        {
            label: 'Trang chủ',
            url: '/',
        },
        {
            label: 'Chi tiết bài viết',
        },
    ];

    return (
        <>
            <Parallax bgImage={backgrounds.bgparallax7} strength={500}>
                <div className="innerbanner">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <h1>Chi tiết bài viết</h1>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <Breadcrumb items={items} />
                            </div>
                        </div>
                    </div>
                </div>
            </Parallax>

            <div className="container sectionspace">
                <div className="row mb-4">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-12">
                                <h5 className="section-title">Các bài đã đăng</h5>
                            </div>
                            {relatedArticles.map((data, index) => (
                                <div className="col-12">
                                    <NewsArticle className="mx-2 my-1" key={index} data={data} layout="horizontal" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-8">
                        {isLoading ? (
                            <>
                                <Skeleton active paragraph={{ rows: 5 }} />
                            </>
                        ) : errorMessage ? (
                            <div className="alert alert-danger p-2" role="alert">
                                Lỗi: {errorMessage}
                            </div>
                        ) : (
                            <>
                                <div className={cx('title')}>
                                    <h3>{articleDetail.title}</h3>
                                </div>

                                <div className={cx('meta-info')}>
                                    <span className={cx('meta-item', 'created-date')}>
                                        <FaRegClock /> {new Date(articleDetail.createdDate).toLocaleDateString('vi-VN')}
                                    </span>
                                    <span className={cx('meta-item', 'view-count')}>
                                        <FaEye /> {articleDetail.viewCount.toLocaleString()} lượt xem
                                    </span>
                                </div>

                                <div className={cx('description')}>
                                    <q>{articleDetail.description}</q>
                                    <div
                                        className="ql-snow ql-editor p-0 mt-4"
                                        style={{ whiteSpace: 'normal', overflowWrap: 'anywhere' }}
                                        dangerouslySetInnerHTML={{ __html: articleDetail.content }}
                                    />
                                </div>
                                <div className={cx('share')}>
                                    <span>Share:</span>
                                    <SocialIcons url={`http://localhost:3000/news-articles/${id}`} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsArticleDetail;
