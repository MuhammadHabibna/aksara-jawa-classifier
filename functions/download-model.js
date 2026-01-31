export async function onRequestGet() {
    const MODEL_URL =
        "https://github.com/MuhammadHabibna/aksara-jawa-classifier/releases/download/model-v1/aksara_jawa_resnet18.onnx";

    // fetch upstream
    const upstream = await fetch(MODEL_URL, {
        redirect: "follow",
        headers: {
            "User-Agent": "cf-pages-model-proxy",
            "Accept": "application/octet-stream",
        },
    });

    if (!upstream.ok) {
        return new Response(
            `Upstream error: ${upstream.status} ${upstream.statusText}`,
            {
                status: 502,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    }

    // 🔴 IMPORTANT: buffer the file (NO STREAMING)
    const buffer = await upstream.arrayBuffer();

    return new Response(buffer, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
