// eslint-disable-next-line import/prefer-default-export
export function equalArray<E>(a: E[], b: E[]): boolean {
	if (a === b) return true;
	if (a.length !== b.length) return false;

	for (let i = 0; i < a.length; i += 1) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}
