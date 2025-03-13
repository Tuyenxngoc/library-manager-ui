import { Alert, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import { backgrounds } from '~/assets';
import Breadcrumb from '~/components/Breadcrumb';
import NewsArticle from '~/components/NewsArticle';
import SectionHeader from '~/components/SectionHeader';
import { getNewsArticlesForUser } from '~/services/newsArticlesService';

function News() {
    const [entityData, setEntityData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchEntities = async () => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const response = await getNewsArticlesForUser();
                const { items } = response.data.data;
                setEntityData(items);
            } catch (error) {
                const errorMessage =
                    error.response?.data?.message || error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau.';
                setErrorMessage(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntities();
    }, []);

    const items = [
        {
            label: 'Trang chủ',
            url: '/',
        },
        {
            label: 'Danh sách tin tức',
        },
    ];

    return (
        <>
            <Parallax bgImage={backgrounds.bgparallax6} strength={500}>
                <div className="innerbanner">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <h1>Danh sách tin tức</h1>
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
                    <div className="col-lg-4 col-md-5 col-12">
                        <h5 className="section-title">Phân loại tin tức</h5>
                    </div>
                    <div className="col-lg-8 col-md-7 col-12">
                        <SectionHeader
                            title={<h2 className="mb-0">Danh sách tin tức</h2>}
                            subtitle="Tin tức và bài viết mới nhất"
                            className="mb-4"
                        />

                        {isLoading ? (
                            <div className="d-flex justify-content-center w-100">
                                <Spin size="large" />
                            </div>
                        ) : errorMessage ? (
                            <div className="w-100">
                                <Alert message="Lỗi" description={errorMessage} type="error" />
                            </div>
                        ) : (
                            <div className="row">
                                {entityData.map((data, index) => (
                                    <div className="col-12">
                                        <NewsArticle
                                            className="mx-2 my-1"
                                            key={index}
                                            data={data}
                                            layout="horizontal"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default News;
