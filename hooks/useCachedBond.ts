import { IBondDTOProps } from "@DTOs/BondDTO";
function fetchCachedBond(registration: string): IBondDTOProps | undefined {
  const bondCached = JSON.parse(
    sessionStorage.getItem(`bond@${registration}`) || "null"
  );
  if (bondCached) {
    return bondCached as IBondDTOProps;
  } else {
    sessionStorage.removeItem(`bond@${registration}`);
    return undefined;
  }
}
function storeBond(bond: IBondDTOProps) {
  sessionStorage.setItem(`bond@${bond.registration}`, JSON.stringify(bond));
}
export { fetchCachedBond, storeBond}
