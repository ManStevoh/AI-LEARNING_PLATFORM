function mulberry32(seed) {
    let value = seed >>> 0;

    return () => {
        value += 0x6d2b79f5;
        let t = value;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function hsl(random, saturation = 65, lightness = 55) {
    const hue = Math.floor(random() * 360);

    return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

export function createProceduralSeed() {
    return Math.floor(Math.random() * 1_000_000_000);
}

export function generateProceduralBackdropSvg(seed = 1) {
    const random = mulberry32(Number(seed) || 1);
    const style = Math.floor(random() * 4);
    const sky = hsl(random, 70, random() > 0.5 ? 72 : 28);
    const ground = hsl(random, 55, random() > 0.5 ? 45 : 62);
    const accent = hsl(random, 80, 50);

    if (style === 0) {
        const hills = Array.from({ length: 4 }, (_, index) => {
            const y = 200 + index * 18 + random() * 30;
            const height = 80 + random() * 90;

            return `<ellipse cx="${120 + index * 90 + random() * 40}" cy="${y}" rx="${140 + random() * 60}" ry="${height}" fill="${hsl(random, 50, 35 + index * 8)}" opacity="0.9"/>`;
        }).join('');

        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="${sky}"/><rect y="220" width="480" height="140" fill="${ground}"/>${hills}<circle cx="${60 + random() * 360}" cy="${50 + random() * 80}" r="${24 + random() * 28}" fill="${accent}" opacity="0.85"/></svg>`;
    }

    if (style === 1) {
        const stars = Array.from({ length: 48 }, () => {
            const x = random() * 480;
            const y = random() * 220;
            const r = 1 + random() * 2.2;

            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff" opacity="${0.4 + random() * 0.6}"/>`;
        }).join('');

        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="${sky}"/>${stars}<circle cx="${360 + random() * 60}" cy="${70 + random() * 50}" r="${36 + random() * 20}" fill="${accent}" opacity="0.75"/></svg>`;
    }

    if (style === 2) {
        const stripes = Array.from({ length: 10 }, (_, index) => {
            const color = index % 2 === 0 ? accent : ground;

            return `<rect x="${index * 48}" y="0" width="48" height="360" fill="${color}" opacity="0.85"/>`;
        }).join('');

        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="${sky}"/>${stripes}</svg>`;
    }

    const bubbles = Array.from({ length: 20 }, () => {
        const x = random() * 480;
        const y = random() * 360;
        const r = 8 + random() * 28;

        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${accent}" opacity="${0.15 + random() * 0.35}"/>`;
    }).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="${sky}"/>${bubbles}<path d="M0 250 Q120 210 240 250 T480 250 V360 H0Z" fill="${ground}"/></svg>`;
}

export function proceduralBackdropDataUrl(seed) {
    const svg = generateProceduralBackdropSvg(seed);

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function createProceduralBackdropEntry(seed = createProceduralSeed()) {
    const paletteSeed = seed % 997;

    return {
        type: 'procedural',
        id: `backdrop-proc-${seed}`,
        name: `Surprise ${paletteSeed}`,
        seed,
        color: `hsl(${paletteSeed % 360} 65% 70%)`,
    };
}
