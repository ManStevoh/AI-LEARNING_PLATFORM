import { useState } from 'react';
import { askMentor } from './mentorAsk.js';

export default function MentorPanel({ lessonSlug, lessonTitle }) {
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmed = message.trim();

        if (trimmed === '') {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await askMentor({
                message: trimmed,
                lessonSlug,
            });
            setReply(result.reply);
        } catch {
            setError('The mentor is unavailable right now. Try again in a moment.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">AI mentor</h2>
            <p className="mt-2 text-sm text-violet-900">
                Ask for a hint about {lessonTitle}. The mentor guides you without giving the full answer.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <textarea
                    className="min-h-[96px] w-full rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm text-[var(--color-text-primary)] shadow-sm focus:border-violet-400 focus:outline-none"
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="What are you trying to do in this lesson?"
                    value={message}
                />
                <button
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isLoading || message.trim() === ''}
                    type="submit"
                >
                    {isLoading ? 'Thinking…' : 'Ask mentor'}
                </button>
            </form>

            {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}

            {reply ? (
                <div className="mt-4 rounded-xl border border-violet-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">Mentor reply</p>
                    <p className="mt-2 text-sm text-[var(--color-text-primary)]">{reply}</p>
                </div>
            ) : null}
        </section>
    );
}
