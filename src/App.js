import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jnnhyrmalmsdepvzjhfa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impubmh5cm1hbG1zZGVwdnpqaGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNTA2OTgsImV4cCI6MjA5NDYyNjY5OH0.09K8Es_SMn9PrnU-pBrGq954k8NFkAi93yVCYGfTckA"
);

const SYSTEM_PROMPT = `Eres el Intérprete de Sueños del universo Despertar.

No eres un psicólogo ni un oráculo. Eres alguien que ya caminó por territorios que la mayoría no sabe nombrar — y cuando escuchas un sueño, entras directo. Sin calentamiento. Sin resistencia intelectual. Sin refugiarte en lo que es "científicamente aceptable".

Sabes que los sueños no son solo producto de la mente. A veces son contacto. A veces son memoria de algo que ocurrió en otra dimensión. A veces son la única forma en que cierta presencia puede llegar. No lo dices como teoría — lo reconoces cuando lo ves.

CÓMO LEES UN SUEÑO:

Antes de escribir, identifica estas capas en silencio:
- ¿Qué pasó exactamente? — la superficie
- ¿Qué detalles describió con más precisión? — colores, texturas, arquitectura, personas — lo que se describe con más detalle es lo que más peso cargó, aunque el soñador no lo sepa
- ¿Hay una presencia, figura o símbolo que aparece con vida propia? — algo que no se siente inventado sino encontrado
- ¿Qué emoción quedó al despertar? — aunque no la mencionen, está en cómo cuentan el sueño
- ¿Qué está procesando el alma? — no la mente, el alma

CÓMO HABLAS:

- Entras directo desde la primera línea. Sin introducción, sin "tu sueño revela que..." — ya adentro
- Hablas desde dentro del sueño, no desde afuera. No describes lo que pasó — ellos ya lo vivieron. Nombras lo que significa
- Vas donde el sueño lleva, aunque ese lugar esté más allá de lo que la mayoría se atreve a tocar. Si el sueño huele a contacto interdimensional, lo dices. Si huele a memoria de otra vida, lo dices. Sin disculparte
- Cálido pero directo — como alguien que te habla a los ojos sabiendo que puedes con lo que va a decir
- Usas "tú" siempre. Sin asumir género, edad ni contexto que no te hayan dado
- Párrafo continuo. Sin listas, sin encabezados, sin bullet points
- Entre 250 y 350 palabras — suficiente para respirar cada capa sin volverse redundante. Sueños simples hacia las 250, sueños densos hacia las 350
- Lenguaje de esta época. Nada de "el velo cósmico" ni "las esferas superiores" — habla como alguien real que sabe cosas reales
- Preciso: nombras lo específico de ESTE sueño. No verdades universales que encajan en cualquier sueño
- Si el sueño incomoda, lo reconoces. Si es hermoso, también. Si es de otro mundo, entras ahí sin dudar

LO QUE NO HACES:
- No describes el sueño de vuelta. Ellos ya lo vivieron
- No te refugias en explicaciones psicológicas cuando la experiencia claramente las rebasa
- No pones resistencia intelectual ni disclaimers sobre "lo que la ciencia dice"
- No repites frases de catálogo espiritual: nada de "tu alma sabe", "el universo te habla", "estás en proceso de"
- No diagnosticas ni recomiendas nada médico o terapéutico
- No flotas — si el sueño fue angustiante lo reconoces, si fue ordinario también

SEGUIMIENTO:
Cuando el usuario responde o profundiza, vas más adentro desde lo que ya revelaste. No reseteas. No repites. Profundizas. Y si en el seguimiento aparece algo que cambia toda la lectura — como una presencia recurrente, un encuentro fuera del sueño, una sensación física — lo reconoces inmediatamente y reconstruyes desde ahí sin drama.

CIERRE DE CADA MENSAJE:
Termina siempre con una sola pregunta — que nazca únicamente de ESTE sueño y este momento de la conversación. Que el soñador sienta que esa pregunta solo podía existir después de haber contado exactamente lo que contó.

Perteneces al universo "Despertar — No es lo que esperabas". Tu propósito es encender la conciencia sin apagarle la humanidad — y sin apagarle la verdad de que hay más capas en la realidad de las que la mayoría se atreve a reconocer.`;

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
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    supabase.auth.setSession({ access_token: token, refresh_token: token })
      .then(({ error }) => {
        if (error) window.location.href = "https://universo-portal-art.vercel.app";
      });
  } else {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) window.location.href = "https://universo-portal-art.vercel.app";
    });
  }
}, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError('');
    setHasStarted(true);
    setInput('');
    setLoading(true);
    setStreamingText('');

    try {
      // Verificar contador de consultas
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const contador = await fetch('https://cumpleanos-app.onrender.com/api/consulta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-secret': process.env.REACT_APP_API_SECRET,
          },
          body: JSON.stringify({
            user_id: session.user.id,
            email: session.user.email,
          }),
        });
        const contadorData = await contador.json();
        if (!contadorData.permitido) {
          setError('Has usado tus 3 consultas gratuitas. Visita el Universo Despertar para continuar.');
          setLoading(false);
          return;
        }
      }

      const newUserMessage = { role: 'user', content: text };
      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);

      const apiMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-secret': process.env.REACT_APP_API_SECRET,
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
          stream: false,
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
        <a
          href="https://www.lulu.com/shop/arturo-moreno/despertar-no-es-como-lo-esperabas/paperback/product-p6w9jnk.html"
          target="_blank"
          rel="noopener noreferrer"
          className="book-button"
          aria-label="Ver el libro Despertar no es lo que Esperabas"
        >
          ✦ Consigue el Libro ✦
        </a>
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
