import { Link } from 'react-router-dom';
import { LiaCalendarSolid } from 'react-icons/lia';
import { Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import classNames from 'classnames/bind';
import styles from './NewsArticle.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

function NewsArticle({ className, data, layout = 'vertical' }) {
    const postDate = dayjs(data.createdDate);
    const isNew = dayjs().diff(postDate, 'day') <= 7;

    return (
        <div
            className={cx('wrapper', className, {
                horizontal: layout === 'horizontal',
            })}
        >
            <div className={cx('image-wrapper')}>
                <Link to={`/news-articles/${data.titleSlug}`}>
                    <img src={data.image || images.placeimgHorizontal} alt={data.id} />
                </Link>
            </div>

            <div className={cx('content')}>
                <ul className={cx('metaInfo')}>
                    <li>
                        <Link to={`/news-articles/${data.titleSlug}`} className="d-flex align-items-center">
                            <LiaCalendarSolid />
                            {data.createdDate}
                        </Link>
                    </li>
                    {isNew && (
                        <li className="ms-2">
                            <Tag color="lime">Mới nhất</Tag>
                        </li>
                    )}
                </ul>

                <div className={cx('title')}>
                    <Tooltip title={data.title}>
                        <Link to={`/news-articles/${data.titleSlug}`}>{data.title}</Link>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default NewsArticle;
