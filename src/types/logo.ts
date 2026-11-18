export type ConceptCategory =
  | 's4_colored'
  | 's4_neural'
  | 'neural_2wing'
  | 'balanced'
  | 'clean_gear'
  | 'ai_mcu'
  | 'cpu'
  | 'series1'
  | 'all';

export type LockupMode = 'mark' | 'horizontal' | 'stacked';

export interface LogoConcept {
  id: string;
  index: string;
  title: string;
  latinTitle: string;
  category: string;
  series: 's4_colored' | 's4_neural' | 'neural_2wing' | 'balanced' | 'clean_gear' | 'ai_mcu' | 'cpu' | 'series1';
  imagePath: string;
  paletteNote: string;
  universityLink: string;
  engineeringLink: string;
  summary: string;
  bestFor: string;
}
