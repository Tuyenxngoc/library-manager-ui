import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Book from './Book';
import SectionHeader from './SectionHeader';

import classNames from 'classnames/bind';
import styles from '~/styles/ProductList.module.scss';
import { getBookByBookDefinitionsForUser } from '~/services/bookDefinitionService';
import queryString from 'query-string';

const cx = classNames.bind(styles);

function BookList({ filters, title, subtitle, messageApi, fetchData = getBookByBookDefinitionsForUser }) {
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const [entityData, setEntityData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };

    const goToPrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const handleViewAll = () => {
        navigate('/books');
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
    };

    useEffect(() => {
        const fetchEntities = async () => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const params = queryString.stringify(filters);
                const response = await fetchData(params);
                const { items } = response.data.data;
                if (items) {
                    setEntityData(items);
                } else {
                    setEntityData(response.data.data);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau.';
                setErrorMessage(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntities();
    }, [filters]);

    return (
        <section className={cx('wrapper', 'sectionspace')}>
            <div className="container">
                <div className="row mb-3">
                    <div className="col-12">
                        <SectionHeader
                            subtitle={subtitle}
                            title={title}
                            onPrev={goToPrevSlide}
                            onNext={goToNextSlide}
                            onViewAll={handleViewAll}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {isLoading ? (
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : errorMessage ? (
                            <div className="alert alert-danger text-center" role="alert">
                                <strong>Error:</strong> {errorMessage}
                            </div>
                        ) : (
                            <Slider ref={sliderRef} {...settings}>
                                {entityData.map((data, index) => (
                                    <Book className="mx-2 my-1" key={index} data={data} messageApi={messageApi} />
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookList;
