
export enum Keys {
	MY_PAGE = 'MY_PAGE'
}

const translatedKeys: IncludedKeys = {
	[Keys.MY_PAGE]: {
		nb: 'Refusjonskrav av sykepenger - korona',
		nn: 'Refusjonskrav av sjukepengar - korona',
		en: 'Refunds regarding corona virus',
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
