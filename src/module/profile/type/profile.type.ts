export const genderTypeList = ['WOMAN', 'MAN'] as const;
export type genderType = typeof genderTypeList[number];
