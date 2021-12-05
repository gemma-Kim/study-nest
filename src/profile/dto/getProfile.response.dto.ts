export class NewProfileResponseDto {
  id: number;
  userId: number;
  photo: string | null;
  gender: null | 'MAN' | 'WOMAN';
}
