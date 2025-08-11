export type ProcedureId =
  | 'dental_implants'
  | 'hip_replacement'
  | 'knee_replacement'
  | 'heart_bypass'
  | 'cosmetic_surgery_ba'
  | 'cataract_surgery'
  | 'ivf'
  | 'weight_loss_surgery';

export interface ProcedureOption {
  id: ProcedureId;
  label: string;
  keywords: string[];
}

export const PROCEDURES: ProcedureOption[] = [
  {
    id: 'dental_implants',
    label: 'Dental Implants (single/multiple/All-on-4)',
    keywords: ['dental implant', 'teeth implant', 'all-on-4', 'implant single', 'implant multiple']
  },
  { id: 'hip_replacement', label: 'Hip Replacement Surgery', keywords: ['hip arthroplasty', 'hip surgery'] },
  { id: 'knee_replacement', label: 'Knee Replacement Surgery', keywords: ['knee arthroplasty', 'knee surgery'] },
  { id: 'heart_bypass', label: 'Heart Bypass Surgery', keywords: ['coronary bypass', 'cabg', 'heart surgery'] },
  { id: 'cosmetic_surgery_ba', label: 'Cosmetic Surgery (breast augmentation/tummy tuck/BBL)', keywords: ['boob job', 'augmentation', 'tummy tuck', 'bbl', 'cosmetic'] },
  { id: 'cataract_surgery', label: 'Cataract Surgery', keywords: ['ophthalmology', 'cataract'] },
  { id: 'ivf', label: 'IVF Treatment', keywords: ['fertility', 'ivf', 'in vitro'] },
  { id: 'weight_loss_surgery', label: 'Weight Loss Surgery (gastric sleeve/bypass)', keywords: ['bariatric', 'gastric sleeve', 'gastric bypass'] },
];