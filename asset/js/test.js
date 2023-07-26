export const Identity = {
	API_Domain: 'http://192.168.1.16:2682',
	Photo: 'http://192.168.1.16:2682/getPhoto'
};

export const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/x-www-form-urlencoded',
	Token: 'rahasia',
	ID_user: 0
};

export async function exec(url, data = null, method = 'GET') {
	const abort = new AbortController();
	const abortFn = () => {
		abort.abort();
	};
	const abortTimeout = setTimeout(abortFn, 10000);

	const requestInit = {
		method: method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			Token: 'rahasia',
			ID_user: 0
		},
		signal: abort.signal
	};

	if (method === 'GET') {
		const queryParams = new URLSearchParams(data);
		if (!url.includes('?')) url += `?${queryParams.toString()}`;
	}

	if (method === 'POST') {
		const formData = new URLSearchParams();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value.toString());
		}
		requestInit.body = formData.toString();
	}

	const request = new Request(Identity.API_Domain + url, requestInit);

	try {
		let data;
		const response = await fetch(request);
		data = await response.json();

		if (!response.ok) {
			console.error(`Server Error : `, data.message);
			return [];
		}

		clearTimeout(abortTimeout);

		if (method === 'GET') {
			if (data.data === null) data.data = [];
			return data.data;
		} else return data;
	} catch (error) {
		if (error.name === 'AbortError')
			console.error('Request Timed Out : Fetch took longer than 10 seconds!');
		else console.error(`Fetch Error : `, error);

		return [];
	}
}