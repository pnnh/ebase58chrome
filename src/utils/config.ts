export function isRunningInChromeExtension() {
    return typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined';
}
