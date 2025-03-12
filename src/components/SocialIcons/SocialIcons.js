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
                    <img width={30} src={images.facebook} alt="Facebook" />
                </a>
            </li>
            <li>
                <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img width={30} src={images.x} alt="X (Twitter)" />
                </a>
            </li>
            <li>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img width={30} src={images.linkedin} alt="LinkedIn" />
                </a>
            </li>
            <li>
                <a
                    href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${images.pinterest}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img width={30} src={images.pinterest} alt="Pinterest" />
                </a>
            </li>
            <li>
                <a
                    href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img width={30} src={images.whatsapp} alt="WhatsApp" />
                </a>
            </li>
            <li>
                <a
                    href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img width={30} src={images.telegram} alt="Telegram" />
                </a>
            </li>
        </ul>
    );
}

export default SocialIcons;
