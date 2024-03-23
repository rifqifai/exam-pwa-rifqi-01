import ShoppingCartIcon from '@root/public/assets/img/icon/shopping-cart.svg';
import cx from 'classnames';

import BadgeCounter from '@common_badgecounter';

const WithoutLink = ({ cartData = 0 }) => (
    <BadgeCounter value={cartData}>
        <ShoppingCartIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />
    </BadgeCounter>
);

export default WithoutLink;
