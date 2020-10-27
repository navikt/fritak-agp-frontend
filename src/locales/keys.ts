
export enum Keys {
	SIDE_TITTEL = 'SIDE_TITTEL'
}

const translatedKeys: IncludedKeys = {
	[Keys.SIDE_TITTEL]: {
		nb: 'Søknadsskjema',
		nn: 'Søknadsskjema',
		en: 'Forms',
	}
};



type IncludedKeys = {
	[P in Keys]: {
		[P in Languages]: string
	}
}



const allTranslations: IncludedKeys = {
	...translatedKeys
};

export enum Languages {
	nb = 'nb',
	nn = 'nn',
	en = 'en',
}

export const translationsToJson = (lan: Languages): {} => {
	let translatedKeys = {};
	Object.keys(allTranslations).map(e => translatedKeys[e] = allTranslations[e][lan]);
	return translatedKeys;
};
