import { Icon } from "../models/icon.model";

export const ICONS: Icon[] = [
    { class: 'far fa-meh', bgColor: '#f7f2f3', color: '#ef4370', ratingValue: 1, tooltip: 'Not satisfied' },
    { class: 'fa-regular fa-face-smile', bgColor: '#f5e8d0', color: '#ffb000', ratingValue: 2, tooltip: 'Slightly satisfied' },
    { class: 'fa-regular fa-face-laugh', bgColor: '#fffbd7', color: '#ffe600', ratingValue: 3, tooltip: 'Satisfied' },
    { class: 'fa-regular fa-face-grin-beam', bgColor: '#98e25c', color: '#ffffff', ratingValue: 4, tooltip: 'Very satisfied' },
    { class: 'far fa-grin-hearts', bgColor: '#d4f7e5', color: '#00d269', ratingValue: 5, tooltip: 'Extremely satisfied' }
];