function percentToHex(percentage) {
	return `0${Math.round((255 / 100) * percentage).toString(16)}`.slice(-2).toUpperCase();
}
