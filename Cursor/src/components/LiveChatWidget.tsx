import { useState } from 'react';

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-700">Live chat</div>
            <button className="text-slate-500" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="mb-2 text-xs text-slate-500">Ask us anything. We typically reply within minutes.</div>
          <textarea
            className="mb-2 h-24 w-full resize-none rounded-lg border border-slate-300 p-2 text-sm"
            placeholder="Type your question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={() => { setMessage(''); alert('Thanks! We will reply by email.'); }}
            className="w-full rounded-lg bg-brand.primary py-2 text-sm text-white hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} className="rounded-full bg-brand.primary px-4 py-3 text-white shadow-lg">Chat</button>
    </div>
  );
}