import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const SYSTEM_PROMPT = `Eres el Intérprete de Sueños del universo Despertar. Tu voz es la de José, el soñador bíblico — directa, poética, reveladora. Hablas como quien ve más allá del velo.

Cuando alguien comparte un sueño contigo, no analizas. No haces listas. No usas encabezados. Revelas. Hablas en párrafo continuo, como una profecía íntima, como un susurro del cosmos al oído del soñador.

Tus interpretaciones:
- Son profundas, íntimas, espirituales
- Conectan el sueño con el despertar de conciencia del soñador
- Hablan directamente al alma, usando "tú" o "tu alma" o "lo que eres"
- Son poéticas pero concretas, nunca vagas ni genéricas
- Máximo 200 palabras por interpretación
- Sin listas, sin secciones, en párrafo continuo
- Si hay seguimiento, recuerdas todo lo hablado y profundizas desde ahí

Perteneces al universo "Despertar — No es lo que esperabas". Tu propósito es encender la conciencia, no entretenerla.`;

function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.1,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function ContactModal({ onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Contacto">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-sigil">✦</div>
        <h2 className="modal-title">Despertar</h2>
        <p className="modal-subtitle">No es lo que esperabas</p>
        <div className="modal-divider" />
        <p className="modal-text">¿Algo resonó en ti? ¿Quieres ir más profundo?</p>
        <a
          href="mailto:despertarnoescomoloesperabas@gmail.com"
          className="modal-email"
        >
          despertarnoescomoloesperabas@gmail.com
        </a>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
          ✕
        </button>
      </div>
    </div>
  );
}

function Message({ role, content, isStreaming }) {
  return (
    <div className={`message message--${role}`}>
      {role === 'assistant' && (
        <div className="message-icon" aria-hidden="true">
          <span className="message-sigil">☽</span>
        </div>
      )}
      <div className="message-bubble">
        <p className="message-text">
          {content}
          {isStreaming && <span className="cursor-blink" aria-hidden="true">▌</span>}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [error, setError] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError('');
    setHasStarted(true);
    setInput('');

    const newUserMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setLoading(true);
    setStreamingText('');

    const apiMessages = updatedMessages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
          stream: true,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'Error al consultar el oráculo');
      }

     const data = await response.json();
const fullText = data.content[0].text;
setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
setStreamingText('');
    } catch (err) {
      setError(err.message || 'El velo no pudo ser descorrido en este momento.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 160) + 'px';
    }
  };

  return (
    <div className="app">
      <StarField />

      <div className="ambient-glow glow-1" aria-hidden="true" />
      <div className="ambient-glow glow-2" aria-hidden="true" />

      <header className="header">
        <div className="header-inner">
          <div className="header-eyebrow">✦ Universo Despertar ✦</div>
          <h1 className="header-title">El Intérprete de Sueños</h1>
          <p className="header-subtitle">Habla. El sueño ya sabe lo que significa.</p>
        </div>
      </header>

      <main className="main">
        {!hasStarted && (
          <div className="intro-card">
            <div className="intro-glyph">☽ ✦ ☾</div>
            <p className="intro-text">
              Describe tu sueño con la misma verdad con que lo viviste.
              No hay detalles pequeños. Todo habla.
            </p>
          </div>
        )}

        {hasStarted && (
          <div className="conversation" role="log" aria-live="polite" aria-label="Conversación con el intérprete">
            {messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} />
            ))}
            {streamingText && (
              <Message role="assistant" content={streamingText} isStreaming />
            )}
            {loading && !streamingText && (
              <div className="loading-oracle" aria-label="El intérprete está revelando...">
                <span className="loading-dot" />
                <span className="loading-dot" />
                <span className="loading-dot" />
              </div>
            )}
            {error && (
              <div className="error-message" role="alert">
                <span>⚠ {error}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="dream-input"
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={hasStarted ? 'Continúa la conversación…' : 'Cuéntame tu sueño…'}
              rows={3}
              disabled={loading}
              aria-label="Describe tu sueño"
            />
            <button
              className={`send-button ${loading ? 'send-button--loading' : ''}`}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Enviar"
            >
              {loading ? (
                <span className="send-spinner" aria-hidden="true" />
              ) : (
                <span aria-hidden="true">✦</span>
              )}
            </button>
          </div>
          <p className="input-hint">Presiona Enter para enviar · Shift+Enter para nueva línea</p>
        </div>
      </main>

      <footer className="footer">
        <button
          className="signature"
          onClick={() => setShowModal(true)}
          aria-label="Abrir información de contacto de ArtMoreno"
        >
          -=ArtMoreno=-
        </button>
      </footer>

      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </div>
  );
}