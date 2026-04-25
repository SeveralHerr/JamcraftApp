import { useState, useEffect, useRef } from 'react';
import { FadeUp } from '../../../components/FadeUp';
import { SectionHead } from '../../../components/SectionHead';
import { Icon } from '../../../components/Icon';
import { socialLinks } from '../../../social/data/social-links-data';
import type { SocialLink } from '../../../social/entities/SocialLink';

const REASONS = ['Podcast invite', 'Speaking slot', 'Collaboration', 'Just saying hi'];

interface FormState {
  name: string;
  email: string;
  reason: string;
  message: string;
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', reason: '', message: '' });
  const [sent, setSent] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    timerRef.current = setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" aria-label="Contact" style={{ padding: '72px 0 96px' }}>
      <div className="contact-section-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <SectionHead
          title="Get in touch"
          kicker="Back of the book"
          countLabel="Open to conversations"
        />

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 72, alignItems: 'start' }}>
          <FadeUp>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(24px, 3vw, 32px)',
              lineHeight: 1.25,
              fontWeight: 500,
              margin: '0 0 20px',
            }}>
              Podcast invite, speaking slot, collaboration, or just want to talk shop about Godot?
            </p>
            <p style={{ fontSize: 15, color: 'var(--fg-dim)', lineHeight: 1.6, maxWidth: 460, marginBottom: 28 }}>
              I read everything. Email is fastest, but any channel below works — or send a note right from this page.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {socialLinks.map((s, i) => (
                <ContactRow key={s.label} social={s} isFirst={i === 0} />
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <form
              onSubmit={handleSubmit}
              aria-label="Contact form"
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--line)',
                padding: 32,
              }}
            >
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: 20,
              }}>
                Send a note
              </div>

              <FormField
                label="Your name"
                value={form.name}
                onChange={v => setForm(f => ({ ...f, name: v }))}
              />
              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={v => setForm(f => ({ ...f, email: v }))}
              />

              <div style={{ marginBottom: 18 }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-faint)',
                  marginBottom: 10,
                }}>
                  Reason
                </div>
                <div role="group" aria-label="Contact reason" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {REASONS.map(r => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={form.reason === r}
                      onClick={() => setForm(f => ({ ...f, reason: r }))}
                      style={{
                        padding: '6px 12px',
                        fontSize: 12,
                        fontFamily: 'inherit',
                        cursor: 'pointer',
                        background: form.reason === r ? 'var(--accent-dim)' : 'transparent',
                        color: form.reason === r ? 'var(--accent)' : 'var(--fg-dim)',
                        border: `1px solid ${form.reason === r ? 'var(--accent)' : 'var(--line-strong)'}`,
                        transition: 'all .15s',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <FormField
                label="Message"
                multiline
                value={form.message}
                onChange={v => setForm(f => ({ ...f, message: v }))}
              />

              <button
                type="submit"
                disabled={sent}
                style={{
                  width: '100%',
                  padding: '14px 22px',
                  background: sent ? 'var(--accent-muted)' : 'var(--accent)',
                  color: 'var(--bg)',
                  border: 'none',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  cursor: sent ? 'default' : 'pointer',
                  marginTop: 8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  transition: 'all .2s',
                }}
              >
                {sent ? "✓ Message sent — I'll be in touch" : <><span>Send</span> <Icon name="arrow" size={14} /></>}
              </button>
            </form>
          </FadeUp>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 560px) {
          .contact-section-inner { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}

function ContactRow({ social, isFirst }: { social: SocialLink; isFirst: boolean }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={social.url}
      target={social.url.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={`${social.label} — ${social.handle}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '42px 110px 1fr 18px',
        alignItems: 'center',
        gap: 16,
        padding: '16px 6px',
        borderTop: isFirst ? '1px solid var(--line)' : 'none',
        borderBottom: '1px solid var(--line)',
        cursor: 'pointer',
        background: hover ? `linear-gradient(90deg, var(--accent-trace), transparent 70%)` : 'transparent',
        transition: 'background .2s',
        textDecoration: 'none',
      }}
    >
      <div style={{ color: hover ? 'var(--accent)' : 'var(--fg)', transition: 'color .2s' }}>
        <Icon name={social.icon} size={18} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{social.label}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--fg-dim)' }}>
        {social.handle}
      </div>
      <div style={{
        color: hover ? 'var(--accent)' : 'var(--fg-faint)',
        transform: hover ? 'translateX(3px)' : 'none',
        transition: 'all .2s',
      }}>
        <Icon name="arrow" size={14} />
      </div>
    </a>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: React.HTMLInputTypeAttribute;
  multiline?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const commonStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focus ? 'var(--accent)' : 'var(--line-strong)'}`,
    color: 'var(--fg)',
    fontFamily: 'inherit',
    fontSize: 15,
    padding: '10px 0',
    transition: 'border-color .2s',
    resize: 'vertical',
  };

  return (
    <div style={{ marginBottom: 18 }}>
      <label
        htmlFor={fieldId}
        style={{
          display: 'block',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '.15em',
          textTransform: 'uppercase',
          color: focus ? 'var(--accent)' : 'var(--fg-faint)',
          marginBottom: 4,
          transition: 'color .2s',
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={fieldId}
          rows={4}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={e => onChange(e.target.value)}
          style={commonStyle}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={e => onChange(e.target.value)}
          style={commonStyle}
        />
      )}
    </div>
  );
}
