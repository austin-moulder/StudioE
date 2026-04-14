/** April (3) & May (4): Happy Hour social entry promo — pass / drop-in bundle copy resumes June 1. */
export function isAprilMayFreeSocial(): boolean {
  const m = new Date().getMonth()
  return m === 3 || m === 4
}
