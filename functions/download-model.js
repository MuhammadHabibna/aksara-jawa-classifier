export async function onRequest(context) {
    const MODEL_URL = "https://github.com/MuhammadHabibna/aksara-jawa-classifier/releases/download/model-v1/aksara_jawa_resnet18.onnx";

    try {
        const response = await fetch(MODEL_URL);

        // Check if the fetch was successful
        if (!response.ok) {
            return new Response(`Failed to fetch model: ${response.statusText}`, { status: response.status });
        }

        // Reconstruct the response to ensure headers are suitable for the client
        // We stream the body directly
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');

        // Explicitly set content type if missing or generic
        if (!newHeaders.get('content-type')) {
            newHeaders.set('content-type', 'application/octet-stream');
        }

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        });
    } catch (err) {
        return new Response(`Proxy Error: ${err.message}`, { status: 500 });
    }
}
