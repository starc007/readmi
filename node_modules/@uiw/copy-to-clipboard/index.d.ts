
interface CopyTextToClipboard {
  (text: string, method?: (isCopy: boolean) => void): void
}

declare var copyTextToClipboard: CopyTextToClipboard
export default copyTextToClipboard;