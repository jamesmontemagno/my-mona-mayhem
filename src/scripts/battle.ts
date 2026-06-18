interface ContributionDay {
	weekday?: number;
	count?: number;
	level?: number;
	date?: string;
	day?: string;
	contributionDate?: string;
	contributionCount?: number;
	contributionLevel?: number;
}

interface ContributionWeek {
	index?: number;
	first_day?: string;
	firstDay?: string;
	contribution_days?: ContributionDay[];
	contributionDays?: ContributionDay[];
}

interface ContributionApiResponse {
	schema?: string;
	from?: string;
	to?: string;
	total_contributions?: number;
	totalContributions?: number;
	colors_full?: string[];
	colorsFull?: string[];
	weeks?: ContributionWeek[];
	contributions?: ContributionDay[];
	days?: ContributionDay[];
	data?: ContributionDay[];
	message?: string;
}

interface NormalizedDay {
	count: number;
	level: number;
	date: string;
}

interface PlayerRenderResult {
	total: number;
}

const player1Input = document.querySelector('#player1');
const player2Input = document.querySelector('#player2');
const battleButton = document.querySelector('#battleButton');
const battleButtonText = document.querySelector('#battleButtonText');
const statusElement = document.querySelector('#status');
const resultsElement = document.querySelector('#results');
const name1Element = document.querySelector('#name1');
const name2Element = document.querySelector('#name2');
const summary1Element = document.querySelector('#summary1');
const summary2Element = document.querySelector('#summary2');
const graph1Element = document.querySelector('#graph1');
const graph2Element = document.querySelector('#graph2');
const winnerIndicatorElement = document.querySelector('#winnerIndicator');
const winnerPopupBackdrop = document.querySelector('#winnerPopupBackdrop');
const winnerPopupTitle = document.querySelector('#winnerPopupTitle');
const winnerPopupSubtitle = document.querySelector('#winnerPopupSubtitle');
const winnerPopupClose = document.querySelector('#winnerPopupClose');
const confettiLayer = document.querySelector('#confettiLayer');

const FALLBACK_GITHUB_COLORS = [
	'#ebedf0',
	'#9be9a8',
	'#40c463',
	'#30a14e',
	'#216e39',
] as const;

const CONFETTI_COLORS = ['#5fed83', '#8a2be2', '#7fffa4', '#b65dff', '#66ffcf'];

function setStatus(message: string, type: 'error' | 'info' = 'info'): void {
	if (!(statusElement instanceof HTMLElement)) {
		return;
	}

	statusElement.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
	statusElement.textContent = message;
	statusElement.classList.remove('error', 'info');
	if (message) {
		statusElement.classList.add(type);
		if (type === 'error') {
			statusElement.focus();
		}
	}
}

function setLoading(isLoading: boolean): void {
	if (battleButton instanceof HTMLButtonElement) {
		battleButton.disabled = isLoading;
		battleButton.setAttribute('aria-busy', isLoading ? 'true' : 'false');
		battleButton.classList.toggle('is-loading', isLoading);
	}

	if (battleButtonText instanceof HTMLElement) {
		battleButtonText.textContent = isLoading ? 'Battling...' : 'Battle';
	}
}

function setWinnerIndicator(text: string, isStrong = false): void {
	if (!(winnerIndicatorElement instanceof HTMLElement)) {
		return;
	}

	winnerIndicatorElement.textContent = text;
	winnerIndicatorElement.classList.toggle('strong', isStrong);
}

function clearConfetti(): void {
	if (!(confettiLayer instanceof HTMLElement)) {
		return;
	}

	confettiLayer.innerHTML = '';
}

function launchConfetti(): void {
	if (!(confettiLayer instanceof HTMLElement)) {
		return;
	}

	clearConfetti();

	const pieceCount = 140;
	for (let index = 0; index < pieceCount; index += 1) {
		const piece = document.createElement('span');
		piece.className = `confetti-piece${Math.random() > 0.72 ? ' round' : ''}`;

		const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
		const left = Math.random() * 100;
		const drift = (Math.random() - 0.5) * 180;
		const startRotate = Math.random() * 180;
		const endRotate = startRotate + 540 + Math.random() * 600;
		const fallDuration = 2 + Math.random() * 1.8;
		const delay = Math.random() * 0.4;

		piece.style.left = `${left}%`;
		piece.style.background = color;
		piece.style.setProperty('--drift', `${drift}px`);
		piece.style.setProperty('--start-rotate', `${startRotate}deg`);
		piece.style.setProperty('--end-rotate', `${endRotate}deg`);
		piece.style.setProperty('--fall-duration', `${fallDuration}s`);
		piece.style.setProperty('--delay', `${delay}s`);

		confettiLayer.appendChild(piece);
	}
}

function closeWinnerPopup(): void {
	if (!(winnerPopupBackdrop instanceof HTMLElement)) {
		return;
	}

	winnerPopupBackdrop.classList.remove('is-open');
	winnerPopupBackdrop.setAttribute('aria-hidden', 'true');
	document.body.classList.remove('winner-popup-open');
	setTimeout(() => {
		clearConfetti();
	}, 260);
}

function showWinnerPopup(title: string, subtitle: string): void {
	if (
		!(winnerPopupBackdrop instanceof HTMLElement)
		|| !(winnerPopupTitle instanceof HTMLElement)
		|| !(winnerPopupSubtitle instanceof HTMLElement)
	) {
		return;
	}

	winnerPopupTitle.textContent = title;
	winnerPopupSubtitle.textContent = subtitle;
	launchConfetti();
	winnerPopupBackdrop.setAttribute('aria-hidden', 'false');
	winnerPopupBackdrop.classList.add('is-open');
	document.body.classList.add('winner-popup-open');

	if (winnerPopupClose instanceof HTMLButtonElement) {
		winnerPopupClose.focus();
	}
}

function toIsoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function normalizeCount(value: unknown): number {
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function normalizeLevel(day: ContributionDay, count: number): number {
	const candidateLevel = Number(day.level ?? day.contributionLevel);
	if (Number.isFinite(candidateLevel) && candidateLevel >= 0 && candidateLevel <= 4) {
		return candidateLevel;
	}

	if (count <= 0) {
		return 0;
	}
	if (count < 10) {
		return 1;
	}
	if (count < 20) {
		return 2;
	}
	if (count < 40) {
		return 3;
	}
	return 4;
}

function normalizeDirectDay(day: ContributionDay): NormalizedDay {
	const count = normalizeCount(day.count ?? day.contributionCount);
	const date = typeof day.date === 'string'
		? day.date
		: typeof day.day === 'string'
			? day.day
			: typeof day.contributionDate === 'string'
				? day.contributionDate
				: '';

	return {
		count,
		level: normalizeLevel(day, count),
		date,
	};
}

function normalizeWeekDays(weeks: ContributionWeek[]): NormalizedDay[] {
	const days: NormalizedDay[] = [];

	for (const week of weeks) {
		const start = week.first_day ?? week.firstDay;
		const startDate = start ? new Date(start) : undefined;
		const weekDays = week.contribution_days ?? week.contributionDays ?? [];

		for (let dayIndex = 0; dayIndex < weekDays.length; dayIndex += 1) {
			const day = weekDays[dayIndex];
			const count = normalizeCount(day.count ?? day.contributionCount);
			const weekday = Number.isFinite(Number(day.weekday)) ? Number(day.weekday) : dayIndex;

			let date = normalizeDirectDay(day).date;
			if (!date && startDate instanceof Date && !Number.isNaN(startDate.valueOf())) {
				const computedDate = new Date(startDate);
				computedDate.setDate(startDate.getDate() + weekday);
				date = toIsoDate(computedDate);
			}

			days.push({
				count,
				level: normalizeLevel(day, count),
				date,
			});
		}
	}

	return days;
}

function parseContributionItems(payload: ContributionApiResponse): NormalizedDay[] {
	if (Array.isArray(payload.weeks) && payload.weeks.length > 0) {
		return normalizeWeekDays(payload.weeks);
	}

	const candidateDays = payload.contributions ?? payload.days ?? payload.data ?? [];
	return candidateDays.map((day) => normalizeDirectDay(day));
}

function getPalette(payload: ContributionApiResponse): string[] {
	const colors = payload.colors_full ?? payload.colorsFull;
	if (Array.isArray(colors) && colors.length >= 5) {
		return colors.slice(0, 5);
	}
	return [...FALLBACK_GITHUB_COLORS];
}

function renderGraph(graphElement: Element | null, days: NormalizedDay[], palette: string[]): void {
	if (!(graphElement instanceof HTMLElement)) {
		return;
	}

	graphElement.innerHTML = '';
	const trimmedDays = days.slice(-371);

	for (const day of trimmedDays) {
		const square = document.createElement('div');
		square.className = 'square';
		square.setAttribute('aria-hidden', 'true');
		const level = Math.max(0, Math.min(4, day.level));
		square.style.backgroundColor = palette[level] ?? FALLBACK_GITHUB_COLORS[level];
		square.title = day.date ? `${day.date}: ${day.count} contributions` : `${day.count} contributions`;
		graphElement.appendChild(square);
	}
}

function renderPlayer(
	payload: ContributionApiResponse,
	fallbackName: string,
	nameElement: Element | null,
	summaryElement: Element | null,
	graphElement: Element | null,
): PlayerRenderResult {
	const items = parseContributionItems(payload);
	const palette = getPalette(payload);
	const totalFromPayload = Number(payload.total_contributions ?? payload.totalContributions ?? 0);
	const totalFromItems = items.reduce((sum, item) => sum + item.count, 0);
	const total = Number.isFinite(totalFromPayload) && totalFromPayload > 0
		? totalFromPayload
		: totalFromItems;
	const firstDate = typeof payload.from === 'string' && payload.from
		? payload.from
		: items.length > 0
			? items[0]?.date
			: '';
	const lastDate = typeof payload.to === 'string' && payload.to
		? payload.to
		: items.length > 0
			? items[items.length - 1]?.date
			: '';

	if (nameElement instanceof HTMLElement) {
		nameElement.textContent = fallbackName;
	}

	if (summaryElement instanceof HTMLElement) {
		if (items.length === 0) {
			summaryElement.textContent = 'No contribution data returned.';
		} else if (firstDate && lastDate) {
			summaryElement.textContent = `${total} contributions from ${firstDate} to ${lastDate}.`;
		} else {
			summaryElement.textContent = `${total} contributions in returned data.`;
		}
	}

	if (graphElement instanceof HTMLElement) {
		if (items.length === 0) {
			graphElement.setAttribute('aria-label', `${fallbackName} contribution graph with no returned data.`);
		} else if (firstDate && lastDate) {
			graphElement.setAttribute('aria-label', `${fallbackName} contribution graph. ${total} total contributions from ${firstDate} to ${lastDate}.`);
		} else {
			graphElement.setAttribute('aria-label', `${fallbackName} contribution graph. ${total} total contributions.`);
		}
	}

	renderGraph(graphElement, items, palette);
	return {
		total,
	};
}

async function fetchContributions(username: string): Promise<ContributionApiResponse> {
	const response = await fetch(`/api/contributions/${encodeURIComponent(username)}`);

	let payload: ContributionApiResponse;
	try {
		payload = (await response.json()) as ContributionApiResponse;
	} catch {
		payload = {};
	}

	if (!response.ok) {
		const message = typeof payload.message === 'string'
			? payload.message
			: `Request failed with status ${response.status}.`;
		throw new Error(message);
	}

	return payload;
}

async function runBattle(): Promise<void> {
	if (!(player1Input instanceof HTMLInputElement) || !(player2Input instanceof HTMLInputElement)) {
		return;
	}

	const player1 = player1Input.value.trim();
	const player2 = player2Input.value.trim();

	if (!player1 || !player2) {
		setStatus('Enter both usernames to start the battle.', 'error');
		setWinnerIndicator('Winner: Pending battle');
		closeWinnerPopup();
		if (resultsElement instanceof HTMLElement) {
			resultsElement.classList.add('hidden');
		}
		return;
	}

	setStatus('Fetching contribution data...', 'info');
	setLoading(true);
	setWinnerIndicator('Winner: Calculating...');
	if (resultsElement instanceof HTMLElement) {
		resultsElement.classList.add('hidden');
	}

	try {
		const [player1Data, player2Data] = await Promise.all([
			fetchContributions(player1),
			fetchContributions(player2),
		]);

		const player1Result = renderPlayer(player1Data, player1, name1Element, summary1Element, graph1Element);
		const player2Result = renderPlayer(player2Data, player2, name2Element, summary2Element, graph2Element);

		if (player1Result.total > player2Result.total) {
			setWinnerIndicator(`Winner: ${player1}`, true);
			showWinnerPopup(
				`Winner: ${player1}`,
				`${player1Result.total.toLocaleString()} to ${player2Result.total.toLocaleString()}. Arcade domination!`,
			);
		} else if (player2Result.total > player1Result.total) {
			setWinnerIndicator(`Winner: ${player2}`, true);
			showWinnerPopup(
				`Winner: ${player2}`,
				`${player2Result.total.toLocaleString()} to ${player1Result.total.toLocaleString()}. Arcade domination!`,
			);
		} else {
			setWinnerIndicator('Winner: Tie');
			showWinnerPopup(
				'Perfect Tie',
				`Both players hit ${player1Result.total.toLocaleString()} contributions. Rematch time!`,
			);
		}

		if (resultsElement instanceof HTMLElement) {
			resultsElement.classList.remove('hidden');
		}
		setStatus('', 'info');
	} catch (error) {
		const message = error instanceof Error
			? error.message
			: 'Unable to complete this battle right now.';
		setStatus(message, 'error');
		setWinnerIndicator('Winner: Unable to calculate');
		closeWinnerPopup();
	} finally {
		setLoading(false);
	}
}

if (winnerPopupClose instanceof HTMLButtonElement) {
	winnerPopupClose.addEventListener('click', closeWinnerPopup);
}

if (winnerPopupBackdrop instanceof HTMLElement) {
	winnerPopupBackdrop.addEventListener('click', (event: MouseEvent) => {
		if (event.target === winnerPopupBackdrop) {
			closeWinnerPopup();
		}
	});
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.key === 'Escape') {
		closeWinnerPopup();
	}
});

if (battleButton instanceof HTMLButtonElement) {
	battleButton.addEventListener('click', () => {
		void runBattle();
	});
}

for (const input of [player1Input, player2Input]) {
	if (input instanceof HTMLInputElement) {
		input.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				void runBattle();
			}
		});

		input.addEventListener('input', () => {
			if (statusElement instanceof HTMLElement && statusElement.classList.contains('error')) {
				setStatus('', 'info');
			}
		});
	}
}
