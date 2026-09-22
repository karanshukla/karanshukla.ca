import {
  Hct,
  MaterialDynamicColors,
  SchemeTonalSpot,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';
import { THEME_SEED, materialSchemes } from '../constants/materialSchemes';

const generate = (isDark: boolean) => {
  const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(THEME_SEED)), isDark, 0);
  const roles = Object.keys(materialSchemes.light) as (keyof typeof materialSchemes.light)[];
  return Object.fromEntries(
    roles.map((role) => [role, hexFromArgb(MaterialDynamicColors[role].getArgb(scheme))]),
  );
};

describe('materialSchemes', () => {
  it('matches the light scheme generated from the seed', () => {
    expect(materialSchemes.light).toEqual(generate(false));
  });

  it('matches the dark scheme generated from the seed', () => {
    expect(materialSchemes.dark).toEqual(generate(true));
  });
});
