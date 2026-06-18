import type { APIRoute } from 'astro';

export const prerender = false;

const USERNAME_PATTERN = /^(?!-)[A-Za-z0-9-]{1,39}(?<!-)$/;
const FETCH_TIMEOUT_MS = 5000;

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function buildHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
	return {
		...CORS_HEADERS,
		...extraHeaders,
	};
}

function jsonResponse(
	status: number,
	payload: Record<string, unknown>,
	headers: Record<string, string> = {},
): Response {
	return new Response(JSON.stringify(payload), {
		status,
		headers: buildHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			...headers,
		}),
	});
}

export const GET: APIRoute = async ({ params }) => {
	const normalizedUsername = params.username?.trim().toLowerCase();

	if (!normalizedUsername || !USERNAME_PATTERN.test(normalizedUsername)) {
		return jsonResponse(400, {
			error: 'Invalid username',
			code: 'INVALID_USERNAME',
			message: 'Provide a valid GitHub username.',
		}, {
			'Cache-Control': 'no-store',
		});
	}

	if (normalizedUsername.length > 39) {
		return jsonResponse(400, {
			error: 'Username too long',
			code: 'USERNAME_TOO_LONG',
			message: 'GitHub usernames cannot exceed 39 characters.',
		}, {
			'Cache-Control': 'no-store',
		});
	}


	const upstreamUrl = `https://github.com/${encodeURIComponent(normalizedUsername)}.contribs`;

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
		let response: Response;

		try {
			response = await fetch(upstreamUrl, {
				signal: controller.signal,
				headers: {
					'User-Agent': 'Mona-Mayhem/1.0',
					'Accept': 'application/json',
				},
			});
		} finally {
			clearTimeout(timeoutId);
		}

		if (!response.ok) {
			const status = response.status === 404
				? 404
				: response.status === 429
					? 429
					: 502;

			return jsonResponse(status, {
				error: 'GitHub contribution data is unavailable',
				code: response.status >= 500 ? 'UPSTREAM_ERROR' : 'UPSTREAM_BAD_RESPONSE',
				message: `GitHub returned status ${response.status}.`,
			}, {
				'Cache-Control': 'no-store',
			});
		}

		const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
		if (!contentType.includes('application/json')) {
			return jsonResponse(502, {
				error: 'Unexpected upstream content type',
				code: 'UPSTREAM_BAD_CONTENT_TYPE',
				message: `Expected JSON from upstream but received: ${contentType || 'unknown'}.`,
			}, {
				'Cache-Control': 'no-store',
			});
		}

		let data: unknown;
		try {
			data = await response.json();
		} catch {
			return jsonResponse(502, {
				error: 'Invalid JSON returned by upstream',
				code: 'UPSTREAM_INVALID_JSON',
				message: 'The GitHub contribution endpoint returned an invalid JSON payload.',
			}, {
				'Cache-Control': 'no-store',
			});
		}

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: buildHeaders({
				'Content-Type': 'application/json; charset=utf-8',
				'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
				'Vary': 'Accept',
			}),
		});
	} catch (error) {
		const isTimeout = error instanceof Error && error.name === 'AbortError';

		return jsonResponse(isTimeout ? 504 : 502, {
			error: isTimeout ? 'Upstream request timed out' : 'Unable to fetch contribution data',
			code: isTimeout ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_ERROR',
			message: isTimeout
				? 'The GitHub contribution endpoint did not respond in time.'
				: 'The GitHub contribution endpoint could not be reached.',
		}, {
			'Cache-Control': 'no-store',
		});
	}
};

export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 204,
		headers: buildHeaders(),
	});
};
