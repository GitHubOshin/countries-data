import { NativeName } from '../interfaces/types'

export function getNativeName(
  nativeName: NativeName = {},
  cca3: string
): string {
  return (
    nativeName?.eng?.common ||
    nativeName?.[cca3.toLowerCase()]?.common ||
    nativeName?.ara?.common ||
    nativeName?.zho?.common ||
    nativeName?.dan?.common ||
    nativeName?.afr?.common ||
    nativeName?.slk?.common ||
    nativeName?.ron?.common ||
    nativeName?.por?.common ||
    nativeName?.crs?.common ||
    nativeName?.hye?.common ||
    nativeName?.spa?.common ||
    nativeName?.bos?.common ||
    nativeName?.ces?.common ||
    nativeName?.nep?.common ||
    nativeName?.sqi?.common ||
    nativeName?.mon?.common ||
    nativeName?.grn?.common ||
    nativeName?.kal?.common ||
    nativeName?.sin?.common ||
    nativeName?.mya?.common ||
    nativeName?.aym?.common ||
    nativeName?.prs?.common ||
    nativeName?.bis?.common ||
    nativeName?.div?.common ||
    nativeName?.vie?.common ||
    nativeName?.nno?.common ||
    nativeName?.ell?.common ||
    nativeName?.srp?.common ||
    nativeName?.lit?.common ||
    nativeName?.cal?.common ||
    nativeName?.kat?.common ||
    nativeName?.amh?.common ||
    nativeName?.bjz?.common ||
    nativeName?.cnr?.common ||
    nativeName?.lav?.common ||
    nativeName?.bar?.common ||
    nativeName?.cat?.common ||
    nativeName?.msa?.common ||
    nativeName?.bwg?.common ||
    nativeName?.cha?.common ||
    nativeName?.dzo?.common ||
    nativeName?.bul?.common ||
    nativeName?.fas?.common ||
    ''
  )
}
