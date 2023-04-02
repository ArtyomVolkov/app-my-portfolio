export enum ERepeatMode {
  Off,
  Context,
  Track
}

export const KMRepeatMode: { [key in ERepeatMode]: string } = {
  [ERepeatMode.Context]: 'context',
  [ERepeatMode.Track]: 'track',
  [ERepeatMode.Off]: 'off',
}