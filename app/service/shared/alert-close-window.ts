export const alertClosedWindow = (isClosable: boolean) => {
  isClosable
    ? window.removeEventListener("beforeunload", onUnload)
    : window.addEventListener("beforeunload", onUnload);
  return () => {
    // アンマウント時にタブを閉じる時のアラートをするイベントを削除する。
    window.removeEventListener("beforeunload", onUnload);
  };
};

export const onUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = "";
};
