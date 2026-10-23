'use client';

import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import Link from 'next/link';
import { getApiBaseUrl } from '@/lib/api-base';
const pendingSubmissionKey = 'shopademia:contact:pending:v1';

type SessionMarker = 'checking' | 'clear' | 'pending' | 'unavailable';

function subscribeToSessionStorage(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
}

function getSessionMarker(): SessionMarker {
  try {
    return window.sessionStorage.getItem(pendingSubmissionKey) === null
      ? 'clear'
      : 'pending';
  } catch {
    return 'unavailable';
  }
}

function getServerSessionMarker(): SessionMarker {
  return 'checking';
}

type SubmissionResult = {
  ticketReference: string;
  notificationSent: boolean;
};

type FormResult =
  | { kind: 'saved'; reference: string; notificationSent: boolean; canSubmitAgain: boolean }
  | { kind: 'error'; message: string; retrySafe: boolean };

function isSubmissionResult(value: unknown): value is SubmissionResult {
  return typeof value === 'object' &&
    value !== null &&
    'ticketReference' in value &&
    typeof value.ticketReference === 'string' &&
    'notificationSent' in value &&
    typeof value.notificationSent === 'boolean';
}

export function ContactForm() {
  const submissionStarted = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sessionMarker = useSyncExternalStore(
    subscribeToSessionStorage,
    getSessionMarker,
    getServerSessionMarker,
  );
  const [result, setResult] = useState<FormResult | null>(null);
  const submissionOutcomeUncertain = result?.kind === 'error' && !result.retrySafe;
  const formLocked =
    sessionMarker !== 'clear' ||
    isSubmitting ||
    submissionOutcomeUncertain ||
    (result?.kind === 'saved' && !result.canSubmitAgain);

  async function submitContactRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formLocked || submissionStarted.current) {
      return;
    }

    submissionStarted.current = true;
    setIsSubmitting(true);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      window.sessionStorage.setItem(pendingSubmissionKey, 'pending');
    } catch {
      setIsSubmitting(false);
      setResult({
        kind: 'error',
        retrySafe: false,
        message: 'This browser could not record a request-safety marker, so no request was sent. Enable session storage or use another browser before trying again.',
      });
      return;
    }

    try {
      const response = await fetch(`${getApiBaseUrl()}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
      });
      const body: unknown = await response.json().catch(() => null);

      if (response.ok && isSubmissionResult(body)) {
        form.reset();
        let canSubmitAgain = false;
        try {
          window.sessionStorage.removeItem(pendingSubmissionKey);
          canSubmitAgain = true;
        } catch {
          // Keep the confirmed receipt visible, but prevent another submission in this tab.
        }
        submissionStarted.current = !canSubmitAgain;
        setResult({
          kind: 'saved',
          reference: body.ticketReference,
          notificationSent: body.notificationSent,
          canSubmitAgain,
        });
        return;
      }

      const retrySafe = !response.ok && [400, 422, 429].includes(response.status);
      if (retrySafe) {
        try {
          window.sessionStorage.removeItem(pendingSubmissionKey);
          submissionStarted.current = false;
        } catch {
          submissionStarted.current = true;
        }
      }
      setResult({
        kind: 'error',
        retrySafe: retrySafe && !submissionStarted.current,
        message: retrySafe
          ? submissionStarted.current
            ? 'The request was rejected, but this browser could not clear its safety marker. The form remains locked; check with an authorized Shopademia operator before retrying.'
            : response.status === 429
              ? 'The request was not accepted because the support service is rate limiting submissions. Wait before trying again.'
              : 'The request was not accepted. Review the required fields and correct any validation errors before trying again.'
          : 'We could not confirm whether your request was saved. This form is locked to prevent a duplicate; check with an authorized Shopademia operator before retrying.',
      });
    } catch {
      setResult({
        kind: 'error',
        retrySafe: false,
        message: 'We could not confirm whether your request was saved or emailed. This form is locked to prevent a duplicate; check with an authorized Shopademia operator before retrying.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={(event) => void submitContactRequest(event)}>
      <div className="contact-form-grid">
        <div className="contact-form-field">
          <label htmlFor="contact-name">Name</label>
          <input autoComplete="name" disabled={formLocked} id="contact-name" maxLength={120} name="name" required />
        </div>
        <div className="contact-form-field">
          <label htmlFor="contact-email">Email</label>
          <input autoComplete="email" disabled={formLocked} id="contact-email" maxLength={254} name="email" required type="email" />
        </div>
        <div className="contact-form-field">
          <label htmlFor="contact-category">Inquiry category</label>
          <select disabled={formLocked} id="contact-category" name="category" required defaultValue="">
            <option disabled value="">Choose a topic</option>
            <option value="general">General question</option>
            <option value="order">Order</option>
            <option value="shipping">Shipping</option>
            <option value="returns">Returns</option>
            <option value="payments">Payments</option>
            <option value="account">Account problem</option>
            <option value="seller_registration">Seller registration</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="contact-form-field">
          <label htmlFor="contact-subject">Subject</label>
          <input disabled={formLocked} id="contact-subject" maxLength={160} name="subject" required />
        </div>
        <div className="contact-form-field contact-form-message">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            disabled={formLocked}
            maxLength={5000}
            minLength={10}
            name="message"
            required
            rows={7}
          />
          <p>Do not include passwords, payment details, or authentication codes.</p>
        </div>
      </div>
      <div className="contact-form-trap" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input autoComplete="off" disabled={formLocked} id="contact-website" name="website" tabIndex={-1} />
      </div>
      <p className="contact-form-privacy">
        Support intake is disabled unless the API has been explicitly enabled after retention and privacy
        approval, and its database and email settings are available. See the <Link href="/privacy">privacy information</Link>.
      </p>
      <button className="catalog-submit" disabled={isSubmitting || formLocked} type="submit">
        {isSubmitting ? 'Sending request…' : 'Send support request'}
      </button>
      {result?.kind === 'saved' ? (
        <p className="contact-form-success" role="status">
          Request saved with reference <strong>{result.reference}</strong>.
          {result.notificationSent
            ? ' The configured mail service accepted the notification; delivery to the recipient is not confirmed.'
            : ' The request was saved, but notification acceptance was not confirmed. Keep this reference.'}
          {!result.canSubmitAgain
            ? ' This tab remains locked because its request-safety marker could not be cleared.'
            : null}
        </p>
      ) : null}
      {result?.kind === 'error' ? (
        <p className="contact-form-error" role="alert">{result.message}</p>
      ) : sessionMarker === 'pending' ? (
        <p className="contact-form-error" role="alert">
          A previous submission in this tab has an unconfirmed outcome. The form is locked to prevent a possible duplicate; check with an authorized Shopademia operator before retrying.
        </p>
      ) : sessionMarker === 'unavailable' ? (
        <p className="contact-form-error" role="alert">
          This browser could not verify the request status for this tab, so the form is unavailable. Check with an authorized Shopademia operator before submitting again.
        </p>
      ) : null}
    </form>
  );
}
