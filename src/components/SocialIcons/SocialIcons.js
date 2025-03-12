import images from '~/assets';
import classNames from 'classnames/bind';
import styles from './SocialIcons.module.scss';

const cx = classNames.bind(styles);

function SocialIcons({ url = 'https://example.com' }) {
    const shareUrl = encodeURIComponent(url);
    const shareText = encodeURIComponent('Check this out!');

    return (
        <ul className={cx('wrapper')}>
            <li>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img width={30} src={images.facebook} alt="icon" />
                </a>
            </li>
            <li>
                <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img width={30} src={images.twitter} alt="icon" />
                </a>
            </li>
            <li>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img width={30} src={images.linkedin} alt="icon" />
                </a>
            </li>
            <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                    <img width={30} src={images.googleplus} alt="icon" />
                </a>
            </li>
            <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                    <img width={30} src={images.rss} alt="icon" />
                </a>
            </li>
        </ul>
    );
}

export default SocialIcons;
