import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export function SubscribeNowButton() {
  const { data } = useSession();

  async function handleSubscribe() {
    if (!data) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeNowButton}
      onClick={handleSubscribe}
    >
      <p>
        Want to continue reading?
        <span> Subscribe now! 🤗</span>
      </p>
    </button>
  );
}
