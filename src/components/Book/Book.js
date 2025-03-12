import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Book.module.scss';
import images from '~/assets';

const cx = classNames.bind(styles);

function Book({ className, data }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('featureimg')}>
                <Link to={`/books/${data.id}`}>
                    <img src={data.imageUrl || images.placeimg} alt={data.title} />
                </Link>
                <div className={cx('tags')}>
                    {data.quantity === 0 && <div className={cx('tag-soldout')}>Hết sách</div>}
                    <div className={cx('tag-saleoff')}>HOT</div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('title')}>
                    <Link to={`/books/${data.id}`}>{data.title}</Link>
                </div>

                <div className={cx('bookwriter')}>
                    <span>Tác giả: </span>
                    {data.authors.length > 0 ? (
                        <>
                            {data.authors.slice(0, 2).map((author, index) => (
                                <React.Fragment key={author.id || index}>
                                    <Link to={`/books?authorId=${author.id}`}>{author.name}</Link>
                                    {index < Math.min(1, data.authors.length - 1) && ', '}
                                </React.Fragment>
                            ))}
                            {data.authors.length > 2 && <span> và {data.authors.length - 2} tác giả khác</span>}
                        </>
                    ) : (
                        'Không xác định'
                    )}
                </div>
            </div>
        </div>
    );
}

export default Book;
