export function buildPixiSpriteFilters(effects = {}, pixi) {
    const filters = [];
    const ghost = Math.max(0, Math.min(100, effects.ghost ?? 0));
    const brightness = Math.max(-100, Math.min(100, effects.brightness ?? 0));
    const color = (effects.color ?? 0) % 200;
    const fisheye = Math.max(0, effects.fisheye ?? 0);
    const whirl = Math.max(0, effects.whirl ?? 0);
    const pixelate = Math.max(0, effects.pixelate ?? 0);
    const mosaic = Math.max(0, effects.mosaic ?? 0);

    if (color !== 0 || brightness !== 0) {
        const matrix = new pixi.ColorMatrixFilter();
        matrix.hue(color * 1.8, false);
        matrix.brightness(1 + brightness / 100, false);
        filters.push(matrix);
    }

    const chunk = Math.max(pixelate, mosaic);

    if (chunk > 0) {
        const strength = Math.min(8, Math.max(1, chunk / 12));
        filters.push(new pixi.BlurFilter({ strength }));
    }

    if (fisheye > 0 || whirl > 0) {
        const displacement = createDisplacementFilter(pixi, fisheye, whirl);

        if (displacement) {
            filters.push(displacement);
        }
    }

    return {
        alpha: 1 - ghost / 100,
        filters: filters.length > 0 ? filters : null,
        quantize:
            chunk > 0
                ? Math.max(2, Math.round(chunk / 6))
                : fisheye > 0
                  ? Math.max(2, Math.round(fisheye / 20))
                  : 0,
    };
}

function createDisplacementFilter(pixi, fisheye, whirl) {
    if (typeof document === 'undefined') {
        return null;
    }

    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    const image = context.createImageData(size, size);
    const center = (size - 1) / 2;
    const fisheyeScale = fisheye / 100;
    const whirlScale = whirl / 100;

    for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
            const dx = (x - center) / center;
            const dy = (y - center) / center;
            const radius = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) + whirlScale * radius * Math.PI;
            const bulge = 1 + fisheyeScale * (1 - Math.min(1, radius));
            const displacedX = center + Math.cos(angle) * radius * bulge * center;
            const displacedY = center + Math.sin(angle) * radius * bulge * center;
            const index = (y * size + x) * 4;

            image.data[index] = displacedX * 4;
            image.data[index + 1] = displacedY * 4;
            image.data[index + 2] = 128;
            image.data[index + 3] = 255;
        }
    }

    context.putImageData(image, 0, 0);
    const texture = pixi.Texture.from(canvas);
    const sprite = new pixi.Sprite(texture);

    return new pixi.DisplacementFilter({
        sprite,
        scale: Math.max(fisheyeScale, whirlScale) * 18,
    });
}
