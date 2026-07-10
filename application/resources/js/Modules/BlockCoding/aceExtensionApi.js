function readCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : '';
}

export async function markLessonCheckpoint(lessonSlug, stepKey) {
    const response = await fetch(`/learner/learn/${lessonSlug}/checkpoints`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            step_key: stepKey,
        }),
    });

    if (!response.ok) {
        throw new Error('Unable to save lesson checkpoint.');
    }

    return response.json();
}

export async function explainBlockScript(lessonSlug, { script, context }) {
    const response = await fetch(`/learner/learn/${lessonSlug}/explain-script`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            script,
            context,
        }),
    });

    if (!response.ok) {
        throw new Error('Unable to explain block script.');
    }

    return response.json();
}
