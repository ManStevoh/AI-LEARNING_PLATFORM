function readCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : '';
}

export async function askMentor({ message, lessonSlug }) {
    const response = await fetch('/learner/mentor/ask', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            message,
            lesson_slug: lessonSlug,
        }),
    });

    if (!response.ok) {
        throw new Error('Unable to reach the AI mentor.');
    }

    return response.json();
}
