import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Alert } from 'antd';
import { getSlides } from '~/services/systemSettingService';

function Slider() {
    const [entityData, setEntityData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchEntities = async () => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const params = queryString.stringify({ activeFlag: true });
                const response = await getSlides(params);
                setEntityData(response.data.data);
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

    if (isLoading) {
        return (
            <div className="d-flex flex-column gap-2">
                <div className="placeholder-glow">
                    <span className="placeholder col-12" style={{ height: '400px', display: 'block' }}></span>
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="container">
                <Alert message="Lỗi" description={errorMessage} type="error" />
            </div>
        );
    }

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            {/* Indicators */}
            <div className="carousel-indicators">
                {entityData.map((_, index) => (
                    <button
                        type="button"
                        key={index}
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
                {entityData.map((slide, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <img src={slide.imageUrl} className="d-block w-100" alt={`Slide ${index}`} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{slide.title}</h5>
                            <p>{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Slider;
