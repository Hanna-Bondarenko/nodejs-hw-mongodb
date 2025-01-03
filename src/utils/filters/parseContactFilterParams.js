const isString = (value) => typeof value === 'string';

const validateAndParseContactType = (contactType) => {
  if (!isString(contactType)) return;

  const allowedTypes = ['home', 'work', 'personal'];
  if (allowedTypes.includes(contactType)) {
    return contactType;
  }
};

const parseBooleanValue = (value) => {
  if (!isString(value)) return;

  const normalizedValue = value.toLowerCase();
  if (normalizedValue === 'true') return true;
  if (normalizedValue === 'false') return false;

  return;
};

export const parseContactFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = validateAndParseContactType(contactType);
  const parsedIsFavourite = parseBooleanValue(isFavourite);

  console.log('Parsed filter params:', {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  });

  return {
    ...(parsedContactType && { contactType: parsedContactType }),
    ...(parsedIsFavourite !== undefined && { isFavourite: parsedIsFavourite }),
  };
};
