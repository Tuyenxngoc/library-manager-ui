import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { Alert, Spin } from 'antd';
import NewsArticle from '~/components/NewsArticle';
import SectionHeader from '~/components/SectionHeader';
import { getNewsArticlesForUser } from '~/services/newsArticlesService';

function NewsArticleList() {
    const sliderRef = useRef(null);
    const navigate = useNavigate();

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
                const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau.';
                setErrorMessage(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntities();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
    };

    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };

    const goToPrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const handleViewAll = () => {
        navigate('/news');
    };

    return (
        <section className="sectionspace">
            <div className="container">
                <div className="row mb-3">
                    <div className="col-12">
                        <SectionHeader
                            subtitle="Tin tức & bài viết mới nhất"
                            title={<h2 className="mb-0">Tin nổi bật trong ngày</h2>}
                            onPrev={goToPrevSlide}
                            onNext={goToNextSlide}
                            onViewAll={handleViewAll}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {isLoading ? (
                            <div className="d-flex justify-content-center w-100">
                                <Spin size="large" />
                            </div>
                        ) : errorMessage ? (
                            <div className="w-100">
                                <Alert message="Lỗi" description={errorMessage} type="error" />
                            </div>
                        ) : (
                            <Slider ref={sliderRef} {...settings}>
                                {entityData.map((data, index) => (
                                    <NewsArticle className="mx-2 my-1" key={index} data={data} />
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewsArticleList;
