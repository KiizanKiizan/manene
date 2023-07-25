export const getPathnameTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "メニュー";
    case "/coorde_pick":
      return "コーデピック";
    default:
      throw Error("存在しないパスです");
  }
};
