
// variables.ts
const backgroundColor: string = '#253439';
const sideMenuBackgroundColor: string = '#1E2028';
const resumeDownloadLink: string = "https://drive.google.com/uc?export=download&id=163_tqLkXL1N26cQYLpxPYJf9DhoQ5fpG"
const textColor: string = '#F4F2EF';
const framerMotionRepeatOnce: boolean = true;
const switchesDivWidth: number = 400
const appBarHeight: number = 80
const techItemsPerCategory: number = 11
const allCategoriesItemsAmount: number = 10
const isProductionModeEnabled: boolean = import.meta.env.VITE_IS_PRODUCTION
const apiPrefix: string = import.meta.env.VITE_IS_PRODUCTION == 'true' ? import.meta.env.VITE_API_BASE_URL : 'http://127.0.0.1:8000'
export { apiPrefix, isProductionModeEnabled, allCategoriesItemsAmount, techItemsPerCategory, appBarHeight, switchesDivWidth, backgroundColor, textColor, resumeDownloadLink, sideMenuBackgroundColor, framerMotionRepeatOnce};
